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

			const imgref = ref(storage, filename)

			// upload img to fb storage
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
			<h1>Dashboard</h1>
			<br />
			{/* data */}
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
			{/* reports */}
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
			</form>
		</div>
	)
}

export default User
