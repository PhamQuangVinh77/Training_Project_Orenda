using AutoMapper;
using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Repositories.IRepositories;
using DotNetTrainingProject.Services.IServices;
using DotNetTrainingProject.UnitOfWorks.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace DotNetTrainingProject.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        private IProductRepository _productRepository;
        private IProductGroupRepository _productGroupRepository;
        private ILogger<ProductService> _logger;

        public ProductService(IMapper mapper, IUnitOfWork unitOfWork, ILogger<ProductService> logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productRepository = _unitOfWork.ProductRepository;
            _productGroupRepository = _unitOfWork.ProductGroupRepository;
            _logger = logger;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            try
            {
                return await _productRepository.GetAll();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<Product> GetProductById(int id)
        {
            try
            {
                return await _productRepository.GetById(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<string> AddProduct(ProductDTO p)
        {
            try
            {
                var response = _mapper.Map<Product>(p);
                response.Id = 0;
                response.CreatedDate = DateTime.Now;
                response.IsDeleted = false;
                await _productRepository.Add(response);
                await _unitOfWork.Save();
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Add new product failed!";
            }
        }

        public async Task<string> UpdateProduct(ProductDTO p)
        {
            try
            {
                var check = await _productRepository.GetById(p.Id);
                if (check == null) return "Product doesn't exist!";
                _mapper.Map<ProductDTO, Product>(p, check);
                _productRepository.Update(check);
                await _unitOfWork.Save();
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Update product failed!";
            }
        }

        public async Task<string> DeleteProduct(int id)
        {
            try
            {
                var response = await _productRepository.GetById(id);
                if (response == null) return "Product doesn't exist!";
                response.IsDeleted = true;
                _productRepository.Update(response);
                await _unitOfWork.Save();
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Delete product failed!";
            }
        }

        public async Task<string> AddProductWithNewGroup(ProductDTO p, ProductGroupDTO g)
        {
            using (IDbContextTransaction transaction = _unitOfWork.DbContext.Database.BeginTransaction())
            {
                try
                {
                    // Add new group
                    var groupResponse = _mapper.Map<ProductGroup>(g);
                    groupResponse.Id = 0;
                    groupResponse.CreatedDate = DateTime.Now;
                    groupResponse.IsDeleted = false;
                    await _productGroupRepository.Add(groupResponse);
                    await _unitOfWork.Save();

                    // Add new product
                    var productResponse = _mapper.Map<Product>(p);
                    productResponse.Id = 0;
                    productResponse.CreatedDate = DateTime.Now;
                    productResponse.ProductGroupId = groupResponse.Id;
                    productResponse.IsDeleted = false;
                    await _productRepository.Add(productResponse);
                    await _unitOfWork.Save();
                    transaction.Commit();
                    return String.Empty;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    _logger.LogError(ex.Message);
                    return "Add new product and new group failed!";
                }
            }
        }
    }
}
