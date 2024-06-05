/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import getCollections from "./getCollections"

export default function MurlockFetch() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
	// const [collections, setCollections] = useState()

  useEffect(() => {
    const fetchDataForPosts = async () => {
			const url = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/Murloc'
			const options = {
				method: 'GET',
				headers: {
					'x-rapidapi-key': '9a48b03b5dmsh0a443cec1ef8a08p1d0b4bjsn8eceb4824e1c',
					'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
				}
			}
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`)
        }
        let postsData = await response.json()
				const filteredImg = postsData.filter( item => {
					return 'img' in item
				})
				const filteredRarity = filteredImg.filter( item => {
					return 'rarity' in item
				})
				const filterCollection = filteredRarity.filter( item => item.cardSet !== 'Mercenaries' && item.cardSet !== 'Battlegrounds' && item.name !== 'Murloc Scout')
        setData(filterCollection)
        setError(null)
				// setCollections(getCollections(filteredRarity))
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDataForPosts()
  }, [])

  return {data, loading, error}
}