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
// import '../css/UserProfile.css'

function UserReports() {
	const [id, setId] = useState()
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'reports'), orderBy('date')), (snap) => {
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
		const filename = e.target.elements.filename.value

		// initialize an empty doc in reports collection
		const docRef = await addDoc(collection(firestore, 'users', id, 'reports'), {})

		// upload pdf to fb storage
		const fileRef = ref(storage, docRef.id)
		await uploadBytes(fileRef, newUpload)

		// also keep track in firestore
		await updateDoc(doc(firestore, 'users', id, 'reports', docRef.id), {
			file: filename,
			url: await getDownloadURL(fileRef),
			date: new Date()
		})

		setNewUpload(null)
	}

	return (
		<>
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
									<small>{i.date.toDate().toLocaleDateString('en-CA')}</small>
								</div>
								<br />
							</div>
					  ))
					: 'Loading...'}
			</div>
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
		</>
	)
}

export default UserReports
