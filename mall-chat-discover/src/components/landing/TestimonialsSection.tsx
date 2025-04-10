
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "MallChat helped me find the perfect outfit for a special occasion when I wasn't even sure what I was looking for. The conversational approach feels so much more natural than browsing endless pages of products."
  },
  {
    name: "Michael Thomas",
    role: "Tech Shopper",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "I was overwhelmed by all the tech options until I used MallChat. The assistant asked me the right questions and helped me find electronics that perfectly matched my needs and budget."
  },
  {
    name: "Emma Rodriguez",
    role: "Gift Buyer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Finding gifts used to be stressful until I discovered MallChat. Now I can describe the person I'm buying for and get thoughtful suggestions that I wouldn't have found on my own."
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-mall-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mall-dark mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of shoppers are discovering a better way to find products with MallChat.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-mall-primary"
                />
              </div>
              <div>
                <p className="text-gray-700 italic mb-6">"{testimonials[currentIndex].content}"</p>
                <div>
                  <h4 className="font-bold text-mall-dark">{testimonials[currentIndex].name}</h4>
                  <p className="text-mall-primary">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <Button 
                onClick={prevTestimonial} 
                variant="outline" 
                size="sm"
                className="border-mall-primary text-mall-primary hover:bg-mall-primary hover:text-white"
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                onClick={nextTestimonial} 
                variant="outline" 
                size="sm"
                className="border-mall-primary text-mall-primary hover:bg-mall-primary hover:text-white"
              >
                Next
                <ArrowDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
