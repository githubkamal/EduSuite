using EduSuite.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Interface
{
    public interface ILookupService
    {
        Task<List<Department>> GetDepartments();
        Task<List<Role>> GetRoles();
    }
}
