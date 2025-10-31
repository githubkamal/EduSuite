using EduSuite.Data.EduSuite.Data;
using EduSuite.Data.Entities;
using EduSuite.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly EduSuiteDbContext _context;

        public AccountService(EduSuiteDbContext context)
        {
            _context = context;
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Logins.AnyAsync(x => x.Email == email);
        }

        public async Task<Login> RegisterAsync(string email, string password, int role)
        {
            var hashedPassword = HashPassword(password);

            var login = new Login
            {
                Email = email,
                PasswordHash = hashedPassword,
                RoleId = role
            };

            _context.Logins.Add(login);
            await _context.SaveChangesAsync();
            return login;
        }

        public async Task<Login?> AuthenticateAsync(string email, string password)
        {
            // Get user by email
            var user = await _context.Logins
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == email);

            // Validate password
            if (user == null || !VerifyPassword(password, user.PasswordHash))
                return null;

            // Load related entity based on role
            switch (user.RoleId)
            {
                case 2: // Staff
                    user.Staff = await _context.Staffs
                        .AsNoTracking()
                        .FirstOrDefaultAsync(x => x.LoginId == user.Id);
                    break;

                case 3: // Student
                    user.Student = await _context.Students
                        .AsNoTracking()
                        .FirstOrDefaultAsync(x => x.LoginId == user.Id);
                    break;
            }

            // Get role name
            var role = await _context.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.RoleId == user.RoleId);

            user.RoleName = role?.RoleName ?? "";

            return user;
        }

        public async Task AddStudentAsync(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
        }

        public async Task AddStaffAsync(Staff staff)
        {
            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
}
