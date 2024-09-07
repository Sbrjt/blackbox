function Home() {
	return (
		<>
			<div className='container py-4 d-flex flex-column align-items-center min-vh-100 bg-white text-dark'>
				<p className='mb-0 text-left fs-5 w-100 fw-bold font-nunito'>
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
				<div className='container my-4'>
					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5'>
						{/* Card 1 */}
						<div className='col'>
							<a href='/user/reports' className='text-decoration-none'>
								<div className='border border-dark h-100 rounded-3 border-dark d-flex flex-column justify-content-center align-items-center hover-zoom'>
									<img
										src='/images/Records.svg'
										className='my-3'
										alt='Card Image 1'
										style={{
											height: '200px',
											width: '200px',
											objectFit: 'contain'
										}}
									/>
									<div className='overflow-hidden text-center '>
										<p className='fw-bold fs-5 '>
											Securely store and
											<br />
											access all your medical documents in one place
										</p>
									</div>
									<hr className='my-2 border-2 border-dark' />
									<div className='c-footer overflow-hidden text-center'>
										<p className='btn btn-primary fs-3 mb-2'>
											Reports <img style={{ width: '45px', height: '45px', margin: '0px' }} src='/images/double_arrow.svg' alt='arrow' />
										</p>
									</div>
								</div>
							</a>
						</div>
						{/* Repeat for other cards */}
						{/* Card 2 */}
						<div className='col'>
							<a href='/user/prescription' className='text-decoration-none'>
								<div className='border border-dark h-100 rounded-3 border-dark d-flex flex-column justify-content-center align-items-center hover-zoom'>
									<img
										src='/images/medicine_Bottle_code.svg'
										className='my-3'
										alt='Card Image 2'
										style={{
											height: '200px',
											width: '200px',
											objectFit: 'contain'
										}}
									/>
									<div className='text-center'>
										<p className='fw-bold fs-5'>
											Track and manage
											<br />
											your medications effortlessly
										</p>
									</div>
									<hr className='my-2 border-2 border-dark' />
									<div className='c-footer text-center'>
										<p className='btn btn-primary fs-3 mb-2'>
											Medicines <img style={{ width: '45px', height: '45px', margin: '0px' }} src='/images/double_arrow.svg' alt='arrow' />
										</p>
									</div>
								</div>
							</a>
						</div>
						{/* Card 3 */}
						<div className='col'>
							<a href='/user/scheduler' className='text-decoration-none'>
								<div className='border border-dark h-100 rounded-3 d-flex flex-column justify-content-center align-items-center'>
									<img
										src='/images/stopwatch.svg'
										className='my-3'
										alt='Card Image 3'
										style={{
											height: '200px',
											width: '200px',
											objectFit: 'contain'
										}}
									/>
									<div className='card-body text-center'>
										<p className='fw-bold fs-5'>Stay on schedule with timely reminders for your medications</p>
									</div>
									<hr className='my-2 border-2 border-dark' />
									<div className='text-center '>
										<p className='btn btn-primary fs-3 mb-2'>
											Scheduler
											<img style={{ width: '45px', height: '45px', margin: '0px' }} src='/images/double_arrow.svg' alt='arrow' />
										</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
