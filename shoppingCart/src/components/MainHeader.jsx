/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/MainHeader.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext } from "react-router-dom"

export default function MainHeader(props) {
	const favorites = useMemo(() => {
		const items = props.maindata?.filter(item => item.favorite == true)
		return items?.length
	}, [props.maindata])

	const cart = useMemo(() => {
		const items = props.maindata?.filter(item => item.cart == true)
		return items?.length
	}, [props.maindata])

	const resetStates = () => {
		props.setSortFavorites(false)
		props.setSortAttack([1, 13])
		props.setSortRarity(['All'])
		props.setSortCollections(['All'])
	}

	return (
			props.loading ? null :
			<header className={styles.header}>
				<div className={styles.leftSection}>
					<Link onClick={() => resetStates()} className='link' to='/'><h1 className={styles.h1}>murlocs.</h1></Link>
					<nav className={styles.nav}>
						<Link onClick={() => resetStates()} className='link' to='/'><p className={styles.p}>Home</p></Link>
						<Link onClick={() => resetStates()} className='link' to='/shop'><p className={styles.p}>Store</p></Link>
					</nav>
				</div>
				<div className={styles.rightSection}>
					<div className={styles.searchContainer}>
						<SearchIcon className={styles.search} fontSize='large'/>
						<input placeholder='Search' type="text" className={styles.input}/>
					</div>
					<div className={styles.favContainer}>
						<Link to='/shop' className='link'>
							<div style={{display: 'flex', gap: '10px', alignItems: 'center'}} onClick={() => {props.sortFavorites ? props.setSortFavorites(false) : props.setSortFavorites(true)}}>
								<FavoriteIcon 
									className={styles.icons}
									fontSize='large'
									style={{color: 'white'}}	
								/>
									<div>{favorites}</div>
							</div>
						</Link>
						<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
							<Link className='link' to='/cart'><ShoppingCartIcon className={styles.icons} fontSize='large'/></Link>
							<div>{cart}</div>
						</div>
					</div>
				</div>
			</header>
	)
}