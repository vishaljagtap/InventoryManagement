using API.Data_Access;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class InventoryController : ControllerBase
  {
    private readonly IDataAccess inventory;
    private readonly IConfiguration configuration;
    public InventoryController(IDataAccess inventory, IConfiguration configuration = null)
    {
        this.inventory = inventory;
        this.configuration = configuration;
    }
    [HttpPost("CreateAccount")]
    public IActionResult CreateAccount(User user)
    {
      if(!inventory.IsEmailAvailable(user.Email))
      {
        return Ok("Email is not available");
      }
      user.CreatedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
      user.UserType = UserType.USER;
      inventory.CreateUser(user);
      return Ok("Account created successfully!");
    }

    [HttpGet("Login")]
    public IActionResult Login(string email, string password)
    {
      if (inventory.AuthenticateUser(email, password, out User? user))
      {
        if (user != null)
        {
          var jwt = new Jwt(configuration["Jwt:Key"], configuration["Jwt:Duration"]);
          var token = jwt.GenerateToken(user);
          return Ok(token);
        }
      }
      return Ok("Invalid");
    }


    [HttpGet("GetAllBooks")]
    public IActionResult GetAllBooks()
    {
      var books = inventory.GetAllBooks();
      var booksToSend = books.Select(book => new
      {
          book.Id,
          book.Title,
          book.Category.Category,
          book.Category.SubCategory,
          book.Price,
          available = !book.Ordered,
          book.Author
        }).ToList();
      return Ok(booksToSend);
    }

    [HttpGet("OrderBook/{userId}/{bookId}")]
    public IActionResult OrderBook(int userId, int bookId)
    {
      var result = inventory.OrderBook(userId, bookId) ? "success" : "fail";
      return Ok(result);
    }

    [HttpGet("GetOrders/{id}")]
    public IActionResult GetOrders(int id)
    {
      return Ok(inventory.GetOrdersOfUser(id));
    }
    [HttpGet("GetAllOrders")]
    public IActionResult GetAllOrders()
    {
      return Ok(inventory.GetAllOrders());
    }

    [HttpGet("ReturnBook/{bookId}/{userId}")]
    public IActionResult ReturnBook(string bookId, string userId)
    {
      var result = inventory.ReturnBook(int.Parse(userId), int.Parse(bookId));
      return Ok(result == true ? "success" : "not returned");
    }

    [HttpGet("GetAllUsers")]
    public IActionResult GetAllUsers()
    {
      var users = inventory.GetUsers();
      var result = users.Select(user => new
      {
        user.Id,
        user.FirstName,
        user.LastName,
        user.Email,
        user.Mobile,
        user.Blocked,
        user.Active,
        user.CreatedOn,
        user.UserType,
        user.Fine
      });
      return Ok(result);
    }

    [HttpGet("ChangeBlockStatus/{status}/{id}")]
    public IActionResult ChangeBlockStatus(int status, int id)
    {
      if (status == 1)
      {
        inventory.BlockUser(id);
      }
      else
      {
        inventory.UnblockUser(id);
      }
      return Ok("success");
    }

    [HttpGet("ChangeEnableStatus/{status}/{id}")]
    public IActionResult ChangeEnableStatus(int status, int id)
    {
      if (status == 1)
      {
        inventory.ActivateUser(id);
      }
      else
      {
        inventory.DeactivateUser(id);
      }
      return Ok("success");
    }

    [HttpGet("GetAllCategories")]
    public IActionResult GetAllCategories()
    {
      var categories = inventory.GetAllCategories();
      var x = categories.GroupBy(c => c.Category).Select(item =>
      {
        return new
        {
          name = item.Key,
          children = item.Select(item => new { name = item.SubCategory }).ToList()
        };
      }).ToList();
      return Ok(x);
    }

    [HttpPost("InsertBook")]
    public IActionResult InsertBook(Book book)
    {
      book.Title = book.Title.Trim();
      book.Author = book.Author.Trim();
      book.Category.Category = book.Category.Category.Trim().ToLower();
      book.Category.SubCategory = book.Category.SubCategory.Trim().ToLower();

      inventory.InsertNewBook(book);
      return Ok("Inserted");
    }

    [HttpDelete("DeleteBook/{id}")]
    public IActionResult DeleteBook(int id)
    {
      var returnResult = inventory.DeleteBook(id) ? "success" : "fail";
      return Ok(returnResult);
    }

    [HttpPost("InsertCategory")]
    public IActionResult InsertCategory(BookCategory bookCategory)
    {
      bookCategory.Category = bookCategory.Category.ToLower();
      bookCategory.SubCategory = bookCategory.SubCategory.ToLower();
      inventory.CreateCategory(bookCategory);
      return Ok("Inserted");
    }
  }
}
