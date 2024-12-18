using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Models.Responses;
using DotNetTrainingProject.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetTrainingProject.Controllers
{
    [ApiController]
    [Route("api/product-groups")]
    public class ProductGroupController : Controller
    {
        private IProductGroupService _productGroupService;
        public ProductGroupController(IProductGroupService productGroupService)
        {
            _productGroupService = productGroupService;
        }

        [HttpGet]
        [Authorize]
        public async Task<List<ProductGroup>> GetAllGroups()
        {
            var listResponse = await _productGroupService.GetAllProductGroups();
            return listResponse;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ProductGroup> GetGroupById([FromForm] int id)
        {
            var response = await _productGroupService.GetProductGroupById(id);
            return response;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddGroup([FromBody] ProductGroupDTO p)
        {
            var response = await _productGroupService.AddProductGroup(p);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Add new group successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateGroup([FromBody] ProductGroupDTO p)
        {
            var response = await _productGroupService.UpdateProductGroup(p);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Update group successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGroup([FromForm] int id)
        {
            var response = await _productGroupService.DeleteProductGroup(id);
            if (String.IsNullOrEmpty(response))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Delete group successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = response });
        }
    }
}
