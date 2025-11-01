using EduSuite.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EduSuite.Web.Areas.Alumni.Controllers
{
    [Area("Alumni")]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly ILookupService _lookupService;

        public DashboardController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }
        public async Task<IActionResult> Index()
        {
            ViewBag.Departments = await _lookupService.GetDepartments();
            ViewBag.Batches = await _lookupService.GetBatchs();
            return View();
        }
    }
}
