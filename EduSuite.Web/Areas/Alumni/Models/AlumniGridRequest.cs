namespace EduSuite.Web.Areas.Alumni.Models
{
    public class AlumniGridRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public string? SortColumn { get; set; }
        public string? SortDir { get; set; }
        public Dictionary<string, string[]>? Filters { get; set; }
    }
}
