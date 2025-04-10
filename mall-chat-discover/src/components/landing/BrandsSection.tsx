
import React from 'react';
import { ShoppingBag, ShoppingCart, Package, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

const BrandsSection = () => {
  // Define the brands to display
  const brands = [
    {
      name: 'Amazon',
      icon: <ShoppingCart className="h-8 w-8 md:h-10 md:w-10" />,
      className: 'text-[#FF9900]'
    },
    {
      name: 'Flipkart',
      icon: <ShoppingBag className="h-8 w-8 md:h-10 md:w-10" />,
      className: 'text-[#2874F0]'
    },
    {
      name: 'Myntra',
      icon: <Package className="h-8 w-8 md:h-10 md:w-10" />,
      className: 'text-[#FF3F6C]'
    },
    {
      name: 'Meesho',
      icon: <Store className="h-8 w-8 md:h-10 md:w-10" />,
      className: 'text-[#F43397]'
    }
  ];

  return (
    <section className="py-12 bg-mall-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-mall-dark mb-2">Shop Across Major Brands</h2>
          <p className="text-gray-600">Find the best products from all your favorite online stores in one place</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
            >
              <div className={cn("p-4 rounded-full bg-white shadow-md hover:shadow-lg transition-all", brand.className)}>
                {brand.icon}
              </div>
              <span className="mt-2 font-medium text-mall-dark">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
