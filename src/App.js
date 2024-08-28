import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import LoginHospital from './pages/LoginHospital'
import RegisterHospital from './pages/RegisterHospital'
import User from './pages/UserHome'
import Prescription from './pages/Prescription'
import Pdf from './pages/Pdf'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='/hospitalLogin' element={<LoginHospital />} />
				<Route path='/hospitalRegister' element={<RegisterHospital />} />
				<Route path='/user' element={<User />} />
				<Route path='/pres' element={<Prescription />} />
				<Route path='/pdf' element={<Pdf />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
