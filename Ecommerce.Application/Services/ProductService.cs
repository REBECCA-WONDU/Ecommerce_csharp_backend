using System;
using ECommerce.Application.DTOS;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;

namespace ECommerce.Application.Services;

public class ProductService
{
 private readonly IProductRepository _repo;
 public ProductService(IProductRepository repo)
    {
        _repo=repo;
    }
    public async Task<List<ProductDto>> GetAllProductsAsync()
    {
        var products=await _repo.GetAllAsync();
        return products.Select(p=>new ProductDto
        {
            Id=p.Id,
            Name=p.Name,
            Price=p.Price,
            CategoryName=p.Category?.Name,
            ImageUrl=p.ImageUrl
        }).ToList();
    }
        public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var p = await _repo.GetByIdAsync(id);
        if (p == null) return null;
        return new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            CategoryName = p.Category?.Name,
            ImageUrl = p.ImageUrl
        };
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Price = dto.Price,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };
        await _repo.AddAsync(product);
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            ImageUrl = product.ImageUrl
        };
    }
}

