import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, auth } from '../fb'
import Navbar from './User/Navbar'
import Home from './User/Home'
import Login from './User/Login'
import Profile from './User/Profile'
import Scheduler from './User/Scheduler'
import Reports from './User/Reports'

function User() {
	const [id, setId] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)
			} else {
				setId()
			}
		})
	}, [])

	return (
		<>
			<Navbar userId={id} />
			<Routes>
				<Route path='login' element={<Login userId={id} />} />
				<Route path='profile' element={<Profile userId={id} />} />
				<Route path='scheduler' element={<Scheduler userId={id} />} />
				<Route path='reports' element={<Reports userId={id} />} />
				<Route path='*' element={<Home userId={id} />} />
			</Routes>
		</>
	)
}

export default User
