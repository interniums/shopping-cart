/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from '../css/CartComponent.module.css'
import MainHeader from './MainHeader'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useReducer } from 'react'
import Tilt from 'react-parallax-tilt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import getColor from '../utils/getColor'
import common from '../assets/common.webp'
import epic from '../assets/epic.webp'
import legendary from '../assets/legendary.webp'
import rare from '../assets/rare.webp'
import gif from '../assets/giphy.gif'


export default function CartComponent(props) {
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

	return (
		<>
			<MainHeader 
				sortFavorites={props.sortFavorites}
				setSortFavorites={props.setSortFavorites}	
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
					<main
						style={{padding: '50px'}}
						className={styles.main}>
						<header>
							<ArrowBackIcon 
								style={{ fontSize: '50px'}}
							/>
						</header>
						<div style={{marginTop: '20px'}} className={styles.mainLeft}>
							<h2>Shopping Bag</h2>
							<div className={styles.items}>
								{props.maindata.map(item => (
									item.cart ?
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
														<div style={{position: 'relative'}} className={styles.itemContainer}>
															<div onClick={() => {item.favorite ? item.favorite = false : item.favorite = true; forceUpdate()}}>
																<FavoriteIcon 
																	className={styles.favorite}
																	style={{cursor: 'pointer', position: 'absolute', width: '25px', right: '15px', top: '15px', color: item.favorite ? 'red' : 'white'}}
																/>
															</div>
															<div onClick={() => {item.cart ? item.cart = false : item.cart = true; forceUpdate()}}>
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
										: null
								))}
							</div>
						</div>
						<div className={styles.mainRight}>

						</div>
					</main>
				}
			</div>
		</>
	)
}