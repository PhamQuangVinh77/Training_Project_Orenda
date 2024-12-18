using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Models.Requests;
using DotNetTrainingProject.Models.Responses;
using DotNetTrainingProject.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetTrainingProject.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : Controller
    {
        private IProductService _service;
        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<List<Product>> GetAllProducts()
        {
            var listResponse = await _service.GetAllProducts();
            return listResponse;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<Product> GetProductById([FromForm] int id)
        {
            var response = await _service.GetProductById(id);
            return response;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProduct([FromBody] ProductDTO p)
        {
            var response = await _service.AddProduct(p);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Add new product successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDTO p)
        {
            var response = await _service.UpdateProduct(p);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Update product successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response});
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct([FromForm] int id)
        {
            var response = await _service.DeleteProduct(id);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Delete product successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }

        [HttpPost("add-product-with-new-group")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProductWithNewGroup([FromBody] TestTransactionRequest request)
        {
            var response = await _service.AddProductWithNewGroup(request.Product, request.ProductGroup);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Add product successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }
    }
}
