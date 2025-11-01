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
        public int DepartmentId { get; set; }
        public int BatchId { get; set; }

        public Login Login { get; set; } = null!;
        public Department Department { get; set; }
        public Batch Batch { get; set; }
    }
}
