/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/MainHeader.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import searchFunction from '../utils/searchFunction'
import { DataContext } from '../App'

export default function MainHeader(props) {
	const {setItemOverview} = useContext(DataContext)
	const [search, setSearch] = useState(null)
	const [showSearch, setShowSearch] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

	const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSearch(false)
    }
  }

	const searchOutput = useMemo(() => {
		if (!props.maindata) return
		return searchFunction(props.maindata, search)
	}, [search, props.maindata])

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
						<SearchIcon id='headerSearch' className={styles.search} fontSize='large'/>
						<input onClick={() => setShowSearch(true)} onChange={(event) => {setSearch(event.target.value); () => setShowSearch(true)}} placeholder='Search' type="text" className={styles.input}/>
						{
							showSearch ? 
								<div ref={dropdownRef} className={styles.dropMenu}>
									{
										searchOutput?.map(item => (
											<Link 
												key={item.name}
												style={{textDecoration: 'none', color: 'inherit'}}
												onClick={() => {setItemOverview(item.name)}}
												to={`/itemOverview`}
											>
												<div className={styles.dropItem}>
													<img className={styles.dropImage} src={item.img} alt="" />
													<p className={styles.dropText}>{item.name}</p>
												</div>
											</Link>
										))
									}
								</div>
							: null
						}
					</div>
					<div className={styles.favContainer}>
						<Link to='/shop' className='link'>
							<div style={{display: 'flex', gap: '10px', alignItems: 'center'}} onClick={() => {props.sortFavorites ? props.setSortFavorites(false) : props.setSortFavorites(true)}}>
								<FavoriteIcon
									id='headerFavorite' 
									className={styles.icons}
									fontSize='large'
									style={{color: props.sortFavorites ? 'red' : 'white'}}	
								/>
									<div className={styles.headerCount}>{favorites}</div>
							</div>
						</Link>
						<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
							<Link className='link' to='/cart'><ShoppingCartIcon id='headerCart'  className={styles.icons} fontSize='large'/></Link>
							<div className={styles.headerCount}>{cart}</div>
						</div>
					</div>
				</div>
			</header>
	)
}