

export default function getCollections(objectsArray) {
	// Initialize an empty array to store unique cardSet values
	const uniqueCardSets = [];
	
	// Iterate over each object in the input array
	objectsArray.forEach(obj => {
		// Check if the cardSet value is not already in the uniqueCardSets array
		if (!uniqueCardSets.includes(obj.cardSet)) {
			// If not, push the cardSet value into the uniqueCardSets array
			uniqueCardSets.push(obj.cardSet);
		}
	});
	
	// Return the array of unique cardSet values
	return uniqueCardSets
}