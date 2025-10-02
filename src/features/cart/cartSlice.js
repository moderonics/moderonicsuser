import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  total: 0,
  isOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    closeCart: (state) => {
      state.isOpen = false
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, toggleCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
