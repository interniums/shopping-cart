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
import { useState } from 'react'


export default function ShopPage(props) {
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
		const object = props.data.find(item => item.name === name)
		setChildProps({name: object.name, img: object.img, flavor: object.flavor, collection: object.cardSet, cost: object.cost, cart: object.cart,favorite: object.favorite})
		setShowItem(true)
	}

	const handleCart = (name) => {
		props.setData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, cart: obj.cart ? false : true }
				}
				return obj
			})
		})
	}

	const handleFavorite = (name) => {
		props.setData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, favorite: obj.favorite ? false : true }
				}
				return obj
			})
		})
	}
	
	return(
		<>
		{
			showItem ? 
				<ItemOverview 
					sortFavorites={props.sortFavorites}
					setSortFavorites={props.setSortFavorites}	
					data={props.data}
					setData={props.setData}
					childProps={childProps}
				/> : 
				<>
					<MainHeader 
						sortFavorites={props.sortFavorites}
						setSortFavorites={props.setSortFavorites}	
						data={props.data}
					/>
					<div
						style={{
							justifyContent: props.postLoading ? 'center' : 'start',
							alignItems: props.postLoading ? 'center' : 'start',
							marginTop: props.postLoading ? '10%' : '0%'
						}}
						className={styles.container}>
					{
						props.postLoading ?
						<div>
							<img className={styles.gif} src={gif} alt="" />
							<div style={{fontSize: '40px'}} className={styles.loading}>LOADING...</div>
						</div> : 
						<>
							<ShopNav 
								postLoading={props.postLoading}
								collections={props.collections}
								sortRarity={props.sortRarity}
								sortCollections={props.sortCollections}
								setSortCollections={props.setSortCollections}
								setSortRarity={props.setSortRarity}
								setSortAttack={props.setSortAttack}
							/>
							<main className={styles.main}>
								<h3 style={{ marginLeft: '60px'}}>{props.sortFavorites ? 'Favorites' : 'Cards'}({props.data?.length})</h3>
									<div className={styles.itemsContainer}>
										{props.data?.map(item => (
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
																	style={{cursor: 'pointer', position: 'absolute', width: '25px', right: '15px', top: '15px', color: item.favorite ? 'red' : 'white'}}
																/>
															</div>
															<div onClick={(event) => {event.stopPropagation(); handleCart(item.name)}}>
																<ShoppingCartIcon 
																	className={styles.cart}
																	style={{cursor: 'pointer', position: 'absolute', width: '25px', right: '15px', top: '50px', color: item.cart ? 'green' : 'white'}}
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
										))}
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