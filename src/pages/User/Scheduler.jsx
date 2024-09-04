import { useEffect, useState } from 'react'
import './css/scheduler.css'
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

import data from '../../data'

function Scheduler() {
	const [id, setId] = useState()
	const [schedule, setSchedule] = useState([])

	const [showPrescribedPill, setShowPrescribedPill] = useState(false)
	const [medicines, setMedicines] = useState([])

	// const [showOtc, setShowOtc] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'medicines')), (snap) => {
					setMedicines(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'schedule'), orderBy('time')), (snap) => {
					setSchedule(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
			}
		})
	}, [])

	async function addScheduleFromPres(e) {
		e.preventDefault()
		const elements = e.target.elements

		for (let i of elements) {
			if (i.tagName === 'INPUT' && i.value) {
				try {
					await updateDoc(doc(firestore, 'users', id, 'medicines', i.getAttribute('data-id')), { time: i.value })
				} catch (error) {
					console.log(error)
				}
			}
		}

		setShowPrescribedPill(false)
	}

	// async function addScheduleFromOtc(e) {
	// 	e.preventDefault()
	// 	const { drug, time } = e.target.elements

	// 	await addDoc(
	// 		collection(firestore, 'users', id, 'medicines'),

	// 		{ drug: drug.value, time: time.value }
	// 	)

	// 	setShowOtc(false)
	// }

	// converts 24-hr time format to 12-hr
	function formatTime(t) {
		const [hr, min] = t.split(':')
		return (parseInt(hr) % 12 || 12) + ':' + min + (hr < 12 ? ' AM' : ' PM')
	}

	return (
		<>
			<button
				onClick={() => {
					setShowPrescribedPill(true)
					// setShowOtc(false)
				}}
				className='btn btn-primary'
			>
				Show prescribed pills
			</button>
			{/* <button
				onClick={() => {
					setShowOtc(true)
					setShowPrescribedPill(false)
				}}
				className='btn btn-primary'
			>
				Add OTC
			</button> */}
			{showPrescribedPill && (
				<form onSubmit={addScheduleFromPres}>
					{medicines?.map(
						(i) =>
							i.dosage === 'Daily' && (
								<div key={i.id}>
									<span>{i.drug} </span>
									<input data-id={i.id} type='time' />
								</div>
							)
					)}
					<button>Submit</button>
					<button
						onClick={() => {
							setShowPrescribedPill(false)
						}}
						type='button'
					>
						Cancel
					</button>
				</form>
			)}
			{/* {showOtc && (
				<form onSubmit={addScheduleFromOtc}>
					<input list='drugs' name='drug' placeholder='Medicine' />
					<input type='time' name='time' />
					<datalist id='drugs'>
						{data?.map((i) => (
							<option value={i} key={i} />
						))}
					</datalist>
					<br />
					<button>Submit</button>
					<button
						type='button'
						onClick={() => {
							setShowOtc()
						}}
					>
						Cancel
					</button>
				</form>
			)} */}
			<div className='mainBody'>
				<ul className='list'>
					<li
						style={{
							display: 'inline-block',
							position: 'relative',
							left: '8vw'
						}}
					>
						<div className='liItem'>
							<img src='bellIcon.svg' className='bellIcon' />
							<p className='patientName'>Patient Name</p>
							<p className='medicineName'>Medicine Name</p>
							<p className='ammount'>Ammount</p>
							<p className='time'>Time</p>
						</div>
					</li>
					<li
						style={{
							display: 'inline-block',
							position: 'relative',
							left: '8vw'
						}}
					>
						{medicines
							? medicines.map(
									(i) =>
										i.time && (
											<div className='liItem' key={i.id}>
												<img src='bellIcon.svg' className='bellIcon' />
												<p className='patientName'>Patient Name</p>
												<p className='medicineName'>{i.drug}</p>
												<p className='ammount'>Ammount</p>
												<p className='time'>{formatTime(i.time)}</p>
											</div>
										)
							  )
							: 'Loading...'}
					</li>
				</ul>
			</div>
		</>
	)
}

export default Scheduler
