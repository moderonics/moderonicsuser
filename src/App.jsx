import { Routes, Route } from "react-router-dom"
import ResponsiveLayout from "./components/responsive-layout"
import HomePage from "./components/home-page"

// Placeholder components for routes
function CategoriesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Categories</h1>
      <p className="mt-4 text-gray-600">Browse our product categories</p>
    </div>
  )
}

function ProductsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-4 text-gray-600">Explore all our products</p>
    </div>
  )
}

function DealsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Deals</h1>
      <p className="mt-4 text-gray-600">Check out our latest deals</p>
    </div>
  )
}

function CartPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-4 text-gray-600">Your cart items</p>
    </div>
  )
}

function WishlistPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <p className="mt-4 text-gray-600">Your saved items</p>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="mt-4 text-gray-600">Manage your account</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4 text-gray-600">Learn more about Moderonics</p>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-4 text-gray-600">Get in touch with us</p>
    </div>
  )
}

function App() {
  return (

    <ResponsiveLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/3d-lamps" element={<ProductsPage />} />
        <Route path="/laptop-stands" element={<ProductsPage />} />
        <Route path="/desk-mats" element={<ProductsPage />} />
        <Route path="/mouse-pads" element={<ProductsPage />} />
        <Route path="/gaming-mice" element={<ProductsPage />} />
      </Routes>
    </ResponsiveLayout>
   

  )
}

export default App
