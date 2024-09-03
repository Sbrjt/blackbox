function Home() {
	return (
		<>
			<a className='btn btn-primary' href='user/login'>
				User Login
			</a>
			<br></br>
			<a className='btn btn-primary' href='/hospital/login'>
				Hospital Login
			</a>
			<br></br>
			<a className='btn btn-primary' href='/hospital/register'>
				Hospital Register
			</a>
		</>
	)
}

export default Home
