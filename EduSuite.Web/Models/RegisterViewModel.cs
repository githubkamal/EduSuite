using System.ComponentModel.DataAnnotations;

namespace EduSuite.Web.Models
{
    public class RegisterViewModel
    {
        [Required, MaxLength(100)]
        public string FullName { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; }


        [Required, DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public int RoleId { get; set; } // "Student" or "Staff"

        // Student-specific
        [MaxLength(50)]
        public string RollNumber { get; set; }

        [MaxLength(100)]
        public string Course { get; set; }

        [MaxLength(50)]
        public string Batch { get; set; }

        // Staff-specific

        [MaxLength(50)]
        public string StaffCode { get; set; }
        public int DepartmentId { get; set; }
    }
}
