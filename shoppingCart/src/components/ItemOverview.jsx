/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MainHeader from "./MainHeader"
import styles from '../css/ItemOverview.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Tilt from 'react-parallax-tilt'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../App"

export default function ItemOverview() {
	const {
		itemOverview,
		sortFavorites,
		setSortFavorites,
		setMainData,
		maindata,
		setShowItem,
		setSortAttack,
		setSortRarity,
		setSortCollections
	} = useContext(DataContext)

	const [childProps, setChildProps] = useState({
		name: null,
		img: null, 
		flavor: null, 
		collection: null,
		cost: null, 
		cart: null,
		favorite: null
	})

	useEffect(() => {
		if (!maindata) return
		const object = maindata?.find(item => item.name === itemOverview)
		setChildProps({name: object.name, img: object.img, flavor: object.flavor, collection: object.cardSet, cost: object.cost, cart: object.cart,favorite: object.favorite})
	}, [itemOverview, maindata, setShowItem])

	const handleCart = () => {
		childProps.cart ? childProps.cart = false : childProps.cart = true
		setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === childProps.name) {
					return { ...obj, cart: obj.cart ? false : true }
				}
				return obj
			})
		})
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
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}	
				maindata={maindata}
			/>
			<header style={{margin: '50px 50px 0px 50px'}}>
				<Link onClick={() => resetStates()} style={{textDecoration: 'none', color: 'inherit'}} to='/shop'>
					<ArrowBackIcon className={styles.arrow} style={{fontSize: '50px', cursor: 'pointer', marginBottom: '30px'}}/>
				</Link>
			</header>
			<div className={styles.container}>
				<main className={styles.main}>
					<Tilt
						tiltReverse={true}
						tiltMaxAngleX={15}
						tiltMaxAngleY={15}
						glareEnable={true}
						glareMaxOpacity={0.5}
						glareColor='#fffff'
						glarePosition='all'
						perspective={1000}
					>
						<div className={styles.imageContainer}>
							<img src={childProps.img} alt="" className={styles.image}/>
						</div>	
					</Tilt>
					<div className={styles.infoContainer}>
						<div>
							<h1 style={{fontSize: '45px', marginTop: '-20px'}}>{childProps.name}</h1>
							<p style={{fontSize: '25px'}}>{childProps.collection}</p>
						</div>
						<div>
							<p  style={{fontSize: '45px', fontWeight: 'bold'}}>${childProps.cost * 8.5 + 3}</p>
							<p  style={{fontSize: '20px', textAlign: ''}}>{childProps.flavor}</p>
						</div>
						<div style={{display: 'grid', justifyContent: '', gap: '20px', marginTop: '30px', justifyItems: 'center'}}>
							<button style={{color: childProps.cart ? 'green' : 'rgb(225, 225, 225)'}} onClick={() => handleCart()} className={styles.cartButton}>
								<ShoppingCartIcon />Add to Cart
							</button>
							<Link
								to='/cart'
								style={{textDecoration: 'none', color: 'inherit', width: '85%', }}
							>
								<button style={{width: '100%'}} onClick={() =>{
									setMainData(prevArr => {
										return prevArr.map(obj => {
											if (obj.name === childProps.name) {
												return { ...obj, cart: true }
											}
											return obj
										})
									})}} 
									className={styles.cartButton}
								>$ Buy Now</button>
							</Link>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}