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
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../App.jsx'
import Favorites from './Favorites.jsx'
import { Link } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ShopPage() {
	const [shopNav, setShopNav] = useState(false)

	useEffect(() => {
    if (shopNav && window.innerWidth < 900) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [shopNav])

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
		sortedData,
		setItemOverview
	} = useContext(DataContext)

	const handleCart = (name) => {
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, cart: !obj.cart }
				}
				return obj
			})
		})
	}

	const handleFavorite = (name) => {
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, favorite: !obj.favorite }
				}
				return obj
			})
		})
	}

	const chooseColor = (name) => {
		const object = maindata?.find(item => item.name === name)
		if (object?.favorite === true) return 'red'
		if (object?.favorite === true) return 'rgb(225, 225, 225)'
	}

	const chooseColorCart = (name) => {
		const object = maindata?.find(item => item.name === name)
		if (object?.cart === true) return 'green'
		if (object?.cart === true) return 'rgb(225, 225, 225)'
	}
	
	return(
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
					<div style={{display: 'grid', alignItems: 'end	', justifyContent: 'center', width: '100%', height: '400px', gridTemplateRows: '5fr 1fr'}}>
						<img className={styles.gif} src={gif} alt="" />
						<div className={styles.loading}>LOADING...</div>
					</div> : 
					<>
						{!shopNav ? <KeyboardArrowRightIcon id='arrow1' onClick={() => setShopNav(!shopNav)}/> : <KeyboardArrowLeftIcon id='arrow2' onClick={() => setShopNav(!shopNav)}/>}
					{
						shopNav ?
						<ShopNav 
							collections={collections}
							sortRarity={sortRarity}
							sortCollections={sortCollections}
							setSortCollections={setSortCollections}
							setSortRarity={setSortRarity}
							setSortAttack={setSortAttack}
						/> : null
					}
						<main className={styles.main}>
							<h3 className={styles.h3} style={{ marginLeft: '60px'}}>{sortFavorites ? 'Favorites' : 'Cards'}({!sortFavorites ? sortedData?.length : maindata.filter(item => item.favorite).length})</h3>
							<div className={styles.itemsContainer}>
								{
									sortFavorites ? 
										<Favorites 
											maindata={maindata}
											loading={loading}
											setMainData={setMainData}
										/> :
										sortedData?.map(item => (
											<div
												className={styles.itemDiv}
												style={{position: 'relative'}} key={item.cardId}>
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
														<div  style={{position: 'relative'}} className={styles.itemContainer}>
															<Link
																className={styles.itemLink}
																onClick={() => setItemOverview(item.name)}
																to={`/itemOverview`}
																style={{
																textDecoration: 'none',
																color: 'inherit',
																}}
															>
																<div>
																	<FavoriteIcon
																		id='shopFavoriteItem' 
																		onClick={(event) => {event.stopPropagation(); event.preventDefault(); handleFavorite(item.name)}}
																		className={styles.favorite}
																		style={{cursor: 'pointer', position: 'absolute', color: chooseColor(item.name)}}
																	/>
																</div>
																<div>
																	<ShoppingCartIcon
																		id='shopCartItem'  
																		onClick={(event) => {event.stopPropagation(); event.preventDefault(); handleCart(item.name)}}
																		className={styles.cart}
																		style={{cursor: 'pointer', position: 'absolute', color: chooseColorCart(item.name)}}
																	/>
																</div>
																<img className={styles.itemImage} src={item.img} alt="" />
																<div className={styles.itemFooter}>
																	<h2 className={styles.itemName}>{item.name}</h2>
																	<div style={{ display: 'flex', gap: '10px'}}>
																		<p className={styles.rarityp} style={{ color: getColor(item.rarity)}}>Rarity: {item.rarity}</p>
																			{item.rarity == 'Common' ? <img className={styles.rarityImg} src={common} alt="" /> : null}
																			{item.rarity == 'Rare' ? <img className={styles.rarityImg} src={rare} alt="" /> : null}
																			{item.rarity == 'Epic' ? <img className={styles.rarityImg} src={epic} alt="" /> : null}
																			{item.rarity == 'Legendary' ? <img className={styles.rarityImg} src={legendary} alt="" /> : null}
																	</div>
																	<p className={styles.rarityp}>Collection: {item.cardSet}</p>
																</div>
															</Link>
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
	)
}