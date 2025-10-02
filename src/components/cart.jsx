"use client"

import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateQuantity, closeCart } from "../features/cart/cartSlice"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export default function Cart() {
  const { items, total, isOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
      toast.success("Item removed from your cart")
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id))
    toast.success(`${name} has been removed from your cart`)
  }

  const handleCheckout = () => {
    toast.success("Redirecting to checkout page...")
    dispatch(closeCart())
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
      <SheetContent className="w-full sm:max-w-lg rounded-t-3xl flex flex-col h-full">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center justify-between text-lg font-bold">
            Shopping Cart
            <Badge variant="secondary" className="bg-red-100 text-red-600">
              {items.length} items
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button
                  onClick={() => dispatch(closeCart())}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4">
                    <Link to={`/products/${item.id}`} className="w-16 h-16 bg-white rounded-xl overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/products/${item.id}`}>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 hover:text-red-500 transition-colors">
                          {item.name}
                        </h4>
                      </Link>
                      <p className="text-lg font-bold text-red-500">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full border-gray-300 bg-transparent"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full border-gray-300 bg-transparent"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-6 space-y-4 bg-white mt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-red-500">${total.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 rounded-xl py-3 bg-transparent"
                  onClick={() => dispatch(closeCart())}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
