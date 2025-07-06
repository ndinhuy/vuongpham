using Gimji.Data;
using Gimji.DTO;
using Gimji.DTO.Request.Category;
using Gimji.Models;
using Gimji.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Gimji.Repository.Implementations
{
    public class CategoryRepository:ICategoryRepository
    {
        private readonly MyPostgresDbContext dbContext;

        public CategoryRepository(MyPostgresDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> DoesItemExist(string id)
        {
            return await dbContext.categoryCodes.AnyAsync(c => c.CodeValue == id);
        }

        public async Task<IEnumerable<CategoryCode>> GetAllCategory()
        {
            return await dbContext.categoryCodes.ToListAsync();
        }

        public async Task<CategoryCode?> GetCategoryById(string id)
        {
            return await dbContext.categoryCodes.FirstOrDefaultAsync(c => c.CodeValue == id);
        }

        public async Task<IEnumerable<CategoryCode>> GetCategoryByName(string name)
        {
            return await dbContext.categoryCodes.Where(c => c.Name.Contains(name)).ToListAsync();
        }

        public async Task AddCategory(CategoryCode category)
        {
            await dbContext.categoryCodes.AddAsync(category);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateCategory(CategoryCode category)
        {
            dbContext.categoryCodes.Update(category);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCategory(CategoryCode category)
        {
            dbContext.categoryCodes.Remove(category);
            await dbContext.SaveChangesAsync();
        }
    }
}
