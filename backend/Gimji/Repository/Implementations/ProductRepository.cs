using Gimji.DTO.Request.Product;
using Gimji.DTO.Respone.Product;
using Gimji.Models;

namespace Gimji.Repository.Implementations
{
    public interface ProductRepository
    {
        Task<bool> DoesItemExist(string id);
        Task<IEnumerable<Product>> GetAllProduct(string? search, decimal? from, decimal? to, string? sortBy,int? limit , int? page = 1);
        Task<IEnumerable<Product>> GetProductByCategory(string categoryCode, string? search, decimal? from, decimal? to, string? sortBy, int? limit, int? page = 1);
        Task<Product> GetProductById(string id);
        Task<Product> GetProductByName(string name);
        Task AddProduct(addProduct addProduct);
        Task UpdateProduct(string id, ProductDTO productDTO);
        Task DeleteProduct(string id);
        Task<string> saveImages(IFormFile imageFile);
    }
}
