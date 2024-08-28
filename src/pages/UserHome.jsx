import '../css/UserHome.css'

function UserHome() {
	return (
		<div>
			<nav className='navbar navbar-expand-lg' style={{ backgroundColor: '#0056b3', height: '60px' }}>
				<div className='container-fluid'>
					<a className='navbar-brand fw-semibold fs-10' href='#'>
						<img src='./images/arrow_back.svg' alt='arrow' style={{ marginLeft: '10px', height: '40px', width: '40px' }} />
					</a>
					<a className='navbar-brand fw-semibold fs-10' href='#'>
						<img src='./images/login.png' alt='Logo' style={{ height: '40px', width: '40px' }} />
					</a>
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
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Home
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Reports
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Medicine
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Scheduler
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link mx-2' href='#'>
									Help
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link fw-bold mx-2' href='#'>
									<img src='./images/login.png' alt='user details' style={{ width: '40px', height: '40px' }} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div style={{ padding: '40px', alignItems: 'center' }} className='container'>
				<p style={{ marginBottom: '0px', textAlign: 'left', fontSize: '23px', width: '100%', fontFamily: 'Nunito, sans-serif', fontWeight: '700' }}>
					<i>
						Our Web-Application is your all-in-one solution for managing health records,
						<br />
						medications, and schedules. It ensures that medical information is always organized,
						<br /> accessible, and secure.
						<br />
						<br /> Whether you're tracking personal health or managing patient care,
						<br /> our platform simplifies the process, helping you stay informed and on top of your health with ease.
					</i>
				</p>
			</div>
			<div className='container my-4'>
				<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5'>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/Records.svg' className='card-img-top' alt='Card Image 1' />
							<div className='card-body'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '21px' }}>
									Securely store and
									<br />
									access all your medical documents in one place
								</p>
							</div>
							<hr style={{ color: '#083b6e', height: '10%', width: '100%' }} />
							<div className='c-footer' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href='#' style={{ textDecoration: 'none' }}>
									<p style={{ color: 'darkblue' }}>
										Reports <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/medicine_Bottle_code.svg' className='card-img-top' alt='Card Image 2' />
							<div className='card-body'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '20px' }}>
									Track and manage
									<br />
									your medications effortlessly
								</p>
							</div>
							<hr style={{ color: '#343a40', height: '2px', width: '100%' }} />
							<div className='c-footer' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href='#' style={{ textDecoration: 'none' }}>
									<p style={{ color: 'darkblue' }}>
										Medicines <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/stopwatch.svg' className='card-img-top' alt='Card Image 3' />
							<div className='card-body'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '20px' }}>
									Stay on schedules with timely reminders for your medications
								</p>
							</div>
							<hr style={{ color: '#343a40', height: '2px', width: '100%' }} />
							<div className='c-footer' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href='#' style={{ textDecoration: 'none' }}>
									<p style={{ color: 'darkblue' }}>
										Scheduler <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserHome
