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


export default function ShopPage(props) {
	return(
		<>
			<MainHeader collections={props.collections}/>
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
					<div style={{fontSize: '40px'}} className={styles.loading}>LOADING</div>
				</div> : 
				<>
					<ShopNav 
						postLoading={props.postLoading}
						collections={props.collections}
						setSortAttack={props.setSortAttack}
					/>
					<main className={styles.main}>
						<h3 style={{ marginLeft: '60px'}}>Cards({props.data.length})</h3>
							<div className={styles.itemsContainer}>
								{props.data.map(item => (
									<Tilt
										key={item.cardId}
										tiltReverse={true}
										glareEnable={true}
										glareMaxOpacity={0.5}
										glareColor='#fffff'
										glarePosition='all'
										perspective={1000}
								>
										<div className={styles.itemContainer}>
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
								))}
							</div>
					</main>
				</>
			}
			</div>
		</>
	)
}