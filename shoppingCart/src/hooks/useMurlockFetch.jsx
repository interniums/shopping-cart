/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import getCollections from "../utils/getCollections"

export default function useMurlockFetch() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

	function filterUniqueNames(objectsArray) {
		const namesSet = new Set()
		return objectsArray.filter(obj => {
			if (!namesSet.has(obj.name)) {
				namesSet.add(obj.name)
				return true
			}
			return false
		})
	}

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
				const filteredFlavor = filteredRarity.filter( item => {
					return 'flavor' in item
				})
				let returnArray = filteredFlavor.filter( item => item.cardSet !== 'Mercenaries' && item.cardSet !== 'Battlegrounds' && item.name !== 'Murloc Scout')
				returnArray = returnArray.map(item => ({...item, favorite: false, cart: false}))
				returnArray = filterUniqueNames(returnArray)

        setData(returnArray)
        setError(null)
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