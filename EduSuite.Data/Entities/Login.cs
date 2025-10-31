using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Login : BaseEntity
    {
        public int Id { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // "Staff" or "Student"
        public bool IsActive { get; set; } = true;

        // Navigation
        public Staff? Staff { get; set; }
        public Student? Student { get; set; }
    }

}
