using EduSuite.Data.EduSuite.Data;
using EduSuite.Data.Entities;
using EduSuite.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Implementation
{
    public class LookupService : ILookupService
    {
        private readonly EduSuiteDbContext _context;

        public LookupService(EduSuiteDbContext context)
        {
            _context = context;
        }

        public async Task<List<Department>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<List<Role>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<List<Batch>> GetBatchs()
        {
            return await _context.Batchs.ToListAsync();
        }
    }
}
