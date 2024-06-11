/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/ShopPage.module.css'
import MainHeader from './MainHeader.jsx'
import ShopNav from './ShopNav.jsx'
import gif from '../assets/giphy.gif'
import common from '../assets/common.webp'
import epic from '../assets/epic.webp'
import legendary from '../assets/legendary.webp'
import rare from '../assets/rare.webp'
import getColor from '../utils/getColor.js'
import Tilt from 'react-parallax-tilt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ItemOverview from './ItemOverview.jsx'
import { useContext, useState } from 'react'
import { DataContext } from '../App.jsx'
import Favorites from './Favorites.jsx'

export default function ShopPage() {
	const {
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
		sortedData
	} = useContext(DataContext)
	const [showItem, setShowItem] = useState(false)
	const [childProps, setChildProps] = useState({
		name: null,
		img: null, 
		flavor: null, 
		collection: null,
		cost: null, 
		cart: null,
		favorite: null
	})

	const handleCard = (name) => {
		const object = maindata?.find(item => item.name === name)
		setChildProps({name: object.name, img: object.img, flavor: object.flavor, collection: object.cardSet, cost: object.cost, cart: object.cart,favorite: object.favorite})
		setShowItem(true)
	}

	const handleCart = (name) => {
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, cart: obj.cart ? false : true }
				}
				return obj
			})
		})
	}

	const handleFavorite = (name) => {
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, favorite: obj.favorite ? false : true }
				}
				return obj
			})
		})
	}

	const chooseColor = (name) => {
		const object = maindata?.find(item => item.name === name)
		if (object?.favorite == true) return 'red'
		if (object?.favorite == true) return 'rgb(225, 225, 225)'
	}

	const chooseColorCart = (name) => {
		const object = maindata?.find(item => item.name === name)
		if (object?.cart == true) return 'green'
		if (object?.cart == true) return 'rgb(225, 225, 225)'
	}
	
	return(
		<>
		{
			showItem ? 
				<ItemOverview 
					sortFavorites={sortFavorites}
					setSortFavorites={setSortFavorites}	
					setData={setMainData}
					childProps={childProps}
					maindata={maindata}
				/> : 
				<>
					<MainHeader 
						sortFavorites={sortFavorites}
						setSortFavorites={setSortFavorites}
						setSortAttack={setSortAttack}
						sortRarity={sortRarity}
						setSortRarity={setSortRarity}
						sortCollections={sortCollections}
						setSortCollections={setSortCollections}
						maindata={maindata}
						loading={loading}
					/>
					<div
						style={{
							justifyContent: loading ? 'center' : 'start',
							alignItems: loading ? 'center' : 'start',
							marginTop: loading ? '10%' : '0%'
						}}
						className={styles.container}
					>
						{
							loading ?
							<div>
								<img className={styles.gif} src={gif} alt="" />
								<div style={{fontSize: '40px'}} className={styles.loading}>LOADING...</div>
							</div> : 
							<>
								<ShopNav 
									collections={collections}
									sortRarity={sortRarity}
									sortCollections={sortCollections}
									setSortCollections={setSortCollections}
									setSortRarity={setSortRarity}
									setSortAttack={setSortAttack}
								/>
								<main className={styles.main}>
									<h3 style={{ marginLeft: '60px'}}>{sortFavorites ? 'Favorites' : 'Cards'}({!sortFavorites ? sortedData?.length : maindata.filter(item => item.favorite).length})</h3>
									<div className={styles.itemsContainer}>
										{
											sortFavorites ? 
												<Favorites 
													maindata={maindata}
													loading={loading}
													setMainData={setMainData}
												/> :
												sortedData?.map(item => (
													<div style={{position: 'relative'}} key={item.cardId}>
														<Tilt
															tiltReverse={true}
															tiltMaxAngleX={0}
															tiltMaxAngleY={7}
															glareEnable={true}
															glareMaxOpacity={0.5}
															glareColor='#fffff'
															glarePosition='all'
															perspective={1000}
														>
															<div onClick={() => {handleCard(item.name)}}  style={{position: 'relative'}} className={styles.itemContainer}>
																<div onClick={(event) => {event.stopPropagation(); handleFavorite(item.name)}}>
																	<FavoriteIcon 
																		className={styles.favorite}
																		style={{cursor: 'pointer', position: 'absolute', width: '25px', right: '15px', top: '15px', color: chooseColor(item.name)}}
																	/>
																</div>
																<div onClick={(event) => {event.stopPropagation(); handleCart(item.name)}}>
																	<ShoppingCartIcon 
																		className={styles.cart}
																		style={{cursor: 'pointer', position: 'absolute', width: '25px', right: '15px', top: '50px', color: chooseColorCart(item.name)}}
																	/>
																</div>
																<img className={styles.itemImage} src={item.img} alt="" />
																<div className={styles.itemFooter}>
																	<h2 className={styles.itemName}>{item.name}</h2>
																	<div style={{ display: 'flex', gap: '10px'}}>
																		<p style={{ color: getColor(item.rarity)}}>Rarity: {item.rarity}</p>
																			{item.rarity == 'Common' ? <img className={styles.rarityImg} src={common} alt="" /> : null}
																			{item.rarity == 'Rare' ? <img className={styles.rarityImg} src={rare} alt="" /> : null}
																			{item.rarity == 'Epic' ? <img className={styles.rarityImg} src={epic} alt="" /> : null}
																			{item.rarity == 'Legendary' ? <img className={styles.rarityImg} src={legendary} alt="" /> : null}
																	</div>
																	<p>Collection: {item.cardSet}</p>
																</div>
															</div>
														</Tilt>
													</div>
												))
										}
									</div>
								</main>
							</>
						}
					</div>
				</>
		}
		</>
	)
}