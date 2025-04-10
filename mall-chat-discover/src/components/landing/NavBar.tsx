
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-mall-primary" />
            <span className="ml-2 text-xl font-bold text-mall-dark">MallChat</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-mall-dark hover:text-mall-primary transition-colors">Home</Link>
            <Link to="#features" className="text-mall-dark hover:text-mall-primary transition-colors">Features</Link>
            <Link to="#testimonials" className="text-mall-dark hover:text-mall-primary transition-colors">Testimonials</Link>
            <Link to="/login">
              <Button variant="outline" className="border-mall-primary text-mall-primary hover:bg-mall-primary hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-mall-primary text-white hover:bg-mall-dark">
                Sign Up
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-mall-dark focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 space-y-4 md:hidden">
            <Link to="/" className="block text-mall-dark hover:text-mall-primary transition-colors">Home</Link>
            <Link to="#features" className="block text-mall-dark hover:text-mall-primary transition-colors">Features</Link>
            <Link to="#testimonials" className="block text-mall-dark hover:text-mall-primary transition-colors">Testimonials</Link>
            <div className="flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-mall-primary text-mall-primary hover:bg-mall-primary hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-mall-primary text-white hover:bg-mall-dark">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
