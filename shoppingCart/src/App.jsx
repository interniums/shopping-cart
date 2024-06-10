/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useMemo, useState } from "react"
import HomePage from "./components/HomePage"
import useMurlockFetch from "./hooks/useMurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"
import sortData from "./utils/SortData"
import CartComponent from "./components/CartComponent"
import { Link, Outlet } from "react-router-dom"

function App() {
	const {data, loading, error} = useMurlockFetch()
	const [maindata, setMainData] = useState(null)
	const [sortRarity, setSortRarity] = useState(['All'])
	const [sortCollections, setSortCollections] = useState(['All'])
	const [sortAttack, setSortAttack] = useState([1, 13])
	const [sortFavorites, setSortFavorites] = useState(false)
	// console.log(sortFavorites)
	// console.log(sortRarity)
	// console.log(sortAttack)
	// console.log(sortCollections)
	// console.log(data)
	console.log(maindata)

	useEffect(() => {
		if (data) {
			setMainData(data)
		}
	}, [data])

	const random = useMemo(() => {
		if (!data) return []
		return getRandomObjects(data)
	}, [data])

	const collections = useMemo(() => {
		if (!maindata) return []
		return getCollections(maindata)
	}, [maindata])

	const sortedData = useMemo(() => {
		if (!data) return []
		return setMainData(sortData(data, sortRarity, sortCollections, sortAttack, sortFavorites))
	}, [data, sortRarity, sortCollections, sortAttack, sortFavorites])

  return (
		<>
			<Outlet context={[
				sortFavorites,
				setSortFavorites,
				setSortAttack,
				sortRarity,
				setSortRarity,
				sortCollections,
				setSortCollections,
				maindata,
				setMainData,
				collections,
				loading,
				random,
			]} />
			{/* <HomePage loading={loading} random={random}/> */}
			{/* <ShopPage 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				setSortAttack={setSortAttack}
				sortRarity={sortRarity}
				setSortRarity={setSortRarity}
				sortCollections={sortCollections}
				setSortCollections={setSortCollections}
				data={maindata} 
				setData={setMainData}
				collections={collections} 
				postLoading={loading}
			/> */}
			{/* <CartComponent 
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				data={maindata}
				setData={setMainData}
				loading={loading}
			/> */}
		</>
	)
}

export default App
