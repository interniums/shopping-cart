/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/HomePage.module.css'
import MainHeader from './MainHeader'
import Button from '@mui/material/Button'
import gif from '../assets/giphy.gif'
import Tilt from 'react-parallax-tilt'
import { Link } from "react-router-dom"

export default function HomePage(props) {

	return (
		<div className={styles.container}>
			<MainHeader />
			<main className={styles.main}>
				<div className={styles.mainContent}>
					<h1 className={styles.h1}>Welcome to murlocs.</h1>
					<p className={styles.p}>Discover our selection of fresh murlocs, bursting with flavor and vitality. Delivered straight from the heartstone to your table.</p>
					<Link to='shop' className='link' >
						<Button id='shop' variant="outlined">Shop now</Button>
					</Link>
					<div className={styles.carousel}>
						{
							props.loading == true ? <div>
									<img className={styles.gif} src={gif} alt="" />
									<div style={{fontSize: '40px'}} className={styles.loading}>LOADING</div>
								</div>
							: null
						}
						{props.loading == false ? props.random?.map((item) => (
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
								<div className={styles.item}>
									<label className={styles.label}>{item.name}</label>
									<img className={styles.image} src={item.img} alt={item.name} />
								</div>
							</Tilt>
						)): null}
					</div>
					<div className={styles.ulContainer}>
						<ul className={styles.ul}>
							<li className={styles.li}></li>
							<li className={styles.li}></li>
							<li className={styles.li}></li>
							<li className={styles.li}></li>
							<li className={styles.li}></li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	)
}