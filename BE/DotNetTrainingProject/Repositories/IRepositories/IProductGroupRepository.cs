using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Repositories.IRepositories
{
    public interface IProductGroupRepository : IGenericRepository<ProductGroup>
    {
        Task<List<ProductGroup>> GetAll();
        Task<ProductGroup> GetById(int id);
    }
}
