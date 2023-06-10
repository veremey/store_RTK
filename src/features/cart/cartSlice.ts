import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
