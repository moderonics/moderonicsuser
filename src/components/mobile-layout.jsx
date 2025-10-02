import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Home, Grid3X3, ShoppingCart, Heart, User, Search, Bell, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const brandGradient = "from-[rgb(250,80,15)] to-[rgb(255,175,0)]"

export default function MobileLayout({ children }) {
  const location = useLocation()
  const pathname = location.pathname
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlistItems.length

  const activeTab =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/categories")
        ? "category"
        : pathname.startsWith("/cart")
          ? "cart"
          : pathname.startsWith("/wishlist")
            ? "wishlist"
            : pathname.startsWith("/profile")
              ? "profile"
              : "home"

  const handleSearchToggle = () => {
    setIsSearchOpen((v) => !v)
    if (isSearchOpen) setSearchQuery("")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen relative">
      {/* Top Header (single) */}
      <header className="bg-white sticky top-0 z-40">
        <div className={`h-1 w-full bg-gradient-to-r ${brandGradient}`} />
        <div className="px-4 py-3 border-b border-gray-100 backdrop-blur-md bg-white/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Menu className="w-6 h-6 text-gray-700" />
              </Button>
              {!isSearchOpen && (
                <div className="flex items-center gap-2">
                  <img
                    src="/images/moderonics-logo.png"
                    alt="Moderonics"
                    className="h-7 w-auto object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search electronics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 pl-9 pr-3 py-2 rounded-2xl"
                      autoFocus
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={handleSearchToggle}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={handleSearchToggle}>
                    <Search className="w-5 h-5 text-gray-700" />
                  </Button>
                  <Button variant="ghost" size="icon" className="relative rounded-xl">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span
                      className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r ${brandGradient}`}
                    />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-2.5 z-50 shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around">
          <Link to="/">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 rounded-2xl ${
                activeTab === "home" ? "text-gray-900" : "text-gray-600"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  activeTab === "home" ? `bg-gradient-to-b ${brandGradient} text-white` : "bg-gray-100"
                }`}
              >
                <Home className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold mt-1">HOME</span>
            </Button>
          </Link>

          <Link to="/categories">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 rounded-2xl ${
                activeTab === "category" ? "text-gray-900" : "text-gray-600"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  activeTab === "category" ? `bg-gradient-to-b ${brandGradient} text-white` : "bg-gray-100"
                }`}
              >
                <Grid3X3 className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold mt-1">CATEGORY</span>
            </Button>
          </Link>

          <Link to="/cart">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 rounded-2xl ${
                activeTab === "cart" ? "text-gray-900" : "text-gray-600"
              } relative`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  activeTab === "cart" ? `bg-gradient-to-b ${brandGradient} text-white` : "bg-gray-100"
                }`}
              >
                <ShoppingCart className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold mt-1">CART</span>
              {totalCartItems > 0 && (
                <Badge
                  className={`absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-gradient-to-r ${brandGradient} text-white`}
                >
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </Link>

          <Link to="/wishlist">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 rounded-2xl ${
                activeTab === "wishlist" ? "text-gray-900" : "text-gray-600"
              } relative`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  activeTab === "wishlist" ? `bg-gradient-to-b ${brandGradient} text-white` : "bg-gray-100"
                }`}
              >
                <Heart className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold mt-1">WISHLIST</span>
              {totalWishlistItems > 0 && (
                <Badge
                  className={`absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-gradient-to-r ${brandGradient} text-white`}
                >
                  {totalWishlistItems}
                </Badge>
              )}
            </Button>
          </Link>

          <Link to="/profile">
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 rounded-2xl ${
                activeTab === "profile" ? "text-gray-900" : "text-gray-600"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  activeTab === "profile" ? `bg-gradient-to-b ${brandGradient} text-white` : "bg-gray-100"
                }`}
              >
                <User className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold mt-1">PROFILE</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
