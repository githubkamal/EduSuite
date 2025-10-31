using EduSuite.Services.Interface;
using EduSuite.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EduSuite.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly ILookupService _lookupService;
        private string CLAIM_FULLNAME = "Administrator";
        public AccountController(IAccountService accountService, ILookupService lookupService)
        {
            _accountService = accountService;
            _lookupService = lookupService;
        }

        public async Task<IActionResult> Register()
        {
            var departments = await _lookupService.GetDepartments();

            ViewBag.Departments = departments
            .Select(d => new SelectListItem
            {
                Value = d.DepartmentId.ToString(),
                Text = d.DepartmentName
            })
            .ToList();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            //if (!ModelState.IsValid)
            //    return View(model);

            if (await _accountService.UserExistsAsync(model.Email))
            {
                ModelState.AddModelError("", "Email already exists.");
                return View(model);
            }

            var login = await _accountService.RegisterAsync(model.Email, model.Password, model.RoleId);

            if (!string.IsNullOrEmpty(model.RollNumber))
            {
                model.RoleId = 3;
                await _accountService.AddStudentAsync(new()
                {
                    FullName = model.FullName,
                    Batch = model.Batch,
                    RollNumber = model.RollNumber,
                    Course = model.Course,
                    LoginId = login.Id,


                });
            }
            else
            {
                await _accountService.AddStaffAsync(new()
                {
                    FullName = model.FullName,
                    DepartmentId = model.DepartmentId,
                    LoginId = login.Id,
                    StaffCode = model.StaffCode
                });
            }

            TempData["Success"] = "Registration successful! Please log in.";
            return RedirectToAction("Login");
        }

        public IActionResult Login() => View();

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = await _accountService.AuthenticateAsync(model.Email, model.Password);
            if (user == null)
            {
                ModelState.AddModelError("", "Invalid username or password.");
                return View(model);
            }
            else
            {
                if (user.RoleId == 2)
                {
                    CLAIM_FULLNAME = user?.Staff?.FullName;
                }
                else if (user.RoleId == 3)
                {
                    CLAIM_FULLNAME = user?.Student.FullName;
                }

                var claims = new List<Claim>
                {
                new Claim(ClaimTypes.Name, CLAIM_FULLNAME),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleName)
                };

                var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTime.UtcNow.AddHours(8)
                };

                await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

                // Redirect to Dashboard after login
                return RedirectToAction("Index", "Dashboard", new { area = "Alumni" });
            }
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
    }
}

