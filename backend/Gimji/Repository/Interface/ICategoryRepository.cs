using Gimji.Models;

namespace Gimji.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<bool> DoesItemExist(string id);
        Task<IEnumerable<CategoryCode>> GetAllCategory();
        Task<CategoryCode?> GetCategoryById(string id);
        Task<IEnumerable<CategoryCode>> GetCategoryByName(string name);
        Task AddCategory(CategoryCode category);
        Task UpdateCategory(CategoryCode category);
        Task DeleteCategory(CategoryCode category);
    }
}
