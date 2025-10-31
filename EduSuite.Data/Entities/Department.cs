using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Department : BaseEntity
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int ModifiedBy {  get; set; }
    }
}
