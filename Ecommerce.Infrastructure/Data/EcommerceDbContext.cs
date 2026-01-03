using System;
using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Data;

public class EcommerceDbContext:DbContext
{
 public DbSet<Product> Products=>Set<Product>();
 public DbSet<Category> Categories=> Set<Category>();
 public DbSet <Order>Orders => Set<Order>();
 public DbSet<OrderItem> OrderItems=>Set<OrderItem>();


public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options):base(options){}
}
