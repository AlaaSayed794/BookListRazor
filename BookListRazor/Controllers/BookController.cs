using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookListRazor.Controllers
{
    //route to call for this controller
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        //calls context class and instantiate an object of the database
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }
        
        //Get request handler, will return all books in db as JSON
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json( new { data = await _db.Book.ToListAsync() });
        }

        //delete request will take an int which is the id of the book to be deleted
        //the server just removes the item from the db so the client side has to reload the datatable
        [HttpDelete]
        public async Task<IActionResult> DeleteABook(int id)
        {
            var bookDb =await _db.Book.FirstOrDefaultAsync(u=> u.Id == id);
            if (bookDb == null)
            {
                return Json(new { success = false ,message="Error while deleting"});
            }
            _db.Book.Remove(bookDb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "deleted the Book with name : \"" + bookDb.Name + "\" , author : \""+bookDb.Author +"\"" });
        }

    }
}
