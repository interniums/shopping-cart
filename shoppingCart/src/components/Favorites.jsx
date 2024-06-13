/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import getColor from "../utils/getColor"
import Tilt from 'react-parallax-tilt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import styles from '../css/ShopPage.module.css'
import common from '../assets/common.webp'
import epic from '../assets/epic.webp'
import legendary from '../assets/legendary.webp'
import rare from '../assets/rare.webp'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../App"


export default function Favorites(props) {
	const {setItemOverview} = useContext(DataContext)
	const data = props.maindata.filter(item => item.favorite)

	const handleCart = (name) => {
		props.setMainData(prevArr => {
			return prevArr.map(obj => {
				if (obj.name === name) {
					return { ...obj, cart: obj.cart ? false : true }
				}
				return obj
			})
		})
	}

	const handleFavorite = (name) => {
		props.setMainData(prevArr => {
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
				data?.map(item => (
				<div className={styles.itemfav} style={{position: 'relative'}} key={item.cardId}>
					<Link
						onClick={() => setItemOverview(item.name)}
						to='/itemOverview'
						style={{textDecoration: 'none', color: 'inherit'}}
					>
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
					</Link>
				</div>))
			}
	</>
	)
}