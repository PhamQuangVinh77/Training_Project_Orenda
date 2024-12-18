using DotNetTrainingProject.DbContexts;
using DotNetTrainingProject.Repositories.IRepositories;

namespace DotNetTrainingProject.UnitOfWorks.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public MyTestDbContext DbContext {  get; }
        public IProductRepository ProductRepository { get; }
        public IProductGroupRepository ProductGroupRepository { get; }
        Task Save();
        void Dispose();
    }
}
