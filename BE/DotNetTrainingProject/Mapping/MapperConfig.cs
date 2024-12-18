using AutoMapper;

namespace DotNetTrainingProject.Mapping
{
    public class MapperConfig
    {
        public MapperConfig() { }
        public static MapperConfiguration RegisterMapping()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingEntityToDTO());
                cfg.AddProfile(new MappingDTOToEntity());
            });
        }
    }
}
