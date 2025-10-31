using EduSuite.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Interface
{
    public interface IAccountService
    {
        Task<Login> RegisterAsync(string email, string password, int role);
        Task<bool> UserExistsAsync(string email);
        Task<Login> AuthenticateAsync(string email, string password);
        Task AddStudentAsync(Student student);
        Task AddStaffAsync(Staff staff);
    }
}
