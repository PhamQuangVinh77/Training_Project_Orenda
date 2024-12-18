using AutoMapper;
using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Mapping
{
    public class MappingDTOToEntity : Profile
    {
        public MappingDTOToEntity() { 
            CreateMap<ProductDTO, Product>();
            CreateMap<ProductGroupDTO, ProductGroup>();
        }
    }
}
