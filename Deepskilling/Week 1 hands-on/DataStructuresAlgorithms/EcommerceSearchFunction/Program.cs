using System;

class Program
{
    static int LinearSearch(Product[] products, string name)
    {
        for (int i = 0; i < products.Length; i++)
        {
            if (products[i].ProductName == name)
                return i;
        }
        return -1;
    }

    static int BinarySearch(Product[] products, string name)
    {
        int left = 0;
        int right = products.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            int compare =
                string.Compare(products[mid].ProductName, name);

            if (compare == 0)
                return mid;

            if (compare < 0)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }

    static void Main()
    {
        Product[] products =
        {
            new Product(1,"Apple"),
            new Product(2,"Banana"),
            new Product(3,"Laptop"),
            new Product(4,"Mobile")
        };

        Console.WriteLine(
            "Linear Search Index: " +
            LinearSearch(products,"Laptop"));

        Console.WriteLine(
            "Binary Search Index: " +
            BinarySearch(products,"Laptop"));
    }
}