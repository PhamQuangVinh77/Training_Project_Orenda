using DotNetTrainingProject.Entities;

namespace DotNetTrainingProject.Models.Requests
{
    public class TestTransactionRequest
    {
        public ProductDTO Product { get; set; }
        public ProductGroupDTO ProductGroup { get; set; }
    }
}
