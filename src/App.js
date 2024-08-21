import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './pages/UserDashboard'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user' element={<UserDashboard />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
