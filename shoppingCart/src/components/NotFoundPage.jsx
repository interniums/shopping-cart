/* eslint-disable no-unused-vars */
import { Link, useRouteError } from "react-router-dom"

export default function NotFoundPage() {
	const error = useRouteError()
	return (
		<div style={{width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px'}}>
			<div style={{display: 'grid', alignItems: 'center', justifyContent: 'center', gap: '50px'}}>
				<h1 style={{textAlign: 'center'}}>404 not found</h1>
				<p>{error.statusText || error.message}</p>
				<Link to='/' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'}}>
					<button style={{border: '1px solid rgb(185, 185, 185)', borderRadius: '15px', outline: 'none', appearance: 'none', boxShadow: 'none', padding: '20px 40px', fontSize: '40px', cursor: 'pointer', color: 'rgb(50, 83, 106)'}}>HOME</button>
				</Link>
			</div>
		</div>
	)
}