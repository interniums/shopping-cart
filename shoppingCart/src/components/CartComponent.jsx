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
					<>
						<div>
						<img className={styles.gif} src={gif} alt="" />
						<div style={{fontSize: '40px'}} className={styles.loading}>LOADING...</div>
					</div>
					</> :
					<>
						<main
							style={{padding: '50px'}}
							className={styles.main}
						>
							<div style={{width: '55%'}} className={styles.mainLeft}>
								<header style={{marginBottom: '15px'}}>
									<ArrowBackIcon
										className={styles.arrow} 
										style={{ fontSize: '50px'}}
									/>
								</header>
								<h2 style={{marginLeft: '15px'}}>Shopping Bag</h2>
								<div className={styles.items}>
									{props.data?.map(item => (
										item.cart ?
											<div className={styles.item} style={{position: 'relative'}} key={item.cardId}>
												<Tilt
													className={styles.cardContainer}
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
														<img className={styles.itemImage} src={item.img} alt="" />
													</div>
												</Tilt>
												<div className={styles.itemInfo}>
													<h2 className={styles.itemName}>{item.name}</h2>
														<div style={{ display: 'flex', gap: '10px'}}>
															<p style={{ color: getColor(item.rarity)}}>Rarity: {item.rarity}</p>
																{item.rarity == 'Common' ? <img className={styles.rarityImg} src={common} alt="" /> : null}
																{item.rarity == 'Rare' ? <img className={styles.rarityImg} src={rare} alt="" /> : null}
																{item.rarity == 'Epic' ? <img className={styles.rarityImg} src={epic} alt="" /> : null}
																{item.rarity == 'Legendary' ? <img className={styles.rarityImg} src={legendary} alt="" /> : null}
														</div>
														<p>Collection: {item.cardSet}</p>
														<div className={styles.buttons}>
															<div onClick={() => {item.favorite ? item.favorite = false : item.favorite = true; forceUpdate()}}>
																<FavoriteIcon 
																	className={styles.favorite}
																	style={{fontSize: '35px',cursor: 'pointer', color: item.favorite ? 'red' : 'white'}}
																/>
															</div>
															<div onClick={() => {item.cart ? item.cart = false : item.cart = true; forceUpdate()}}>
																<ShoppingCartIcon 
																	className={styles.cart}
																	style={{fontSize: '35px', cursor: 'pointer', color: item.cart ? 'green' : 'white'}}
																/>
															</div>
														</div>
												</div>
											</div>
											: null
									))}
								</div>
							</div>
							<div className={styles.mainRight}>
								<div className={styles.orderContainer}>
									<h1>Order summary</h1>
									<h2>$46.48</h2>
									<div>
										<p>Subtotal 3(items)</p>
										<p>$39.0</p>
									</div>
									<div>
										<p>VAT (20%)</p>
										<p>$7.8</p>
									</div>
									<hr />
									<div>
										<h2>Total</h2>
										<h2>$46.8</h2>
									</div>
								</div>
							</div>
						</main>
					</>
				}
			</div>
		</>
	)
}