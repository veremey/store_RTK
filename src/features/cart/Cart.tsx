import React from 'react'
import styles from './Cart.module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getTotalPrice, removeFromCart, updateQuantity } from './cartSlice'
import classNames from 'classnames'
import { checkout } from '../../../lessons/18-thunks-basic/cartSlice'

export function Cart() {
	const dispatch = useAppDispatch()
	const products = useAppSelector((state) => state.products.products)
	const items = useAppSelector((state) => state.cart.items)
	const totalPrice = useAppSelector(getTotalPrice)
	const checkoutState = useAppSelector((state) => state.cart.checkoutState)

	const onQuantityChanged = (e: React.FocusEvent<HTMLInputElement>, id: string) => {
		const quantity = Number(e.target.value) || 0
		dispatch(updateQuantity({ id, quantity }))
	}

	const tableClasses = classNames({
		[styles.table]: true,
		[styles.checkoutError]: checkoutState === 'ERROR',
		[styles.checkoutLoading]: checkoutState === 'LOADING',
	})

	return (
		<main className='page'>
			<h1>Shopping Cart</h1>
			<table className={tableClasses}>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(items).map(([id, quantity]) => (
						<tr key={id}>
							<td>{products[id].name}</td>
							<td>
								<input
									type='text'
									className={styles.input}
									defaultValue={quantity}
									onBlur={(e) => onQuantityChanged(e, id)}
								/>
							</td>
							<td>${products[id].price}</td>
							<td>
								<button
									onClick={() => dispatch(removeFromCart(id))}
									aria-label={`Remove ${products[id].name} from Shopping Cart`}>
									X
								</button>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td>Total</td>
						<td></td>
						<td className={styles.total}>${totalPrice}</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<form>
				<button className={styles.button} type='submit'>
					Checkout
				</button>
			</form>
		</main>
	)
}
