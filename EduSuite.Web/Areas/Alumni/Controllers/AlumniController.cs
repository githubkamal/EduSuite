using EduSuite.Services.Implementation;
using EduSuite.Services.Interface;
using EduSuite.Services.Models;
using EduSuite.Web.Areas.Alumni.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace EduSuite.Web.Areas.Alumni.Controllers
{
    public class AlumniController : Controller
    {

        private readonly IAlumniService _alumniService;
        public AlumniController(IAlumniService alumniService, ILookupService lookupService)
        {
            _alumniService = alumniService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetAlumnis([FromBody] AlumniGridRequest request)
        {
            var result = await _alumniService.GetAlumnisAsync(
            request.Page, request.PageSize,
            request.Search, request.SortColumn, request.SortDir, request.Filters);

            return Json(new { data = result.data, total = result.total });
        }

        [HttpPost("GetData")]
        public async Task<IActionResult> GetData([FromBody] TabulatorRequest request)
        {
            var result = await _alumniService.GetData(request);
            return Ok(result);
        }
    }
}
