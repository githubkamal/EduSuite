using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    public class Batch : BaseEntity
    {
        public int BatchId { get; set; }
        public string BatchName { get; set; } = string.Empty;
        public int? ModifiedBy { get; set; }
    }
}
