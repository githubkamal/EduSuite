using EduSuite.Data.Entities;
using EduSuite.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Interface
{
    public interface IAlumniService
    {
        Task<TabulatorResponse<Student>> GetData(TabulatorRequest request);

        Task<(IEnumerable<AlumniGridDto> data, int total)> GetAlumnisAsync(
        int page, int pageSize, string? search,
        string? sortColumn, string? sortDir,
        Dictionary<string, string[]>? filters);
    }
}
