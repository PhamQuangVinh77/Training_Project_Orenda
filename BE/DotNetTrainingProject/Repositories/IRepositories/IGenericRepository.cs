namespace DotNetTrainingProject.Repositories.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<bool> Add(T entity);
        bool Update(T entity);
    }
}
