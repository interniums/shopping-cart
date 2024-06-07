/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useState } from "react"
import HomePage from "./components/HomePage"
import MurlockFetch from "./utils/MurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"
import sortData from "./utils/SortData"
import CartComponent from "./components/CartComponent"

function App() {
	const {data, loading, error} = MurlockFetch()
	const [random, setRandom] = useState(null)
	const [postLoading, setPostLoading] = useState(true)
	const [collections, setCollections] = useState(null)
	const [maindata, setMaindata] = useState()
	const [sortRarity, setSortRarity] = useState(['All'])
	const [sortCollections, setSortCollections] = useState(['All'])
	const [sortAttack, setSortAttack] = useState([1, 13])
	const [sortFavorites, setSortFavorites] = useState(false)
	// console.log(sortFavorites)
	// console.log(sortRarity)
	// console.log(sortAttack)
	// console.log(sortCollections)
	// console.log(data)
	// console.log(postLoading)
	console.log(maindata)

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
			setMaindata(data.map(item => {item.favorite = false, item.cart = true}))
			setMaindata(sortData(data, sortRarity, sortCollections, sortAttack, sortFavorites))
			setPostLoading(false)
		}
	}, [data, sortRarity, sortAttack, sortCollections, sortFavorites])

  return (
		<>
			{/* <HomePage postLoading={postLoading} random={random}/> */}
			{/* <ShopPage 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				setSortAttack={setSortAttack}
				sortRarity={sortRarity}
				setSortRarity={setSortRarity}
				sortCollections={sortCollections}
				setSortCollections={setSortCollections}
				data={maindata} 
				collections={collections} 
				postLoading={postLoading}
			/> */}
			<CartComponent 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				maindata={maindata}
				postLoading={postLoading}
			/>
		</>
	)
}

export default App
