using DotNetTrainingProject.DbContexts;
using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Repositories.IRepositories;
using Dapper;

namespace DotNetTrainingProject.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly MyTestDbContext _dbContext;
        public ProductRepository(MyTestDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public override async Task<List<Product>> GetAll()
        {
            try
            {
                var query = "SELECT * FROM products WHERE IsDeleted = 0";
                using (var connection = _dbContext.CreateConnection())
                {
                    var responses = await connection.QueryAsync<Product>(query);
                    return responses.ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public override async Task<Product> GetById(int id)
        {
            try
            {
                var query = "SELECT * FROM products WHERE Id = @id AND IsDeleted = 0";
                using (var connection = _dbContext.CreateConnection())
                {
                    var response = await connection.QuerySingleOrDefaultAsync<Product>(query, new {id});
                    return response;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Product>> GetByGroup(int groupId)
        {
            try
            {
                var query = "SELECT * FROM products WHERE IsDeleted = 0 AND ProductGroupId = @groupId";
                using (var connection = _dbContext.CreateConnection())
                {
                    var responses = await connection.QueryAsync<Product>(query, new {groupId});
                    return responses.ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
