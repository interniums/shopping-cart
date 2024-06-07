/* eslint-disable no-unused-vars */

export default function sortData(data, rarity, collection, attack, favorites) {
	let returnValue = data
	// console.log(rarity)
	// console.log(collection)
	// console.log(attack)
	if (rarity.includes('All') && collection.includes('All') && favorites == false) {
		returnValue = data
		returnValue = returnValue.filter(item => item.attack >= attack[0] && item.attack <= attack[1])
	} else if (!rarity.includes('All')) {
		returnValue = data.filter(item => rarity.includes(item.rarity))
		if (!collection.includes('All')) {returnValue = returnValue.filter(item => collection.includes(item.cardSet))}
		returnValue = returnValue.filter(item => item.attack >= attack[0] && item.attack <= attack[1])
		if (favorites == true) {returnValue = returnValue.filter(item => item.favorite !== false)}
	} else if (!collection.includes('All')) {
		returnValue = returnValue.filter(item => collection.includes(item.cardSet))
		if (!rarity.includes('All')) {returnValue = returnValue.filter(item => rarity.includes(item.rarity))}
		returnValue = returnValue.filter(item => item.attack >= attack[0] && item.attack <= attack[1])
		if (favorites == true) {returnValue = returnValue.filter(item => item.favorite !== false)}
	} else if (favorites) {
		if (favorites == true) {returnValue = returnValue.filter(item => item.favorite !== false)}
	}
	return returnValue
}