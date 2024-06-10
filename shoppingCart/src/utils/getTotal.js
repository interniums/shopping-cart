/* eslint-disable no-unused-vars */

export default function getTotal(data) {
	const itemsWithPrices = data.map(item => ({
		...item,
		price: item.cost * 8.5 + 3
	}))
	const itemsInCart = itemsWithPrices.filter(item => item.cart)
	const totalCost = itemsInCart.reduce((acc, item) => acc + item.price, 0)
  return totalCost
}