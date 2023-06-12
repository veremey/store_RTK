import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../../app/store'

type CheckoutState = 'LOADING' | 'READY' | 'ERROR'

export interface CartState {
	items: { [productID: string]: number }
	checkoutState: CheckoutState
}

const initialState: CartState = {
	items: {},
	checkoutState: 'READY',
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<string>) {
			const id = action.payload
			if (state.items[id]) {
				state.items[id]++
			} else {
				state.items[id] = 1
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			delete state.items[action.payload]
		},
		updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
			const { id, quantity } = action.payload
			state.items[id] = quantity
		},
		extraReducers: function (builder) {
			builder.addCase('cart/checkout/pending', (state, action) => {
				state.checkoutState = 'LOADING'
			})
			builder.addCase('cart/checkout/fulfilled', (state, action) => {
				state.checkoutState = 'READY'
			})
		},
	},
})

export function checkout() {
	return function checkoutThunk(dispatch: AppDispatch) {
		dispatch({ type: 'cart/checkout/pending' })
		setTimeout(function () {
			dispatch({ type: 'cart/checkout/fulfilled' })
		}, 500)
	}
}

export const getNumItems = createSelector(
	(state: RootState) => state.cart.items,
	(items) => {
		let numItems = 0

		for (const id in items) {
			numItems = items[id]
		}
		return numItems
	}
)

export const getTotalPrice = createSelector(
	(state: RootState) => state.cart.items,
	(state: RootState) => state.products.products,
	(items, products) => {
		let total = 0
		for (const id in items) {
			total += products[id].price * items[id]
		}
		return total.toFixed(2)
	}
)

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
