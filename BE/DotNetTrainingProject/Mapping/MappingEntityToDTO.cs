using AutoMapper;
using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Mapping
{
    public class MappingEntityToDTO : Profile
    {
        public MappingEntityToDTO() {
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductGroup, ProductGroupDTO>();
        }
    }
}
