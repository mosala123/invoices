import { createSlice } from '@reduxjs/toolkit';

// دالة مساعدة للتحقق من وجود العنصر
const findItemIndex = (state, id) => state.findIndex(item => item.id === id);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    Addtocart: (state, action) => {
      // التحقق من عدم وجود العنصر مسبقاً
      const exists = state.some(item => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        console.log("✅ Item added to cart:", action.payload);
        console.log("📦 Cart after addition:", state);
      } else {
        console.log("⚠️ Item already exists in cart:", action.payload.id);
      }
    },
    Deletcart: (state, action) => {
      console.log("🗑️ Deleting item:", action.payload);
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => {
      console.log("🧹 Clearing cart");
      return [];
    },
    updateCartItem: (state, action) => {
      const index = findItemIndex(state, action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        console.log("✏️ Cart item updated:", action.payload);
      }
    }
  }
});

export const { Addtocart, Deletcart, clearCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;