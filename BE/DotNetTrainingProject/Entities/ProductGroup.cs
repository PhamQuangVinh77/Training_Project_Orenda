using System.ComponentModel.DataAnnotations;

namespace DotNetTrainingProject.Entities
{
    public class ProductGroup
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class ProductGroupDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
