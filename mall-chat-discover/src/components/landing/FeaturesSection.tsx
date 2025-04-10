
import { MessageSquare, Search, ShoppingCart } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-mall-primary" />,
    title: "Conversational Discovery",
    description: "Discover products naturally through an AI conversation that understands your preferences and needs."
  },
  {
    icon: <Search className="h-10 w-10 text-mall-primary" />,
    title: "Smart Recommendations",
    description: "Get personalized product suggestions based on your conversation history and preferences."
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-mall-primary" />,
    title: "Shopping History",
    description: "Access your past conversations and recommendations to continue your shopping journey."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mall-dark mb-4">Discover a New Way to Shop</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our conversational shopping assistant makes finding products an enjoyable experience tailored to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-mall-light p-6 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-mall-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-mall-gradient rounded-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to transform your shopping experience?</h3>
              <p className="text-white/80">Join thousands of shoppers discovering products through conversation.</p>
            </div>
            <button className="mt-6 md:mt-0 bg-white text-mall-primary font-medium px-6 py-3 rounded-lg hover:bg-mall-secondary hover:text-mall-dark transition-colors">
              Get Started For Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
