import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./components/ProductDetails";
import { UserDetails } from "./components/UserDetails";
import { User } from "./components/User";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Cart from "./components/Cart";
import useAuthStore from "./store/useAuthStore"; 
import DashhBoard from "./components/DashhBoard"; 
import PostDetails from "./components/PostDetails";
import PostDisplay from "./components/PostDisplay";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import ProductForm from "./components/ProductForm";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function ProtectedRoute({ element }) {
  const { user } = useAuthStore();
  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProviderWrapper>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <UserProvider>
          <Router>
            <Navbar />
            <Toaster position="top-right" /> 
            <div className="flex">
              <Sidebar />
              <div className="container mx-auto p-4 ml-12">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute element={<DashhBoard />} />} />
                  <Route path="/products" element={<ProtectedRoute element={<AllProducts />} />} />
                  <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetails />} />} />
                  <Route path="/add-product" element={<ProtectedRoute element={<ProductForm />} />} />
                  <Route path="/edit-product/:id" element={<ProtectedRoute element={<ProductForm />} />} />
                  <Route path="/users" element={<ProtectedRoute element={<User />} />} />
                  <Route path="/user/:id" element={<ProtectedRoute element={<UserDetails />} />} />
                  <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                  <Route path="/posts" element={<ProtectedRoute element={<PostDisplay />} />} />
                  <Route path="/posts/:id" element={<ProtectedRoute element={<PostDetails />} />} />

                  <Route path="*" element={<h1 className="text-red-500 text-center">404 - Page Not Found</h1>} />
                </Routes>
              </div>
            </div>
          </Router>
        </UserProvider>
      </ProductProvider>
    </QueryClientProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
