/* eslint-disable no-unused-vars */

export default function sortData(data, rarity, collection, attack) {
	let returnValue = []
	// console.log(rarity)
	// console.log(collection)
	if (rarity.includes('All') && collection.includes('All')) {
		returnValue = data
	} else if (rarity.length > 0) {
		const filteredArray = data.filter(item =>
		rarity.includes(item.rarity) && 
		item.attack >= attack[0] && 
		item.attack <= attack[1]
	)
		returnValue = filteredArray
	} else if (collection.length > 0) {
		returnValue = returnValue.filter(item => collection.includes(item.cardSet))
	}
	return returnValue
}