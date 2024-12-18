using DotNetTrainingProject.DbContexts;
using DotNetTrainingProject.Repositories;
using DotNetTrainingProject.Repositories.IRepositories;
using DotNetTrainingProject.UnitOfWorks.Interfaces;

namespace DotNetTrainingProject.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        public MyTestDbContext DbContext {  get; }
        public IProductRepository ProductRepository { get; }
        public IProductGroupRepository ProductGroupRepository { get; }

        public UnitOfWork(MyTestDbContext dbContext)
        {
            DbContext = dbContext;
            ProductRepository = new ProductRepository(DbContext);
            ProductGroupRepository = new ProductGroupRepository(DbContext);
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            DbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
