import { useEffect, useState } from 'react'
import {
	auth,
	doc,
	firestore,
	onAuthStateChanged,
	getDoc,
	storage,
	uploadBytes,
	ref,
	getDownloadURL,
	arrayUnion,
	updateDoc,
	setDoc,
	serverTimestamp,
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	query,
	orderBy
} from '../fb'

function User() {
	const [id, setId] = useState()
	const [data, setData] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				// user data
				onSnapshot(doc(firestore, 'users', usr.uid), (snap) => {
					setData(snap.data())
				})

				// user reports
				onSnapshot(query(collection(firestore, 'users', usr.uid, 'reports'), orderBy('time')), (snap) => {
					setReports(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
			} else {
				window.location.href = '/userLogin'
			}
		})
	}, [])

	async function upload(e) {
		e.preventDefault()
		try {
			const filename = e.target.elements.filename.value

			// upload img to fb storage
			const imgref = ref(storage, filename)
			await uploadBytes(imgref, newUpload)

			// also keep track in firestore
			await addDoc(collection(firestore, 'users', id, 'reports'), {
				file: filename,
				url: await getDownloadURL(imgref),
				time: new Date()
			})

			setNewUpload(null)
		} catch (err) {
			console.log(err)
		}
	}

	async function edit(e) {
		e.preventDefault()
		const { name, email, dob, gender, bloodGroup } = e.target.elements

		try {
			await updateDoc(doc(firestore, 'users', id), {
				name: name.value,
				email: email.value,
				dob: dob.value,
				bloodGroup: bloodGroup.value,
				gender: gender.value
			})
			setEditMode(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='m-5'>
			{/* <h1>Dashboard</h1>
			<br />*/}
			{/* data
			{data ? (
				<form onSubmit={edit}>
					<div>Name: {editMode ? <input name='name' defaultValue={data.name} /> : <span>{data.name}</span>}</div>
					<div>Email: {editMode ? <input name='email' defaultValue={data.email} /> : <span>{data.email}</span>}</div>
					<div>DOB: {editMode ? <input name='dob' defaultValue={data.dob} /> : <span>{data.dob}</span>}</div>
					<div>Gender: {editMode ? <input name='gender' defaultValue={data.gender} /> : <span>{data.gender}</span>}</div>
					<div>Blood Group: {editMode ? <input name='bloodGroup' defaultValue={data.bloodGroup} /> : <span>{data.bloodGroup}</span>}</div>
					{editMode && <button>Submit</button>}
					{editMode && (
						<button type='button' onClick={() => setEditMode(false)}>
							Cancel
						</button>
					)}
					{!editMode && (
						<button
							type='button'
							onClick={() => {
								setEditMode(true)
								console.log(editMode)
							}}
						>
							Edit
						</button>
					)}
				</form>
			) : (
				<p>Loading...</p>
			)}
			<br />
			reports
			<div>
				<h2>Reports:</h2>
				{reports
					? reports.map((i) => (
						<div key={i.id}>
							<a href={i.url} target='_blank' rel='noreferrer'>
								<img src={i.url} height='50' alt={i.id} />
							</a>
							<div>
								<small>{i.file}</small>
								<br />
								<small>{i.time.toDate().toISOString().split('T')[0]}</small>
							</div>
							<br />
						</div>
					))
					: 'Loading...'}
			</div>
			<br />
			<p>Upload report: </p>
			<form onSubmit={upload}>
				{
					<input
						type='file'
						accept='image/*,.pdf'
						onChange={(e) => {
							setNewUpload(e.target.files[0])
						}}
					/>
				}

				{newUpload && (
					<div className='input-group'>
						<input id='filename' className='form-control' defaultValue={newUpload ? newUpload.name : ''} />
						<button className='btn btn-primary'>Upload</button>
					</div>
				)}
			</form> */}


			<nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0056b3", height: "60px" }}>
				<div className="container-fluid">
					<a className="navbar-brand fw-semibold fs-10" href="#">
						<img src="./images/arrow_back.svg" alt="arrow" style={{ marginLeft: "10px", height: "40px", width: "40px" }} />
					</a>
					<a className="navbar-brand fw-semibold fs-10" href="#">
						<img src="./images/login.png" alt="Logo" style={{ height: "40px", width: "40px" }} />
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item mx-4">
								<a className="nav-link mx-2" href="#">Home</a>
							</li>
							<li className="nav-item mx-4">
								<a className="nav-link mx-2" href="#">Reports</a>
							</li>
							<li className="nav-item mx-4">
								<a className="nav-link mx-2" href="#">Medicine</a>
							</li>
							<li className="nav-item mx-4">
								<a className="nav-link mx-2" href="#">Scheduler</a>
							</li>
							<li className="nav-item mx-4">
								<a className="nav-link mx-2" href="#">Help</a>
							</li>
							<li className="nav-item mx-4">
								<a className="nav-link fw-bold mx-2" href="#">
									<img src="./images/login.png" alt="user details" style={{ width: "40px", height: "40px" }} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div style={{ padding: "40px", textAlign: "center" }} className="container">
				<p style={{ marginBottom: "0px", textAlign: "left", fontSize: "23px", width: "100%", fontFamily: 'Nunito', fontWeight: "700" }}>
					<i>Our Web-Application is your all-in-one solution for managing health records,<br />medications, and schedules.
						It ensures that medical information is always organized,<br /> accessible, and secure.<br />
						Whether you're tracking personal health or managing patient care,<br /> our platform simplifies the process, helping you stay informed and on
						top of your health with ease.</i>
				</p>
			</div>
			<div className="container my-4">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
					<div className="col">
						<div className="card h-100 custom-rounded-card">
							<img src="./images/Records.svg" className="card-img-top" alt="Card Image 1" />
							<div className="card-body">
								<p className="card-text" style={{ fontFamily: "Nunito", fontWeight: "700", fontSize: "21px" }}>
									Securely store and<br />access all your medical documents in one place
								</p>
							</div>
							<div className="c-footer" style={{ fontFamily: "Nunito", fontWeight: "700", fontSize: "35px" }}>
								<a href="#" style={{ textDecoration: "none" }}>
									<p style={{ color: "darkblue" }}>Reports <img style={{ width: "45px", height: "45px", margin: "0px" }} src="./images/double_arrow.svg" alt="arrow" /></p>
								</a>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card h-100 custom-rounded-card">
							<img src="./images/medicine_Bottle_code.svg" className="card-img-top" alt="Card Image 2" />
							<div className="card-body">
								<p className="card-text" style={{ fontFamily: "Nunito", fontWeight: "700", fontSize: "20px" }}>
									Track and manage<br />your medications effortlessly
								</p>
							</div>
							<hr style={{ color: "#343a40", height: "2px", width: "100%" }} />
							<div className="c-footer" style={{ fontFamily: 'Nunito', fontWeight: "700", fontSize: "35px" }}>
								<a href="#" style={{ textDecoration: "none" }}>
									<p style={{ color: "darkblue" }}>Medicines <img style={{ width: "45px", height: "45px", margin: "0px" }} src="./images/double_arrow.svg" alt="arrow" /></p>
								</a>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="card h-100 custom-rounded-card">
							<img src="./images/stopwatch.svg" className="card-img-top" alt="Card Image 3" />
							<div className="card-body">
								<p className="card-text" style={{ fontFamily: 'Nunito', fontWeight: "700", fontSize: "20px" }}>
									Stay on schedules with timely reminders for your medications
								</p>
							</div>
							<hr style={{ color: "#343a40", height: "2px", width: "100%" }} />
							<div className="c-footer" style={{ fontFamily: 'Nunito', fontWeight: "700", fontSize: "35px" }}>
								<a href="#" style={{ textDecoration: "none" }}>
									<p style={{ color: "darkblue" }}>Scheduler <img style={{ width: "45px", height: "45px", margin: "0px" }} src="./images/double_arrow.svg" alt="arrow" /></p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script> */}

		</div>
	)
}
export default User
