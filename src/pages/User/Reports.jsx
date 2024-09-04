import { useEffect, useRef, useState } from 'react'
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
} from '../../fb'
import './css/report.css'

function UserReports({ userId }) {
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()
	const fileInputRef = useRef(null)

	useEffect(() => {
		if (userId) {
			onSnapshot(query(collection(firestore, 'users', userId, 'reports'), orderBy('date')), (snap) => {
				setReports(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [userId])

	async function upload(e) {
		e.preventDefault()

		try {
			const filename = e.target.elements.filename.value

			// initialize an empty doc in reports collection
			const docRef = await addDoc(collection(firestore, 'users', userId, 'reports'), {})

			console.log(docRef)

			// upload pdf to fb storage
			const fileRef = ref(storage, docRef.id)
			await uploadBytes(fileRef, newUpload)

			// update the doc in firestore
			await updateDoc(doc(firestore, 'users', userId, 'reports', docRef.id), {
				file: filename,
				url: await getDownloadURL(fileRef),
				date: new Date()
			})

			setNewUpload(null)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='container content'>
				<div className='row'>
					<div className='col-md-3'>
						<div className='card  text-center'>
							<form onSubmit={upload}>
								{!newUpload && (
									<button
										type='button'
										className='border-0'
										style={{ backgroundColor: 'transparent' }}
										onClick={() => {
											fileInputRef.current.click()
										}}
									>
										<i className='bi bi-plus-circle' style={{ fontSize: '10em' }}></i>
										<input
											type='file'
											accept='image/*,.pdf'
											onChange={(e) => {
												setNewUpload(e.target.files[0])
											}}
											className='d-none'
											ref={fileInputRef}
										/>
										<p>Add report</p>
									</button>
								)}
								{newUpload && (
									<div className='m-3'>
										<button type='button' className='border-0' style={{ backgroundColor: 'transparent' }}>
											<i className='bi bi-filetype-pdf' style={{ fontSize: '10em' }}></i>
										</button>
										<button className='border-0' style={{ backgroundColor: 'transparent' }}>
											<i className='bi bi-file-earmark-arrow-up' style={{ fontSize: '10em' }}></i>
										</button>
										<div className='input-group '>
											<input id='filename' className='form-control' defaultValue={newUpload ? newUpload.name : ''} />
											<button className='btn btn-primary'>Upload</button>
										</div>
									</div>
								)}
							</form>
						</div>
					</div>

					{reports
						? reports.map((i) => (
								<div className='col-md-3' key={i.id}>
									<div className='card1'>
										<a href={i.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
											<img src='/images/pdf.png' className='card-img-top' alt='Medical Report 2' />
											<div className='card-body'>
												<h5 className='card-title'>{i.file}</h5>
												<small>{i.date.toDate().toLocaleDateString('en-CA')}</small>
											</div>
										</a>
									</div>
								</div>
						  ))
						: 'Loading...'}
				</div>
			</div>
		</>
	)
}

export default UserReports
