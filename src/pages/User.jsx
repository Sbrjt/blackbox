import { Route, Routes } from 'react-router-dom'
import Navbar from './User/Navbar'
import Home from './User/Home'
import Login from './User/Login'
import Profile from './User/Profile'
import Scheduler from './User/Scheduler'
import Reports from './User/Reports'

function User() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='profile' element={<Profile />} />
				<Route path='scheduler' element={<Scheduler />} />
				<Route path='reports' element={<Reports />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</>
	)
}

export default User
