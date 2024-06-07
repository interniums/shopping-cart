/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/MainHeader.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'

export default function MainHeader(props) {

	return (
		<header className={styles.header}>
			<div className={styles.leftSection}>
				<h1 className={styles.h1}>murlocs.</h1>
				<nav className={styles.nav}>
					<p className={styles.p}>Home</p>
					<p className={styles.p}>Store</p>
				</nav>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.searchContainer}>
					<SearchIcon className={styles.search} fontSize='large'/>
					<input placeholder='Search' type="text" className={styles.input}/>
				</div>
				<div className={styles.favContainer}>
					<div onClick={() => {props.sortFavorites ? props.setSortFavorites(false) : props.setSortFavorites(true)}}>
						<FavoriteIcon className={styles.icons} fontSize='large'/>
					</div>
					<ShoppingCartIcon className={styles.icons} fontSize='large'/>
				</div>
			</div>
		</header>
	)
}