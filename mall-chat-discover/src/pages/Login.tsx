import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ShoppingBag } from 'lucide-react';
import { login, saveAuthData } from '@/api/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const authData = await login(email, password);
      saveAuthData(authData);
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mall-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-mall-primary p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Sign In to MallChat</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-mall-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-mall-primary hover:bg-mall-dark"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-mall-primary font-medium hover:underline">
              Sign Up
            </Link>
          </div>
          
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
                <path d="M4.17 14.987l3.07-2.4c-.737-1.99.246-4.185 2.315-4.185 1.079 0 1.99.446 2.731 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-7.966 12.24l3.14-1.999z" fill="#34A853"/>
                <path d="M12 19.269c2.396 0 4.497-1.01 5.931-2.749l-2.747-2.132c-.891.818-2.135 1.329-3.634 1.329-2.542 0-4.74-1.898-5.318-4.478H2.781v2.143A8.912 8.912 0 0 0 12 19.27z" fill="#FBBC05"/>
                <path d="M6.232 11.238c-.387-1.159-.387-2.415 0-3.574V5.522H2.781a8.968 8.968 0 0 0 0 8.047l3.45-2.332z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6347 1C14.9147 1 13.2067 2.471 12.2077 4.484L12.1197 4.788L11.8597 4.592C10.6887 3.842 9.3947 3.459 8.0457 3.459C4.0067 3.459 0.7207 6.929 0.7207 11.186C0.7207 15.442 4.0067 18.912 8.0457 18.912C8.6987 18.912 9.3407 18.819 9.9557 18.64L10.2927 18.536L10.4107 18.576C10.9127 18.859 11.4497 19.001 11.9997 19.001C12.7337 19.001 13.4417 18.709 13.9957 18.17L14.1247 18.044L14.2517 18.171C14.8047 18.706 15.5097 19.001 16.2507 19.001C16.7987 19.001 17.3347 18.859 17.8357 18.576L18.0727 18.445L18.3107 18.64C18.9257 18.819 19.5677 18.912 20.2207 18.912C24.2607 18.912 27.5457 15.442 27.5457 11.186C27.5457 6.929 24.2607 3.459 20.2207 3.459C18.8717 3.459 17.5777 3.842 16.4067 4.592L16.1467 4.788L16.0587 4.484C15.0607 2.471 13.3527 1 11.6317 1H16.6347Z" fill="#4285F4"/>
              </svg>
              Facebook
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-mall-primary hover:underline">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-mall-primary hover:underline">Privacy Policy</Link>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
