
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import {
  BatteryCharging,
  Box,
  CheckCircle2,
  Headphones,
  Heart,
  Laptop,
  RefreshCw,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Watch,
  Gamepad2,
  Tablet,
  Wifi,
  Monitor,
  Truck,
  Mouse,
  Home,
} from "lucide-react"
import { Link } from "react-router-dom"
import HeroCarousel from "./hero-carousel"

const brandGradient = "from-[rgb(250,80,15)] to-[rgb(255,175,0)]"

const categories = [
  { name: "Smartphones", icon: Smartphone, items: 245, image: "/images/category-smartphones.jpg" },
  { name: "Laptops", icon: Laptop, items: 156, image: "/images/category-laptops.jpg" },
  { name: "Audio", icon: Headphones, items: 189, image: "/images/category-audio.jpg" },
  { name: "Wearables", icon: Watch, items: 98, image: "/images/category-wearables.jpg" },
  { name: "Gaming", icon: Gamepad2, items: 87, image: "/images/category-gaming.jpg" },
  { name: "Tablets", icon: Tablet, items: 156, image: "/images/category-tablets.jpg" },
  { name: "Smart Home", icon: Home, items: 203, image: "/images/category-smart-home.jpg" },
  { name: "Accessories", icon: Headphones, items: 312, image: "/images/category-accessories.jpg" },
  { name: "Office Desk", icon: Monitor, items: 145, image: "/images/category-office-desk.jpg" },
  { name: "Mice", icon: Mouse, items: 89, image: "/images/category-mice.jpg" },
  { name: "Mouse Pads", icon: Monitor, items: 67, image: "/images/category-mouse-pads.jpg" },
  { name: "3D Lamps", icon: Wifi, items: 54, image: "/images/category-3d-lamps.jpg" },
]

const dealsProducts = [
  {
    id: 1,
    name: "MagSafe Wireless Charger 15W",
    brand: "Apple",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.7,
    reviews: 2847,
    image: "/images/deal-wireless-charger.jpg",
    badge: "Save More",
    colors: ["#1f2937", "#6366f1", "#f59e0b"],
    category: "Accessories",
    inStock: true,
  },
  {
    id: 2,
    name: "Noise-Canceling Earbuds Pro",
    brand: "Sony",
    price: 2899,
    originalPrice: 3999,
    discount: 28,
    rating: 4.6,
    reviews: 1456,
    image: "/images/deal-earbuds.jpg",
    badge: "Save More",
    colors: ["#000000", "#ffffff"],
    category: "Audio",
    inStock: true,
  },
  {
    id: 3,
    name: "65W GaN Fast Charger",
    brand: "Anker",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.8,
    reviews: 3241,
    image: "/images/deal-gan-charger.jpg",
    badge: "Save More",
    colors: ["#3b82f6", "#ffffff"],
    category: "Accessories",
    inStock: true,
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    brand: "Keychron",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.9,
    reviews: 1876,
    image: "/images/deal-mechanical-keyboard.jpg",
    badge: "Save More",
    colors: ["#000000"],
    category: "Gaming",
    inStock: true,
  },
  {
    id: 5,
    name: "USB-C Hub 7-in-1",
    brand: "Anker",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.5,
    reviews: 987,
    image: "/images/deal-usb-hub.jpg",
    badge: "Save More",
    colors: ["#9ca3af"],
    category: "Accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "MacBook Pro 14-inch M3",
    brand: "Apple",
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.9,
    reviews: 4521,
    image: "/images/deal-laptop.jpg",
    badge: "Save More",
    colors: ["#9ca3af", "#1f2937"],
    category: "Laptops",
    inStock: true,
  },
]

