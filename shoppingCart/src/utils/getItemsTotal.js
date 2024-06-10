/* eslint-disable no-unused-vars */

export default function getItemsTotal(data) {
	return data?.filter(item => item.cart == true).length
}