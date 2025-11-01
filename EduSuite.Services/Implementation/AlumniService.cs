using EduSuite.Data.EduSuite.Data;
using EduSuite.Data.Entities;
using EduSuite.Services.Helpers;
using EduSuite.Services.Interface;
using EduSuite.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            var query = _context.Students
                .Include(s => s.Department)
                .Include(s => s.Batch)
                .AsQueryable();

            // Global search (optional)
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s =>
                    s.FullName.Contains(search) ||
                    s.RollNumber.Contains(search) ||
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
                                query = query.Where(s => values.Any(v => s.RollNumber.Contains(v)));
                                break;

                            case "fullname":
                                // For full name, support partial matching
                                query = query.Where(s => values.Any(v => s.FullName.Contains(v)));
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
                    "id" => isDesc ? query.OrderByDescending(s => s.Id) : query.OrderBy(s => s.Id),
                    "rollnumber" => isDesc ? query.OrderByDescending(s => s.RollNumber) : query.OrderBy(s => s.RollNumber),
                    "fullname" => isDesc ? query.OrderByDescending(s => s.FullName) : query.OrderBy(s => s.FullName),
                    "departmentname" => isDesc ? query.OrderByDescending(s => s.Department.DepartmentName) : query.OrderBy(s => s.Department.DepartmentName),
                    "batchname" => isDesc ? query.OrderByDescending(s => s.Batch.BatchName) : query.OrderBy(s => s.Batch.BatchName),
                    _ => query.OrderBy(s => s.Id)
                };
            }
            else
            {
                // Default sorting
                query = query.OrderBy(s => s.Id);
            }

            // Pagination and projection
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(s => new AlumniGridDto
                {
                    Id = s.Id,
                    RollNumber = s.RollNumber,
                    FullName = s.FullName,
                    DepartmentId = s.DepartmentId,
                    DepartmentName = s.Department.DepartmentName,
                    BatchId = s.BatchId,
                    BatchName = s.Batch.BatchName
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
    }
}
