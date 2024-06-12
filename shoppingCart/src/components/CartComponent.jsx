/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from '../css/CartComponent.module.css'
import MainHeader from './MainHeader'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useContext, useMemo } from 'react'
import Tilt from 'react-parallax-tilt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import getColor from '../utils/getColor'
import common from '../assets/common.webp'
import epic from '../assets/epic.webp'
import legendary from '../assets/legendary.webp'
import rare from '../assets/rare.webp'
import gif from '../assets/giphy.gif'
import getTotal from '../utils/getTotal'
import getItemsTotal from '../utils/getItemsTotal'
import { DataContext } from '../App'
import { Link } from 'react-router-dom'

export default function CartComponent(props) {
	const {
		sortFavorites,
		setSortFavorites,
		maindata,
		setMainData,
		loading,
		setSortAttack,
		setSortRarity,
		setSortCollections
	} = useContext(DataContext)

	const itemsTotal = useMemo(() => {
		if (!maindata) return null
		return getItemsTotal(maindata)
	}, [maindata])

	const total = useMemo(() => {
		if (!maindata) return null
		return getTotal(maindata)
	}, [maindata])

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

	const handleCart = (name) => {
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, cart: false }
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

	const resetStates = () => {
		setSortFavorites(false)
		setSortAttack([1, 13])
		setSortRarity(['All'])
		setSortCollections(['All'])
	}
	
	return (
		<>
			<MainHeader 
				loading={loading}
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				maindata={maindata}
			/>
			<div style={{
					justifyContent: loading ? 'center' : 'start',
					alignItems: loading ? 'center' : 'start',
					marginTop: loading ? '10%' : '0%'
				}} className={styles.container}>
				{
					loading ?
						<div>
							<img className={styles.gif} src={gif} alt="" />
							<div style={{fontSize: '40px'}} className={styles.loading}>LOADING...</div>
						</div> :
					<>
						<main
							style={{padding: '50px'}}
							className={styles.main}
						>
							<div style={{width: '55%'}} className={styles.mainLeft}>
								<header style={{marginBottom: '15px'}}>
									<Link onClick={() => resetStates()} to='/shop' style={{textDecoration: 'none', color: 'inherit'}}>
										<ArrowBackIcon
											className={styles.arrow} 
											style={{ fontSize: '50px'}}
										/>
									</Link>
								</header>
								<h2 style={{marginLeft: '15px'}}>Shopping Bag({maindata.filter(item => item.cart).length})</h2>
								<div className={styles.items}>
									{maindata?.map(item => (
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
													<div style={{position: 'relative', cursor: 'pointer'}} className={styles.itemContainer}>
														<img className={styles.itemImage} src={item.img} alt="" />
													</div>
												</Tilt>
												<div className={styles.itemInfo}>
													<div style={{minWidth: '200px'}}>
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
															<div onClick={() => handleFavorite(item.name)}>
																<FavoriteIcon 
																	className={styles.favorite}
																	style={{fontSize: '35px',cursor: 'pointer', color: chooseColor(item.name)}}
																/>
															</div>
															<div onClick={() => handleCart(item.name)}>
																<ShoppingCartIcon 
																	className={styles.cart}
																	style={{fontSize: '35px', cursor: 'pointer', color: chooseColorCart(item.name)}}
																/>
															</div>
														</div>
													</div>
													<div className={styles.itemHandle}>
														<div style={{fontSize: '20px'}}>${item.cost * 8.5 + 3}</div>
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
									<h2>$ {total}</h2>
									<div>
										<p>Subtotal {itemsTotal}(items)</p>
										<p>${Math.round(total * 0.8)}</p>
									</div>
									<div>
										<p>VAT (20%)</p>
										<p>${Math.round(total * 0.2)}</p>
									</div>
									<hr />
									<div style={{display: 'flex', justifyContent: 'space-between'}}>
										<h2>Total</h2>
										<h2>${total}</h2>
									</div>
									<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
										<button className={styles.button}>Checkout</button>
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