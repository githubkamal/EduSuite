using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Models
{
    public class AlumniGridDto
    {
        public int Id { get; set; }
        public string RollNumber { get; set; }
        public string FullName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int BatchId { get; set; }
        public string BatchName { get; set; }
    }
}
