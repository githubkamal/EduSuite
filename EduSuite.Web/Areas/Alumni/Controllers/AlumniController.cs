using EduSuite.Services.Implementation;
using EduSuite.Services.Interface;
using EduSuite.Services.Models;
using EduSuite.Web.Areas.Alumni.Models;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace EduSuite.Web.Areas.Alumni.Controllers
{
    [Area("Alumni")]
    public class AlumniController : Controller
    {

        private readonly IAlumniService _alumniService;
        private readonly ILookupService _lookupService;
        public AlumniController(IAlumniService alumniService, ILookupService lookupService)
        {
            _alumniService = alumniService;
            _lookupService = lookupService;
        }

        public IActionResult Index()
        {
            return View();
        }

        
        public async Task<IActionResult> Create()
        {
            var departments = await _lookupService.GetDepartments();
            ViewBag.Departments = departments
            .Select(d => new SelectListItem
            {
                Value = d.DepartmentId.ToString(),
                Text = d.DepartmentName
            }).ToList();

            var batches = await _lookupService.GetBatchs();
            ViewBag.Batches = batches
            .Select(b => new SelectListItem
            {
                Value = b.BatchId.ToString(),
                Text = b.BatchName
            }).ToList();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AlumniGridDto alumniGridDto)
        {
            try
            {
                await _alumniService.AddAlumniAsync(alumniGridDto);
                TempData["Success"] = "Alumni added successfully!";
                return RedirectToAction("Index", "Dashboard", new { area = "Alumni" });
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                return View(alumniGridDto);
            }
        }

        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                AlumniGridDto dto = await _alumniService.GetAlumniAsync(id);
                return View(dto);
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                return View(id);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(AlumniGridDto dto)
        {
            try
            {
                await _alumniService.UpdateAlumniAsync(dto.AlumniId, dto);
                TempData["Success"] = "Alumni updated successfully!";
                return RedirectToAction("Index", "Dashboard", new { area = "Alumni" });
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                return View(dto);
            }
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
