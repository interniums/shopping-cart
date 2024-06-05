/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from '../css/HomePage.module.css'
import MainHeader from './MainHeader'
import Button from '@mui/material/Button'
import gif from '../assets/giphy.gif'

export default function HomePage(props) {

	return (
		<div className={styles.container}>
			<MainHeader />
			<main className={styles.main}>
				<div className={styles.mainContent}>
					<h1 className={styles.h1}>Welcome to murlocs.</h1>
					<p className={styles.p}>Discover our selection of fresh murlocs, bursting with flavor and vitality. Delivered straight from the heartstone to your table.</p>
					<Button id='shop' variant="outlined">Shop now</Button>
					<div className={styles.carousel}>
						{
							props.postLoading == true ? <div>
									<img className={styles.gif} src={gif} alt="" />
									<div style={{fontSize: '40px'}} className={styles.loading}>LOADING</div>
								</div>
							: null
						}
						{props.postLoading == false ? props.random.map((item) => (
							<div className={styles.item} key={item.cardId}>
								<label className={styles.label}>{item.name}</label>
								<img className={styles.image} src={item.img} alt={item.name} />
							</div>
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