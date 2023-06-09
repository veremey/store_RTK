import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartState {
	items: { [productID: string]: number }
}

const initialState: CartState = {
	items: {},
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
	},
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
