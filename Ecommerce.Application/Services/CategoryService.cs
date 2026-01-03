using ECommerce.Application.DTOS;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;

public class CategoryService
{
    private readonly ICategoryRepository _repo;
    public CategoryService(ICategoryRepository repo) => _repo = repo;

    public async Task<List<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _repo.GetAllAsync();
        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name
        }).ToList();
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = new Category { Name = dto.Name };
        await _repo.AddAsync(category);
        return new CategoryDto { Id = category.Id, Name = category.Name };
    }
}