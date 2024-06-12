/* eslint-disable no-unused-vars */
import { createContext, useEffect, useMemo, useState } from "react"
import useMurlockFetch from "./hooks/useMurlockFetch"
import ShopPage from "./components/ShopPage"
import getRandomObjects from "./utils/getRandomObjects"
import getCollections from "./utils/getCollections"
import sortData from "./utils/SortData"
import CartComponent from "./components/CartComponent"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import NotFoundPage from "./components/NotFoundPage"
import ItemOverview from "./components/ItemOverview"
import HomePage from "./components/HomePage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: 'shop',
		element: <ShopPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: 'cart',
		element: <CartComponent />,
		errorElement: <NotFoundPage />,
	},
	{
		path: 'itemOverview/',
		element: <ItemOverview />
	}
])

export const DataContext = createContext(null)

function App() {
	const {data, loading, error} = useMurlockFetch()
	const [maindata, setMainData] = useState(null)
	const [sortRarity, setSortRarity] = useState(['All'])
	const [sortCollections, setSortCollections] = useState(['All'])
	const [sortAttack, setSortAttack] = useState([1, 13])
	const [sortFavorites, setSortFavorites] = useState(false)
	const [itemOverview, setItemOverview] = useState(null)

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
		return sortData(data, sortRarity, sortCollections, sortAttack, sortFavorites)
	}, [data, sortRarity, sortCollections, sortAttack, sortFavorites])

  return (
		<>
			<DataContext.Provider value={
				{random,
				itemOverview,
				setItemOverview,
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
				sortedData}
			}>
				<RouterProvider router={router} />
			</DataContext.Provider>
		</>
	)
}

export default App
