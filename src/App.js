import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import UserHome from './pages/UserHome'
import LoginHospital from './pages/LoginHospital'
import UserProfile from './pages/UserProfile'
import RegisterHospital from './pages/RegisterHospital'
import Prescription from './pages/Prescription'
import Pdf from './pages/Pdf'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LoginUser />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='/user' element={<UserHome />} />
				<Route path='/userprofile' element={<UserProfile />} />
				<Route path='/hospitalLogin' element={<LoginHospital />} />
				<Route path='/hospitalRegister' element={<RegisterHospital />} />
				<Route path='/pres' element={<Prescription />} />
				<Route path='/pdf' element={<Pdf />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
