using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Staff : BaseEntity
    {
        public int Id { get; set; }
        public int LoginId { get; set; }

        public string StaffCode { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public int ModifiedBy {  get; set; }

        public Login Login { get; set; } = null!;
    }
}