const lampProducts = [
  {
    id: 7001,
    name: "3D Moon Night Lamp",
    brand: "Moderonics",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    rating: 4.7,
    reviews: 564,
    image: "/images/3d-lamp-moon.jpg",
    badge: "PREMIUM",
    colors: ["#ffffff", "#fef3c7"],
    category: "3D Lamps",
    inStock: true,
  },
  {
    id: 7002,
    name: "Custom Photo Night Lamp",
    brand: "Moderonics",
    price: 1799,
    originalPrice: 2599,
    discount: 31,
    rating: 4.6,
    reviews: 312,
    image: "/images/3d-lamp-custom-photo.jpg",
    badge: "CUSTOM",
    colors: ["#ffffff"],
    category: "3D Lamps",
    inStock: true,
  },
  {
    id: 7003,
    name: "Astronaut 3D Lamp",
    brand: "Moderonics",
    price: 1699,
    originalPrice: 2399,
    discount: 29,
    rating: 4.8,
    reviews: 201,
    image: "/images/3d-lamp-astronaut.jpg",
    badge: "TRENDING",
    colors: ["#ffffff", "#dbeafe"],
    category: "3D Lamps",
    inStock: true,
  },
  {
    id: 7004,
    name: "Nameplate 3D Night Lamp",
    brand: "Moderonics",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.5,
    reviews: 149,
    image: "/images/3d-lamp-nameplate.jpg",
    badge: "GIFT",
    colors: ["#ffffff", "#fffbeb"],
    category: "3D Lamps",
    inStock: true,
  },
]

