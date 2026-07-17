using System;

namespace SingletonPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            Logger logger1 = Logger.GetInstance();
            Logger logger2 = Logger.GetInstance();

            Console.WriteLine(Object.ReferenceEquals(logger1, logger2));

            logger1.Log("Singleton Pattern Working");
        }
    }
}
