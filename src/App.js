import { f } from './fb'

const res = await f()
console.log(res.data)

function App() {
	return (
		<div className='p-5'>
			<div className='display-1 p-5'>Hello World!</div>
			<p className='lead'>Firebase</p>
			<p className='lead'>React</p>
			<p className='lead'>Bootstrap</p>
		</div>
	)
}

export default App
