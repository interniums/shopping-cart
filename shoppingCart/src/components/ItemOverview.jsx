/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MainHeader from "./MainHeader"
import styles from '../css/ItemOverview.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Tilt from 'react-parallax-tilt'
import { Link } from "react-router-dom"

export default function ItemOverview(props) {
	const handleCart = (name) => {
		props.childProps.cart ? props.childProps.cart = false :  props.childProps.cart = true
		props.setData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === props.childProps.name) {
					return { ...obj, cart: obj.cart ? false : true }
				}
				return obj
			})
		})
	}

	return (
		<>
			<MainHeader 
				sortFavorites={props.sortFavorites}
				setSortFavorites={props.setSortFavorites}	
				data={props.data}
			/>
			<header style={{margin: '50px 50px 0px 50px'}}>
				<ArrowBackIcon className={styles.arrow} style={{fontSize: '50px', cursor: 'pointer', marginBottom: '30px'}}/>
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
							<img src={props.childProps.img} alt="" className={styles.image}/>
						</div>	
					</Tilt>
					<div className={styles.infoContainer}>
						<div>
							<h1 style={{fontSize: '45px', marginTop: '-20px'}}>{props.childProps.name}</h1>
							<p style={{fontSize: '25px'}}>{props.childProps.collection}</p>
						</div>
						<div>
							<p  style={{fontSize: '45px', fontWeight: 'bold'}}>${props.childProps.cost * 8.5 + 3}</p>
							<p  style={{fontSize: '20px', textAlign: ''}}>{props.childProps.flavor}</p>
						</div>
						<div style={{display: 'grid', justifyContent: '', gap: '20px', marginTop: '30px', justifyItems: 'center'}}>
							<button style={{color: props.childProps.cart ? 'green' : 'rgb(225, 225, 225)'}} onClick={() => handleCart()} className={styles.cartButton}><ShoppingCartIcon />Add to Cart</button>
							<button className={styles.cartButton}>$ Buy Now</button>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}