import { auth, signOut } from '../../fb'

const Navbar = ({ userId }) => {
	return (
		<div>
			<nav className='navbar navbar-expand-lg overflow-hidden' style={{ marginBottom: '0px', backgroundColor: '#0056b3', height: '60px' }}>
				<div className='container-fluid'>
					{/* Back Arrow Icon */}
					<a className='navbar-brand fw-semibold fs-10' href='#'>
						<img src='/images/arrow_back.svg' alt='arrow' style={{ marginLeft: '10px', height: '40px', width: '40px' }} />
					</a>

					{/* Logo */}
					<a className='navbar-brand fw-semibold fs-10' href='#'>
						<img src='/images/login.png' alt='Logo' style={{ height: '40px', width: '40px' }} />
					</a>

					{/* Navbar Toggler */}
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					{/* Navbar Links */}
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='/user/home'>
									Home
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='/user/reports'>
									Reports
								</a>
							</li>
							{/* <li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='/user/pres'>
									Medicine
								</a>
							</li> */}
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='/user/scheduler'>
									Scheduler
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Help
								</a>
							</li>
							{userId ? (
								<li className='nav-item mx-4'>
									<button className='nav-link mx-2 m-0' onClick={() => signOut(auth)}>
										Logout
									</button>
								</li>
							) : (
								<li className='nav-item mx-4'>
									<a className='nav-link mx-2' href='/user/login'>
										Login
									</a>
								</li>
							)}
							<li className='nav-item mx-4'>
								<a className='nav-link fw-bold mx-2' href='/user/profile'>
									<img src='/images/avatar.svg' alt='user details' style={{ width: '40px', height: '40px' }} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
