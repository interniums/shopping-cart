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
	const [sortRarity, setSortRarity] = useState([])
	const [sortCollections, setSortCollections] = useState([])
	const [sortAttack, setSortAttack] = useState([])
	// console.log(sortRarity)
	// console.log(sortAttack)
	console.log(sortCollections)
	// console.log(data)
	// console.log(postLoading)
	// console.log(maindata)

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
			// setMaindata(data)
			setMaindata(sortData(data, sortRarity, sortCollections, sortAttack))
			setPostLoading(false)
		}
	}, [data, sortRarity, sortAttack, sortCollections])

  return (
		<>
			{/* <HomePage postLoading={postLoading} random={random}/> */}
			<ShopPage 
				setSortAttack={setSortAttack}
				sortRarity={sortRarity}
				setSortRarity={setSortRarity}
				sortCollections={sortCollections}
				setSortCollections={setSortCollections}
				data={maindata} 
				collections={collections} 
				postLoading={postLoading}
			/>
		</>
	)
}

export default App
