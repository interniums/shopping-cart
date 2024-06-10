/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import ShopPage from './components/ShopPage.jsx'
import ItemOverview from './components/ItemOverview.jsx'
import CartComponent from './components/CartComponent.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import React from 'react'
import NotFoundPage from './components/NotFoundPage.jsx'
const router = createBrowserRouter([
  {
    path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
		children: [
			{index: true, path: 'home', element: <HomePage />}
		]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>
)
