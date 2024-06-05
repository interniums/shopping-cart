/* eslint-disable no-unused-vars */
import { cloneElement, useEffect, useState } from "react"
import HomePage from "./components/HomePage"
import MurlockFetch from "./utils/MurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"

function App() {
	const {data, loading, error} = MurlockFetch()
	const [random, setRandom] = useState(null)
	const [postLoading, setPostLoading] = useState(true)
	const [collections, setCollections] = useState(null)
	console.log(data)

	useEffect(() => {
		if (loading) {
			null
		} else if (error) {
			null
		} else if (data) {	
			setRandom(getRandomObjects(data))
			setCollections(getCollections(data))
			setPostLoading(false)
		} 
	}, [data, loading, error])

  return (
		<>
			{/* <HomePage postLoading={postLoading} random={random}/> */}
			<ShopPage data={data} collections={collections} postLoading={postLoading}/>
		</>
	)
}

export default App
