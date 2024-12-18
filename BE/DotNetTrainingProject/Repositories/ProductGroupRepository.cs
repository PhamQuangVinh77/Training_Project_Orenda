using Dapper;
using DotNetTrainingProject.DbContexts;
using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Repositories.IRepositories;

namespace DotNetTrainingProject.Repositories
{
    public class ProductGroupRepository : GenericRepository<ProductGroup>, IProductGroupRepository
    {
        private readonly MyTestDbContext _dbContext;
        public ProductGroupRepository(MyTestDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task<List<ProductGroup>> GetAll()
        {
            try
            {
                var query = "SELECT * FROM productgroups WHERE IsDeleted = 0";
                using (var connection = _dbContext.CreateConnection())
                {
                    var responses = await connection.QueryAsync<ProductGroup>(query);
                    return responses.ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public override async Task<ProductGroup> GetById(int id)
        {
            try
            {
                var query = "SELECT * FROM productgroups WHERE Id = @id AND IsDeleted = 0";
                using (var connection = _dbContext.CreateConnection())
                {
                    var response = await connection.QuerySingleOrDefaultAsync<ProductGroup>(query, new { id });
                    return response;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
