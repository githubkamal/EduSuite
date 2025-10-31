using System.ComponentModel.DataAnnotations;

namespace EduSuite.Web.Models
{
    public class LoginViewModel
    {
        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
