using RetailInventory.Data;

using var context = new AppDbContext();

var products = context.Products
                      .Where(p => p.Price > 5000)
                      .OrderBy(p => p.Name)
                      .ToList();

foreach (var product in products)
{
    Console.WriteLine(
        $"ID: {product.Id}, Name: {product.Name}, Price: {product.Price}");
}