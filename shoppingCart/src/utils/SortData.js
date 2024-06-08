/* eslint-disable no-unused-vars */

export default function sortData(data, rarity, collection, attack, favorites) {
	let returnValue = data

	returnValue = returnValue.filter(item => item.attack >= attack[0] && item.attack <= attack[1])

	if (!rarity.includes('All')) {
		returnValue = returnValue.filter(item => rarity.includes(item.rarity))
	}

	if (!collection.includes('All')) {
		returnValue = returnValue.filter(item => collection.includes(item.cardSet))
	}

	if (favorites) {
		returnValue = returnValue.filter(item => item.favorite)
	}

	return returnValue
}