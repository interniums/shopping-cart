/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useMemo, useState } from "react"
import HomePage from "./components/HomePage"
import useMurlockFetch from "./hooks/useMurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"
import sortData from "./utils/SortData"
import CartComponent from "./components/CartComponent"

function App() {
	const {data, loading, error} = useMurlockFetch()
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
	// console.log(maindata)

	const random = useMemo(() => {
		if (!data) return []
		return getRandomObjects(data)
	}, [data])

	const collections = useMemo(() => {
		if (!data) return []
		return getCollections(data)
	}, [data])

	const sortedData = useMemo(() => {
		if (!data) return []
		return sortData(data, sortRarity, sortCollections, sortAttack, sortFavorites)
	}, [data, sortRarity, sortCollections, sortAttack, sortFavorites])

  return (
		<>
			{/* <HomePage postLoading={loading} random={random}/> */}
			{/* <ShopPage 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				setSortAttack={setSortAttack}
				sortRarity={sortRarity}
				setSortRarity={setSortRarity}
				sortCollections={sortCollections}
				setSortCollections={setSortCollections}
				data={sortedData} 
				collections={collections} 
				postLoading={loading}
			/> */}
			<CartComponent 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				data={data}
				postLoading={loading}
			/>
		</>
	)
}

export default App
