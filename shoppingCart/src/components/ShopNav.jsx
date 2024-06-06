/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import RangeSlider from './RangeSlider.jsx'
import Checkbox from '@mui/material/Checkbox'
import styles from '../css/ShopPage.module.css'
import CollectionSelect from './CollectionSelect.jsx'

export default function ShopNav(props) {

	const sortingRarity = (e) => {
		if (props.sortRarity.includes(e)) {
			props.setSortRarity(props.sortRarity.filter(item => item !== e))
		} else {
			props.setSortRarity(prevSort => [...prevSort, e])
		}
	}

	return (
		<nav className={styles.nav}>
			<div className={styles.rarityContainer}>
				<h2 className={styles.rarityh2}>Rarity</h2>
				<div className={styles.rarityOptions}>
				<div className={styles.option}>
						<Checkbox
							onClick={() => sortingRarity('All')}
							sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="All">All</label>
					</div>
					<div className={styles.option}>
						<Checkbox
							onClick={() => sortingRarity('Free')}
							sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="free">Free</label>
					</div>
					<div className={styles.option}>
						<Checkbox 
							onClick={() => sortingRarity('Common')}
							sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="common">Common</label>
					</div>
					<div className={styles.option}>
						<Checkbox
							onClick={() => sortingRarity('Rare')}
							sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="rare">Rare</label>
					</div>
					<div className={styles.option}>
						<Checkbox 
							onClick={() => sortingRarity('Epic')}
							sx={{
							color: 'rgb(225, 225, 225)',
							'&.Mui-checked': {
								color: 'rgb(225, 225, 225)'
							}
						}}/>
						<label htmlFor="epic">Epic</label>
					</div>
					<div className={styles.option}>
						<Checkbox
							onClick={() => sortingRarity('Legendary')}
							sx={{
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
						<RangeSlider 
							setSortAttack={props.setSortAttack}
						/>
					</div>
				</div>
				<div className={styles.collectionContainer}>
					<h2>Collections</h2>
					<CollectionSelect 
						postLoading={props.postLoading} 
						collections={props.collections}
						sortCollections={props.sortCollections}
						setSortCollections={props.setSortCollections}	
					/>
				</div>
		</nav>
	)
}