export default function HomePage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((s) => s.cart.items)
  const wishlistItems = useSelector((s) => s.wishlist.items)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const totalWishlistItems = wishlistItems.length

  const showToast = (message, type = "success") => {
    console.log(`[${type.toUpperCase()}] ${message}`)
  }

  const handleAddToCart = (p) => {
    if (!p.inStock) {
      showToast("Product out of stock!", "error")
      return
    }
    dispatch(addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 }))
    showToast(`Added to cart! ${p.name} has been added to your cart`)
  }

  const handleWishlistToggle = (p) => {
    const inWish = wishlistItems.some((w) => w.id === p.id)
    if (inWish) {
      dispatch(removeFromWishlist(p.id))
      showToast("Removed from wishlist")
    } else {
      dispatch(
        addToWishlist({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          brand: p.brand,
          originalPrice: p.originalPrice,
          discount: p.discount,
          rating: p.rating,
          reviews: p.reviews,
        }),
      )
      showToast("Saved to wishlist")
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-44 md:h-80 bg-gray-200 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 bg-white rounded-2xl border animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Premium Hero */}
      <div className="px-4 pt-3">
        <HeroCarousel />
      </div>

      {/* Feature strip */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Truck, label: "Fast Delivery" },
            { icon: ShieldCheck, label: "2Y Warranty" },
            { icon: RefreshCw, label: "Easy Returns" },
            { icon: BatteryCharging, label: "Long Battery" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-2xl border bg-white px-3 py-3 shadow-sm hover:shadow transition"
            >
              <div
                className={`h-9 w-9 rounded-xl bg-gradient-to-b ${brandGradient} flex items-center justify-center text-white`}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-gray-800">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shop by Category */}
      <section className="px-4 mt-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Shop by Category</h3>
          <p className="text-gray-500 text-sm mt-1">Explore our best in class gadgets and accessories</p>
          <div className="h-1 w-24 bg-gradient-to-r from-[rgb(250,80,15)] to-[rgb(255,175,0)] mt-2 rounded-full" />
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <Link key={c.name} to={`/categories/${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
              <Card className="overflow-hidden border-2 hover:border-orange-500 transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={c.image || "/placeholder.svg?height=128&width=200"}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 text-center">
                    <h4 className="font-bold text-gray-900 text-sm">{c.name}</h4>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[rgb(250,80,15)] to-[rgb(255,175,0)] mx-auto mt-1.5 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals strip */}
      <section className="px-4 mt-10">
        <div className="rounded-2xl p-4 border bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <Rocket className={`w-5 h-5 text-[rgb(250,80,15)]`} />
            <p className="text-sm text-gray-800">Fresh drops this week. Enjoy launch pricing and premium support.</p>
          </div>
        </div>
      </section>

      {/* Deals of the Day - responsive grid 1/2/3 */}
      <section className="px-4 mt-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Deals of the Day</h3>
          <p className="text-gray-500 text-sm mt-1">Limited-time offers. Don't miss out!</p>
          <div className="h-1 w-24 bg-gradient-to-r from-[rgb(250,80,15)] to-[rgb(255,175,0)] mt-2 rounded-full" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealsProducts.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden border-2 hover:border-orange-500 hover:shadow-xl transition-all"
            >
              <CardContent className="p-0">
                <div className="relative h-64 bg-gray-50 overflow-hidden">
                  <img
                    src={p.image || "/placeholder.svg?height=256&width=400"}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/electronics-product-photo.jpg"
                    }}
                  />
                  {p.badge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[rgb(250,80,15)] to-[rgb(255,175,0)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {p.badge}
                    </div>
                  )}
                  <button
                    onClick={() => handleWishlistToggle(p)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlistItems.some((w) => w.id === p.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{p.name}</h4>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 24 24"
                          className={`w-4 h-4 ${i < Math.floor(p.rating) ? "fill-amber-400" : "fill-gray-200"}`}
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.21l8.2-1.192L12 .587z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{p.rating} / 5</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">₹{p.price.toLocaleString()}</span>
                    <span className="text-base text-gray-400 line-through">₹{p.originalPrice.toLocaleString()}</span>
                  </div>

                  <Button
                    disabled={!p.inStock}
                    onClick={() => handleAddToCart(p)}
                    className={`w-full rounded-xl font-bold py-6 text-base ${
                      p.inStock
                        ? `bg-gradient-to-r ${brandGradient} text-white hover:brightness-95`
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {p.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3D Printed Night Lamps - premium section */}
      <section className="px-4 mt-12">
        <div className="relative overflow-hidden rounded-3xl border bg-black">
          <img
            src="/images/3d-lamp-hero.jpg"
            alt="3D Printed Night Lamps premium banner"
            className="w-full h-56 md:h-72 object-cover opacity-70"
            onError={(e) => {
              e.currentTarget.src = "/3d-printed-night-lamps-banner.jpg"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 p-6 md:p-10 flex items-center">
            <div>
              <p className="text-white/80 text-xs tracking-widest uppercase">New Collection</p>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-1">Premium 3D Printed Night Lamps</h3>
              <p className="text-white/90 mt-2 md:mt-3">
                Custom names, photos, and shapes. Perfect gifts that glow with personality.
              </p>
              <Link to="/3d-lamps">
                <Button
                  className={`mt-4 bg-gradient-to-r ${brandGradient} text-white rounded-full px-6 py-6 font-bold`}
                >
                  Explore 3D Lamps
                </Button>
              </Link>
            </div>
          </div>
          <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${brandGradient}`} />
        </div>

        {/* Lamp products grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lampProducts.map((p) => (
            <Card key={p.id} className="overflow-hidden border hover:shadow-md transition">
              <CardContent className="p-0">
                <div className="relative h-56 rounded-t-xl overflow-hidden bg-gray-50">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/3d-printed-night-lamp.jpg"
                    }}
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[rgb(250,80,15)] to-[rgb(255,175,0)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{p.name}</h4>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-extrabold text-gray-900">₹{p.price.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(p)}
                    className={`w-full bg-gradient-to-r ${brandGradient} text-white rounded-xl font-bold py-5`}
                  >
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Assurance strip */}
      <section className="px-4 mt-12 mb-24">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle2, title: "Genuine Products", desc: "Brand-authorized stock" },
              { icon: Box, title: "Secure Packaging", desc: "Damage-free delivery" },
              { icon: ShieldCheck, title: "Safe Payments", desc: "100% protection" },
              { icon: Rocket, title: "Priority Support", desc: "We got your back" },
            ].map((it) => (
              <div key={it.title} className="flex items-start gap-3">
                <div
                  className={`h-9 w-9 rounded-lg bg-gradient-to-b ${brandGradient} text-white flex items-center justify-center`}
                >
                  <it.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{it.title}</p>
                  <p className="text-xs text-gray-500">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating counters */}
        <div className="fixed right-4 bottom-24 z-40 space-y-3">
          <Link to="/wishlist">
            <div className="flex items-center gap-2 rounded-full bg-white border shadow px-3 py-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold">{totalWishlistItems}</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="flex items-center gap-2 rounded-full bg-white border shadow px-3 py-2">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold">{totalCartItems}</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
