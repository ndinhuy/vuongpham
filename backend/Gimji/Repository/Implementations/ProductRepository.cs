using Gimji.Data;
using Gimji.DTO;
using Gimji.DTO.Request.Product;
using Gimji.DTO.Respone.Product;
using Gimji.Models;
using Gimji.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Gimji.Repository.Implementations
{
    public class ProductRepository:IProductRepository
    {
        private readonly MyPostgresDbContext dbContext;
        private readonly IWebHostEnvironment environment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProductRepository(
            MyPostgresDbContext dbContext,
            IWebHostEnvironment environment,
            IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.environment = environment;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> DoesItemExist(string id)
        {
            return await dbContext.products.AnyAsync(p => p.productID == id);
        }

        public async Task<IEnumerable<Product>> GetAllProduct(string? search, decimal? from, decimal? to, string? sortBy, int? limit, int? page = 1)
        {
            var query = dbContext.products
                .Include(p => p.category)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.name.Contains(search));

            if (from.HasValue)
                query = query.Where(p => p.price >= from);

            if (to.HasValue)
                query = query.Where(p => p.price <= to);

            query = sortBy switch
            {
                "name_desc" => query.OrderByDescending(p => p.name),
                "price_desc" => query.OrderByDescending(p => p.price),
                "price_asc" => query.OrderBy(p => p.price),
                _ => query.OrderBy(p => p.name)
            };

            if (limit.HasValue && page.HasValue && limit > 0 && page > 0)
            {
                query = query.Skip((page.Value - 1) * limit.Value).Take(limit.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductByCategory(string categoryCode, string? search, decimal? from, decimal? to, string? sortBy, int? limit, int? page = 1)
        {
            var query = dbContext.products
                .Include(p => p.category)
                .Where(p => p.category.CodeValue == categoryCode)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.name.Contains(search));

            if (from.HasValue)
                query = query.Where(p => p.price >= from);

            if (to.HasValue)
                query = query.Where(p => p.price <= to);

            query = sortBy switch
            {
                "name_desc" => query.OrderByDescending(p => p.name),
                "price_desc" => query.OrderByDescending(p => p.price),
                "price_asc" => query.OrderBy(p => p.price),
                _ => query.OrderBy(p => p.name)
            };

            if (limit.HasValue && page.HasValue && limit > 0 && page > 0)
            {
                query = query.Skip((page.Value - 1) * limit.Value).Take(limit.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Product?> GetProductById(string id)
        {
            return await dbContext.products
                .Include(p => p.category)
                .FirstOrDefaultAsync(p => p.productID == id);
        }

        public async Task<Product?> GetProductByName(string name)
        {
            return await dbContext.products
                .Include(p => p.category)
                .FirstOrDefaultAsync(p => p.name == name);
        }

        public async Task AddProduct(Product product)
        {
            await dbContext.products.AddAsync(product);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            dbContext.products.Update(product);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteProduct(string id)
        {
            var product = await dbContext.products.FindAsync(id);
            if (product != null)
            {
                dbContext.products.Remove(product);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<string> SaveImages(IFormFile imageFile)
        {
            // Lấy phần mở rộng (.jpg, .png, ...)
            var extension = Path.GetExtension(imageFile.FileName);
            // Tạo tên ngắn từ tên file gốc không có đuôi mở rộng
            var originalName = Path.GetFileNameWithoutExtension(imageFile.FileName)
                                    .Replace(" ", "")           // loại bỏ khoảng trắng
                                    .Replace(".", "")           // loại bỏ dấu chấm thừa
                                    .Take(10);                  // lấy tối đa 10 ký tự đầu
                                                                // Tạo tên file duy nhất: yyyyMMdd_HHmmssfff_GUID.ext
            var imageName = $"{DateTime.UtcNow:yyyyMMdd_HHmmssfff}_{new string(originalName.ToArray())}_{Guid.NewGuid().ToString().Substring(0, 8)}{extension}";
         

            var imagePath = Path.Combine(environment.ContentRootPath, "images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public async Task DeleteImage(string fileName)
        {
            var imagePath = Path.Combine(environment.ContentRootPath, "images", fileName);
            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
        }

        public async Task<Product?> GetProductBySlug(string slug)
        {
            var product = await dbContext.products
                .Include(p => p.category)
                .FirstOrDefaultAsync(p => p.Slug == slug);

            if (product != null)
            {
                product.ImageSrc = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}/images/{product.image1}";
            }

            return product;
        }

    }
}
