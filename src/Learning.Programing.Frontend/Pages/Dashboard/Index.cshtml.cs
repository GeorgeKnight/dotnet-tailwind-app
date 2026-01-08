using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learning.Programing.Frontend.Pages.Dashboard;

public class DashboardIndexModel : PageModel
{
    private readonly ILogger<DashboardIndexModel> _logger;

    public DashboardIndexModel(ILogger<DashboardIndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
