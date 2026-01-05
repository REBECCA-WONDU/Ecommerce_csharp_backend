using System;

namespace ECommerce.Application.DTOS;

public class CreateProductDto
{
 public string Name{get; set;}=default!;
 public decimal Price{get; set;}
 public int CategoryId{get; set;}
 public string? ImageUrl{get; set;}
}
