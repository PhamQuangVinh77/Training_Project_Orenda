using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Services.IServices
{
    public interface IProductGroupService
    {
        Task<List<ProductGroup>> GetAllProductGroups();
        Task<ProductGroup> GetProductGroupById(int id);
        Task<string> AddProductGroup(ProductGroupDTO p);
        Task<string> UpdateProductGroup(ProductGroupDTO p);
        Task<string> DeleteProductGroup(int id);
    }
}
