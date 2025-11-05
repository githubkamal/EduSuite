using CsvHelper;
using CsvHelper.Configuration;
using EduSuite.Data.EduSuite.Data;
using EduSuite.Data.Entities;
using EduSuite.Services.Helpers;
using EduSuite.Services.Interface;
using EduSuite.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EduSuite.Services.Implementation
{
    public class AlumniService : IAlumniService
    {
        private readonly EduSuiteDbContext _context;

        public AlumniService(EduSuiteDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<AlumniGridDto> data, int total)> GetAlumnisAsync(
    int page, int pageSize, string? search,
    string? sortColumn, string? sortDir,
    Dictionary<string, string[]>? filters)
        {
            //await ImportAlumniFromCsv("C:\\Alumni Data - Sheet1.csv");

            var query = _context.Alumnis
                .AsNoTracking()
                .Include(s => s.Department)
                .Include(s => s.Batch)
                .AsQueryable();

            // Global search (optional)
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s =>
                    s.Name.Contains(search) ||
                    s.RegNo.Contains(search) ||
                    s.Department.DepartmentName.Contains(search) ||
                    s.Batch.BatchName.Contains(search));
            }

            // Column filters
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    var column = filter.Key;
                    var values = filter.Value;
                    if (values != null && values.Length > 0)
                    {
                        switch (column.ToLower())
                        {
                            case "rollnumber":
                                // For roll number, support partial matching
                                query = query.Where(s => values.Any(v => s.RegNo.Contains(v)));
                                break;

                            case "fullname":
                                // For full name, support partial matching
                                query = query.Where(s => values.Any(v => s.Name.Contains(v)));
                                break;

                            case "departmentid":
                                // Filter by department ID (from search form)
                                var depIds = values.Select(v => int.TryParse(v, out var id) ? id : 0)
                                                  .Where(id => id > 0)
                                                  .ToList();
                                if (depIds.Any())
                                {
                                    query = query.Where(s => depIds.Contains(s.DepartmentId));
                                }
                                break;

                            case "departmentname":
                                // Filter by department name (from column filter)
                                query = query.Where(s => values.Contains(s.Department.DepartmentName));
                                break;

                            case "batchid":
                                // Filter by batch ID (from search form)
                                var batchIds = values.Select(v => int.TryParse(v, out var id) ? id : 0)
                                                    .Where(id => id > 0)
                                                    .ToList();
                                if (batchIds.Any())
                                {
                                    query = query.Where(s => batchIds.Contains(s.BatchId));
                                }
                                break;

                            case "batchname":
                                // Filter by batch name (from column filter)
                                query = query.Where(s => values.Contains(s.Batch.BatchName));
                                break;
                        }
                    }
                }
            }

            // Get total before pagination
            int total = await query.CountAsync();

            // Sorting
            if (!string.IsNullOrEmpty(sortColumn))
            {
                bool isDesc = sortDir?.ToLower() == "desc";
                query = sortColumn.ToLower() switch
                {
                    "id" => isDesc ? query.OrderByDescending(s => s.AlumniId) : query.OrderBy(s => s.AlumniId),
                    "rollnumber" => isDesc ? query.OrderByDescending(s => s.RegNo) : query.OrderBy(s => s.RegNo),
                    "fullname" => isDesc ? query.OrderByDescending(s => s.Name) : query.OrderBy(s => s.Name),
                    "departmentname" => isDesc ? query.OrderByDescending(s => s.Department.DepartmentName) : query.OrderBy(s => s.Department.DepartmentName),
                    "batchname" => isDesc ? query.OrderByDescending(s => s.Batch.BatchName) : query.OrderBy(s => s.Batch.BatchName),
                    _ => query.OrderBy(s => s.AlumniId)
                };
            }
            else
            {
                // Default sorting
                query = query.OrderBy(s => s.AlumniId);
            }

            // Pagination and projection
            var data = await query
                .AsNoTracking()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(s => new AlumniGridDto
                {
                    AlumniId = s.AlumniId,
                    RegNo = s.RegNo,
                    Name = s.Name,
                    DepartmentId = s.DepartmentId,
                    DepartmentName = s.Department.DepartmentName,
                    BatchId = s.BatchId,
                    BatchName = s.Batch.BatchName,
                    AadharNo = s.AadharNo,
                    BloodGroup = s.BloodGroup,
                    DateOfBirth = s.DateOfBirth,
                    DateOfSignature = s.DateOfSignature,
                    EmergencyPhone = s.EmergencyPhone,
                    ExtraCurricularInterests = s.ExtraCurricularInterests,
                    HallNameRoom = s.HallNameRoom,
                    Hobbies = s.Hobbies,
                    InterestedInPartTimeJob = s.InterestedInPartTimeJob,
                    LanguagesKnown = s.LanguagesKnown,
                    LocalGuardianName = s.LocalGuardianName,
                    LocalGuardianPhone = s.LocalGuardianPhone,
                    MccEmail = s.MccEmail,
                    MobileNumber = s.MobileNumber,
                    ModeOfConveyance = s.ModeOfConveyance,
                    NameFromForm = s.NameFromForm,
                    ParentGuardianSignature = s.ParentGuardianSignature,
                    Nationality = s.Nationality,
                    PersonalEmail = s.PersonalEmail,
                    PhysicalDisability = s.PhysicalDisability,
                    ReligionCommunity = s.ReligionCommunity,
                    SocialFacebook  = s.SocialFacebook,
                    SocialInstagram = s.SocialInstagram,
                    SocialTwitter = s.SocialTwitter,
                    SpecialHealthComplaint = s.SpecialHealthComplaint,
                    SslcAchievements = s.SslcAchievements,
                    SslcMarks = s.SslcMarks,
                    SslcPercentage = s.SslcPercentage,
                    SslcSchool = s.SslcSchool,
                    CreatedBy = s.CreatedBy,
                    CreatedOn = s.CreatedOn,
                    ModifiedBy = s.ModifiedBy,
                    ModifiedOn = s.ModifiedOn                  

                })
                .ToListAsync();

            return (data, total);
        }

        public async Task<TabulatorResponse<Student>> GetData(TabulatorRequest request)
        {

            var query =  _context.Students.AsQueryable().AsNoTracking();

            // 🔍 Apply Filters
            foreach (var f in request.Filters)
            {
                if (f.Field == "departmentId" && f.Value is JsonElement deptElem && deptElem.ValueKind == JsonValueKind.Array)
                {
                    var ids = deptElem.EnumerateArray().Select(x => x.GetInt32()).ToList();
                    query = query.Where(x => ids.Contains(x.DepartmentId));
                }
                else if (f.Field == "batchId" && f.Value is JsonElement batchElem && batchElem.ValueKind == JsonValueKind.Array)
                {
                    var ids = batchElem.EnumerateArray().Select(x => x.GetInt32()).ToList();
                    query = query.Where(x => ids.Contains(x.BatchId));
                }
                else if (f.Field == "fullName" && f.Value is JsonElement nameElem && nameElem.ValueKind == JsonValueKind.String)
                {
                    var name = nameElem.GetString() ?? "";
                    query = query.Where(x => x.FullName.Contains(name));
                }
                else if (f.Field == "roleNumber" && f.Value is JsonElement roleElem && roleElem.ValueKind == JsonValueKind.String)
                {
                    var role = roleElem.GetString() ?? "";
                    query = query.Where(x => x.RollNumber.Contains(role));
                }
                
            }

            // Sorting
            if (!string.IsNullOrEmpty(request.SortField))
            {
                if (request.SortDir == "asc")
                    query = query.OrderByDynamic(request.SortField, true);
                else
                    query = query.OrderByDynamic(request.SortField, false);
            }

            // Pagination
            var totalRecords = await query.CountAsync();
            var pageData = await query
                .Skip((request.Page - 1) * request.Size)
                .Take(request.Size)
                .ToListAsync();

            return new TabulatorResponse<Student>
            {
                Data = pageData,
                TotalRecords = totalRecords,
                LastPage = (int)Math.Ceiling((double)totalRecords / request.Size)
            };
        }

        public async Task ImportAlumniFromCsv(string csvPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HeaderValidated = null,
                MissingFieldFound = null,
            };

            using var reader = new StreamReader(csvPath);
            using var csv = new CsvReader(reader, config);

            var records = csv.GetRecords<dynamic>().ToList();
            var alumnis = new List<Alumni>();

            foreach (var r in records)
            {
                var alum = new Alumni
                {
                    DepartmentId = 1,
                    BatchId = 1,

                    Name = Get(r, "Student Name (List)"),
                    RegNo = Get(r, "Reg No"),
                    MccEmail = Get(r, "MCC Email"),
                    NameFromForm = Get(r, "Name (from form)"),
                    DateOfBirth = ToDate(Get(r, "Date of Birth")),
                    PersonalEmail = Get(r, "Personal Email-Id"),
                    ReligionCommunity = Get(r, "Religion & Community"),
                    Nationality = Get(r, "Nationality"),
                    AadharNo = Get(r, "Aadhar No"),
                    BloodGroup = Get(r, "Blood Group"),
                    MobileNumber = Get(r, "Mobile Number"),
                    SslcSchool = Get(r, "S.S.L.C School"),
                    SslcMarks = Get(r, "S.S.L.C Marks"),
                    SslcPercentage = Get(r, "S.S.L.C Percentage"),
                    SslcAchievements = Get(r, "S.S.L.C Achievements"),
                    ModeOfConveyance = Get(r, "Mode of Conveyance"),
                    HallNameRoom = Get(r, "Hall Name & Room"),
                    LocalGuardianName = Get(r, "Local Guardian Name"),
                    LocalGuardianPhone = Get(r, "Local Guardian Phone Number"),
                    Hobbies = Get(r, "Hobbies"),
                    ExtraCurricularInterests = Get(r, "Extra-Curricular Interests"),
                    SocialFacebook = Get(r, "Social Media (Facebook)"),
                    SocialInstagram = Get(r, "Social Media (Instagram)"),
                    SocialTwitter = Get(r, "Social Media (Twitter)"),
                    LanguagesKnown = Get(r, "Languages Known"),
                    InterestedInPartTimeJob = Get(r, "Interested in part time job?"),
                    SpecialHealthComplaint = Get(r, "Special Health Complaint/Allergic to"),
                    PhysicalDisability = Get(r, "Physical Disability if any"),
                    EmergencyPhone = Get(r, "In case of Emergency Phone No"),
                    DateOfSignature = ToDate(Get(r, "Date of Signature")),
                    ParentGuardianSignature = Get(r, "Parent/Guardian Signature"),

                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now
                };

                alumnis.Add(alum);
            }

            await _context.Alumnis.AddRangeAsync(alumnis);
            await _context.SaveChangesAsync();
        }

        // Helper to convert CSV values safely
        string? Get(dynamic row, string column)
        {
            try
            {
                var dict = (IDictionary<string, object>)row;
                return dict[column]?.ToString()?.Trim();
            }
            catch
            {
                return null;
            }
        }

        // Convert Date formats ("23/09/22", "23-9-2022", "2022-09-23")
        DateTime? ToDate(string? value)
        {
            if (DateTime.TryParse(value, out var d))
                return d;

            string[] formats = { "dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy", "dd/MM/yy", "d/M/yy" };

            if (DateTime.TryParseExact(value, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
                return d;

            return null;
        }
    }
}
