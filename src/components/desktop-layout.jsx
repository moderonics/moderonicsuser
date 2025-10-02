"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleCart } from "../features/cart/cartSlice"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Bell,
} from "lucide-react"
import Cart from "./cart"
import { Link } from "react-router-dom"

export default function DesktopLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const dispatch = useDispatch()

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlistItems.length

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-orange-500">M</span>
                <span className="text-black">oderonics</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Home
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Categories
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Products
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Deals
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
              </Button>

              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {totalWishlistItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                      {totalWishlistItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button variant="ghost" size="icon" className="relative" onClick={() => dispatch(toggleCart())}>
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>

              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link to="/" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      Home
                    </Link>
                    <Link to="/categories" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      Categories
                    </Link>
                    <Link to="/products" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      Products
                    </Link>
                    <Link to="/deals" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      Deals
                    </Link>
                    <Link to="/about" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      About
                    </Link>
                    <Link to="/contact" className="text-lg font-medium hover:text-orange-500 transition-colors">
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="text-orange-500">M</span>
                <span className="text-white">oderonics</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for fashion and lifestyle products. Quality guaranteed, style delivered.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-gray-400 hover:text-white transition-colors">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/warranty" className="text-gray-400 hover:text-white transition-colors">
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-400">123 Fashion Street, Style City, SC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-400">support@moderonics.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Moderonics. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <Cart />
    </div>
  )
}
