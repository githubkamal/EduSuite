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

        public int DepartmentId { get; set; }

        // Staff-specific

        [MaxLength(50)]
        public string StaffCode { get; set; }

        // Student-specific
        [MaxLength(50)]
        public string RollNumber { get; set; }

        public int BatchId { get; set; }

    }
}
