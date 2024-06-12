/* eslint-disable no-unused-vars */


export default function searchFunction (data, value) {
	if (value == '') return null
	const lowerValue = value?.toLowerCase()
	return data.filter(item => item.name.toLowerCase().includes(lowerValue) || item.cardSet.toLowerCase().includes(lowerValue) || item.rarity.toLowerCase().includes(lowerValue))
}