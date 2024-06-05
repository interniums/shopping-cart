

export default function getColor(value) {
	if (value == 'Common') {
		return 'white'
	} else if (value == 'Rare') {
		return 'lightblue'
	} else if (value == 'Epic') {
		return 'violet'
	} else if (value == 'Legendary') {
		return 'gold'
	}
}