using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Learning.Programing.Frontend.Pages.SalesOrders;

public class NewModel(ILogger<NewModel> logger) : PageModel
{
    [BindProperty]
    public SalesOrderInputModel SalesOrder { get; set; } = new ();
    
    public void OnGet()
    {
    }

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        // Here you would typically save the sales order to a database
        // For demonstration, we will just redirect to a confirmation page
        logger.LogInformation("Data {Order}", JsonSerializer.Serialize(SalesOrder));

        return RedirectToPage("/SalesOrders/Confirmation", new { customerName = SalesOrder.CustomerName });
    }
}

public class SalesOrderInputModel
{
    public string? CustomerName { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Status { get; set; }
}

