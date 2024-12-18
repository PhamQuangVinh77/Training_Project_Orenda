using AutoMapper;
using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Repositories.IRepositories;
using DotNetTrainingProject.Services.IServices;
using DotNetTrainingProject.UnitOfWorks.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace DotNetTrainingProject.Services
{
    public class ProductGroupService : IProductGroupService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        private IProductGroupRepository _pgRepository;
        private IProductRepository _productRepository;
        private ILogger<ProductGroupService> _logger;

        public ProductGroupService(IMapper mapper, IUnitOfWork unitOfWork, ILogger<ProductGroupService> logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _pgRepository = _unitOfWork.ProductGroupRepository;
            _productRepository = _unitOfWork.ProductRepository;
            _logger = logger;
        }

        public async Task<List<ProductGroup>> GetAllProductGroups()
        {
            try
            {
                return await _pgRepository.GetAll();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<ProductGroup> GetProductGroupById(int id)
        {
            try
            {
                return await _pgRepository.GetById(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<string> AddProductGroup(ProductGroupDTO p)
        {
            try
            {
                var response = _mapper.Map<ProductGroup>(p);
                response.Id = 0;
                response.CreatedDate = DateTime.Now;
                response.IsDeleted = false;
                await _pgRepository.Add(response);
                await _unitOfWork.Save();
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Add new group failed!";
            }
        }

        public async Task<string> UpdateProductGroup(ProductGroupDTO p)
        {
            try
            {
                var check = await _pgRepository.GetById(p.Id);
                if (check == null) return "Group doesn't exist!";
                _mapper.Map<ProductGroupDTO, ProductGroup>(p, check);
                _pgRepository.Update(check);
                await _unitOfWork.Save();
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Update group failed!";
            }
        }

        public async Task<string> DeleteProductGroup(int id)
        {
            using (IDbContextTransaction transaction = _unitOfWork.DbContext.Database.BeginTransaction())
            {
                try
                {
                    // Delete group
                    var response = await _pgRepository.GetById(id);
                    if (response == null) return "Group doesn't exist!";
                    response.IsDeleted = true;
                    _pgRepository.Update(response);
                    await _unitOfWork.Save();

                    // Delete products in group
                    var listProduct = await _productRepository.GetByGroup(response.Id);
                    if (listProduct.Count > 0)
                    {
                        foreach (var item in listProduct)
                        {
                            item.IsDeleted = true;
                            _productRepository.Update(item);
                        }
                    }
                    await _unitOfWork.Save();
                    transaction.Commit();
                    return String.Empty;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    _logger.LogError(ex.Message);
                    return "Delete product failed!";
                }
            }
        }
    }
}
