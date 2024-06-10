/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"

export default function NotFoundPage() {
	return (
		<div style={{width: '100%', height: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center', gap: '50px'}}>
			<h1>404 not found</h1>
			<Link to='/'>
				<button style={{border: '1px solid rgb(225, 225, 225)', borderRadius: '15px', outline: 'none', appearance: 'none', boxShadow: 'none', padding: '20px 40px', fontSize: '40px', cursor: 'pointer'}}>HOME</button>
			</Link>
		</div>
	)
}