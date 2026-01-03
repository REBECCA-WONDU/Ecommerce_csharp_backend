using System;

namespace ECommerce.Domain.Entities;

public class OrderItem
{
public int Id{get; set;}
public int ProductId{get;set;}
public Product?Product{get; set;}
public int Quantity{get; set;}
public decimal TotalPrice=>Quantity*(Product?.Price??0);
}
