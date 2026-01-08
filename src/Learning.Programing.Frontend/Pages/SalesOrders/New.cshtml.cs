using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learning.Programing.Frontend.Pages.SalesOrders;

public class NewModel : PageModel
{
    [BindProperty]
    public SalesOrderInputModel SalesOrder { get; set; } = new ();
    
    public void OnGet()
    {
    }
}

public class SalesOrderInputModel
{
    public string? CustomerName { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Status { get; set; }
}

