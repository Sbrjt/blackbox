import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
