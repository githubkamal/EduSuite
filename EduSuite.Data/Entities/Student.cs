using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Student : BaseEntity
    {
        public int Id { get; set; }
        public int LoginId { get; set; }

        public string RollNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Course { get; set; } = string.Empty;
        public string Batch { get; set; } = string.Empty;

        public Login Login { get; set; } = null!;
    }
}
