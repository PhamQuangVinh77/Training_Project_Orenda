using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Repositories.IRepositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<Product>> GetAll();
        Task<Product> GetById(int id);
        Task<List<Product>> GetByGroup(int groupId);
    }
}
