/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import RangeSlider from './RangeSlider.jsx'
import Checkbox from '@mui/material/Checkbox'
import styles from '../css/ShopPage.module.css'
import CollectionSelect from './CollectionSelect.jsx'

export default function ShopNav(props) {

	return (
		<nav className={styles.nav}>
			<div className={styles.rarityContainer}>
				<h2 className={styles.rarityh2}>Rarity</h2>
				<div className={styles.rarityOptions}>
					<div className={styles.option}>
						<Checkbox sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="free">Free</label>
					</div>
					<div className={styles.option}>
						<Checkbox sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="common">Common</label>
					</div>
					<div className={styles.option}>
						<Checkbox sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="rare">Rare</label>
					</div>
					<div className={styles.option}>
						<Checkbox sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="epic">Epic</label>
					</div>
					<div className={styles.option}>
						<Checkbox sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>	
						<label htmlFor="legendary">Legendary</label>
					</div>
				</div>
			</div>
			<div className={styles.attackContainer}>
					<h2>Attack</h2>
					<div className={styles.attackOptions}>
						<RangeSlider setSortAttack={props.setSortAttack}/>
					</div>
				</div>
				<div className={styles.collectionContainer}>
					<h2>Collections</h2>
					<CollectionSelect postLoading={props.postLoading} collections={props.collections}/>
				</div>
		</nav>
	)
}