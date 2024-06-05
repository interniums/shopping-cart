export default function getRandomObjects(arr) {
	if (!Array.isArray(arr) || arr.length === 0) {
		throw new Error('Input must be a non-empty array')
	}

	const shuffled = arr.slice()
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	const newArray = shuffled.slice(0, 5)
	return newArray
}