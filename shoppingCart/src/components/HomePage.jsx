/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/HomePage.module.css'
import MainHeader from './MainHeader'
import Button from '@mui/material/Button'
import gif from '../assets/giphy.gif'
import Tilt from 'react-parallax-tilt'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { DataContext } from '../App'

export default function HomePage() {
	const {
		random,
		sortFavorites,
		setSortFavorites,
		maindata,
		loading,
		setItemOverview
	} = useContext(DataContext)

	return (
		<div className={styles.container}>
			<MainHeader 
				loading={loading}
				sortFavorites={sortFavorites}
				setSortFavorites={setSortFavorites}
				maindata={maindata}
			/>
			<main className={styles.main}>
				<div className={styles.mainContent}>
					<h1 className={styles.h1}>Welcome to murlocs.</h1>
					<p className={styles.p}>
						Discover our selection of fresh murlocs, bursting with flavor and vitality. Delivered straight from the heartstone to your table.
					</p>
					<Link to='shop' className='link' >
						<Button id='shop' variant="outlined">Shop now</Button>
					</Link>
					<div className={styles.carousel}>
						{
							loading ? 
								<div>
									<img className={styles.gif} src={gif} alt="" />
									<div className={styles.loading}>LOADING</div>
								</div>
							: random?.map((item) => (
							<Tilt 
								key={item.cardId}
								tiltReverse={true}
								tiltMaxAngleX={20}
								tiltMaxAngleY={15}
								glareEnable={true}
								glareMaxOpacity={0.5}
								glareColor='#fffff'
								glarePosition='all'
								perspective={1000}
							>
								<Link 
									to='/itemOverview'
									onClick={() => setItemOverview(item.name)}
									style={{textDecoration: 'none', color: 'inherit'}}
								>
									<div className={styles.item}>
										<label className={styles.label}>{item.name}</label>
										<img className={styles.image} src={item.img} alt={item.name} />
									</div>
								</Link>
							</Tilt>))
						}
					</div>
				</div>
			</main>
		</div>
	)
}