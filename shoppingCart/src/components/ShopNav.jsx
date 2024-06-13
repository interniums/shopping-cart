/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import RangeSlider from './RangeSlider.jsx'
import Checkbox from '@mui/material/Checkbox'
import styles from '../css/ShopPage.module.css'
import CollectionSelect from './CollectionSelect.jsx'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useState } from 'react'

export default function ShopNav(props) {
	const [arrow, setArrow] = useState({
		rarity: true,
		attack: true,
		collection: true
	})

	const sortingRarity = (e) => {
		if (props.sortRarity.includes(e)) {
			props.setSortRarity(props.sortRarity.filter(item => item !== e))
		} else {
			props.setSortRarity(prevSort => [...prevSort, e])
		}
	}

	const handleArrow = (value) => {
		if (value == 'rarity') {
			setArrow({...arrow, rarity: !arrow.rarity})
		} 
		if (value == 'attack') {
			setArrow({...arrow, attack: !arrow.attack})
		}
		if (value == 'collection') {
			setArrow({...arrow, collection: !arrow.collection})
		}
	}

	return (
		<nav className={styles.nav}>
				<div className={styles.rarityContainer}>
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className={styles.rarityh2}>
						Rarity{arrow.rarity ? <ArrowUpwardIcon id='a1' onClick={() => handleArrow('rarity')} className={styles.shopNavArrow} /> : <ArrowDownwardIcon  id='a2' className={styles.shopNavArrow} onClick={() => handleArrow('rarity')}/>}
					</div>
				{
					arrow.rarity ?
					<div className={styles.rarityOptions}>
						<div className={styles.option}>
							<Checkbox
								defaultChecked={true}
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
					</div>  : null	
				}		
				</div>
			<div className={styles.attackContainer}>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className={styles.attackh2}>
					Attack{arrow.attack ? <ArrowUpwardIcon  id='a3' onClick={() => handleArrow('attack')} className={styles.shopNavArrow} /> : <ArrowDownwardIcon  id='a4' className={styles.shopNavArrow}  onClick={() => handleArrow('attack')}/>}
				</div>
				{
					arrow.attack ?
					<div className={styles.attackOptions}>
						<RangeSlider 
							setSortAttack={props.setSortAttack}
						/>
					</div> : null
				}
			</div>
			<div className={styles.collectionContainer}>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className={styles.collectionsp}>
					Collections{arrow.collection ? <ArrowUpwardIcon  id='a5' onClick={() => handleArrow('collection')} className={styles.shopNavArrow} /> : <ArrowDownwardIcon  id='a6' onClick={() => handleArrow('collection')} className={styles.shopNavArrow} />}
				</div>
				{
					arrow.collection ?
					<div className={styles.collectionSelect}>
						<CollectionSelect
							collections={props.collections}
							sortCollections={props.sortCollections}
							setSortCollections={props.setSortCollections}	
						/>
					</div> : null
				}	
			</div>
		</nav>
	)
}