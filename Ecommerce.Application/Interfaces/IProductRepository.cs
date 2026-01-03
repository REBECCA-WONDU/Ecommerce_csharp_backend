using System;
using ECommerce.Domain.Entities;

namespace ECommerce.Application.Interfaces;

public interface IProductRepository
{
Task<List<Product>> GetAllAsync();
Task<Product?> GetByIdAsync(int id);
Task AddAsync(Product product);
}
