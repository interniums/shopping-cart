/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useState } from "react"
import HomePage from "./components/HomePage"
import MurlockFetch from "./utils/MurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"
import sortData from "./utils/SortData"

function App() {
	const {data, loading, error} = MurlockFetch()
	const [random, setRandom] = useState(null)
	const [postLoading, setPostLoading] = useState(true)
	const [collections, setCollections] = useState(null)
	const [maindata, setMaindata] = useState()
	const [sortAttack, setSortAttack] = useState([0, 13])
	const [sortCollections, setSortCollections] = useState(['The League of Explorers', 'Murder at Castle Nathria', 'Festival of Legends', 'Knights of the Frozen Throne', 'Mean Streets of Gadgetzan', 'Legacy', 'Vanilla', 'Ashes of Outland', 'United in Stormwind', "Whizbang's Workshop", 'Core', 'Classic', 'Saviors of Uldum', 'Voyage to the Sunken City', 'Rise of Shadows', 'Forged in the Barrens', 'Whispers of the Old Gods', 'Showdown in the Badlands', 'Madness At The Darkmoon Faire', 'The Witchwood', "Journey to Un'Goro", 'Goblins vs Gnomes', 'Descent of Dragons', 'Scholomance Academy', 'The Grand Tournament', "Rastakhan's Rumble"])
	const [sortRarity, setSortRarity] = useState(['Free', 'Common', 'Epic', 'Legendary'])
	console.log(data)
	console.log(maindata)
	// console.log(collections)

	useEffect(() => {
		if (loading) {
			null
		} else if (error) {
			null
		} else if (data) {
			setRandom(getRandomObjects(data))
			setCollections(getCollections(data))
		} 
	}, [data, loading, error])

	useEffect(() => {
		if (data) {
			setMaindata(sortData(data, sortAttack, sortCollections, sortRarity))
			setPostLoading(false)
		}
	}, [data, sortAttack, sortCollections, sortRarity])

  return (
		<>
			{/* <HomePage postLoading={postLoading} random={random}/> */}
			<ShopPage 
				setSortRarity={setSortRarity} 
				setSortCollections={setSortCollections} 
				setSortAttack={setSortAttack}
				data={maindata} 
				collections={collections} 
				postLoading={postLoading}
			/>
		</>
	)
}

export default App
