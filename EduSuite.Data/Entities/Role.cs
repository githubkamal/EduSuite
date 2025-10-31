using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Role : BaseEntity
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;
        public int ModifiedBy {  get; set; }
    }
}
