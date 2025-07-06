using Gimji.Models;

namespace Gimji.Repository.Interface
{
    public interface IProductRepository
    {
        Task<bool> DoesItemExist(string id);

        Task<IEnumerable<Product>> GetAllProduct(
            string? search,
            decimal? from,
            decimal? to,
            string? sortBy,
            int? limit,
            int? page = 1
        );

        Task<IEnumerable<Product>> GetProductByCategory(
            string categoryCode,
            string? search,
            decimal? from,
            decimal? to,
            string? sortBy,
            int? limit,
            int? page = 1
        );

        Task<Product?> GetProductById(string id);

        Task<Product?> GetProductByName(string name);

        Task AddProduct(Product product);

        Task UpdateProduct(Product product);

        Task DeleteProduct(string id);

        Task<string> SaveImages(IFormFile imageFile);

        Task DeleteImage(string fileName);

        Task<Product?> GetProductBySlug(string slug);

    }
}
