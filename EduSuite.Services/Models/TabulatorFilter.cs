using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Models
{
    public class TabulatorFilter
    {
        public string Field { get; set; } = "";
        public string Type { get; set; } = "";
        public object Value { get; set; } = new();
    }

    public class TabulatorRequest
    {
        public int Page { get; set; } = 1;
        public int Size { get; set; } = 10;
        public string? SortField { get; set; }
        public string? SortDir { get; set; }
        public List<TabulatorFilter> Filters { get; set; } = new();
    }

    public class TabulatorResponse<T>
    {
        public int LastPage { get; set; }
        public int TotalRecords { get; set; }
        public List<T> Data { get; set; } = new();
    }
}
