
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="bg-mall-light py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mall-dark mb-4">
            Discover Products<br />Through Conversation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Explore a smarter way to shop with our AI-powered conversation tool that helps you discover unique products tailored just for you.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-mall-primary hover:bg-mall-dark text-white px-8 py-6 text-lg"
          >
            Start Discovering
          </Button>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <div className="bg-mall-primary p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-xl font-semibold">MallChat Assistant</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-800">I'm looking for a gift for my mother's birthday.</p>
              </div>
              
              <div className="bg-mall-primary/10 rounded-lg p-3">
                <p className="text-gray-800">I'd be happy to help you find the perfect gift! What are some things your mother enjoys or what's her style preference?</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-800">She loves cooking and has been talking about getting into gardening.</p>
              </div>
              
              <div className="bg-mall-primary/10 rounded-lg p-3">
                <p className="text-gray-800">Great! I can recommend a few options:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>A premium herb garden starter kit</li>
                  <li>Ergonomic gardening tools with stylish designs</li>
                  <li>A high-quality chef's knife set</li>
                  <li>Gourmet cooking ingredients basket</li>
                </ul>
                <p className="mt-2 text-gray-800">Would you like more details about any of these options?</p>
              </div>
            </div>
            
            <div className="mt-6 flex">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mall-primary"
                placeholder="Type your message..."
                disabled
              />
              <Button disabled className="rounded-l-none bg-mall-primary hover:bg-mall-dark text-white">
                Send
              </Button>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-mall-secondary rounded-full -z-10"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-mall-accent rounded-full -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
