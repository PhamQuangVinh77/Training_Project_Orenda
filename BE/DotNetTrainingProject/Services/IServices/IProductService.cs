using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Services.IServices
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<string> AddProduct(ProductDTO p);
        Task<string> UpdateProduct(ProductDTO p);
        Task<string> DeleteProduct(int id);
        Task<string> AddProductWithNewGroup(ProductDTO p, ProductGroupDTO g);
    }
}
