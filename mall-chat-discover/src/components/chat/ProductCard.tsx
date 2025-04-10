
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="h-32 bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=Product";
          }}
        />
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
        <p className="text-mall-primary font-bold text-sm mt-1">{product.price}</p>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        
        <button className="mt-2 w-full bg-mall-primary/10 text-mall-primary text-xs py-1 rounded hover:bg-mall-primary/20 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
