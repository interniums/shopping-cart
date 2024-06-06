/* eslint-disable no-unused-vars */

export default function sortData(data, attack, collections, rarity) {
	const array = data
	
	const filteredArray = array.filter(item => collections.includes(item.cardSet) && 
		rarity.includes(item.rarity) && 
		item.attack >= attack[0] && 
		item.attack <= attack[1]
	)
	return filteredArray
}