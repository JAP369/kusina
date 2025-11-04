'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  // The most recently added item (for popover/notification)
  lastAddedItem: Omit<CartItem, 'quantity'> | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_LAST_ADDED' };

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('HK$', ''));
    return total + price * item.quantity;
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: calculateTotalPrice(updatedItems),
          lastAddedItem: action.payload
        };
      }

      const newItem = { ...action.payload, quantity: 1 };
      const updatedItems = [...state.items, newItem];

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + 1,
        totalPrice: calculateTotalPrice(updatedItems),
        lastAddedItem: action.payload
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: calculateTotalPrice(updatedItems)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        lastAddedItem: null
      };

    case 'CLEAR_LAST_ADDED':
      return {
        ...state,
        lastAddedItem: null
      };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  lastAddedItem: null
};

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  lastAddedItem: CartState['lastAddedItem'];
  clearLastAddedItem: () => void;
} | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const clearLastAddedItem = () => {
    dispatch({ type: 'CLEAR_LAST_ADDED' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, lastAddedItem: state.lastAddedItem, clearLastAddedItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}