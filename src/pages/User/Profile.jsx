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
} from '../../fb'

function UserProfile({ userId }) {
	const [data, setData] = useState('')
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		if (userId) {
			onSnapshot(doc(firestore, 'users', userId), (snap) => {
				setData({ ...snap.data(), id: snap.id })
			})
		}
	}, [userId])

	async function edit(e) {
		e.preventDefault()

		const { age, father, mother, email, phone, address, dob, gender, weight, height, blood } = e.target.elements

		try {
			await updateDoc(doc(firestore, 'users', userId), {
				age: age.value,
				father: father.value,
				mother: mother.value,
				email: email.value,
				phone: phone.value,
				address: address.value,
				dob: dob.value,
				gender: gender.value,
				weight: weight.value,
				height: height.value,
				blood: blood.value
			})

			setEditMode(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='body'>
				<div id='profileImg'>
					<img src='/images/avatar.svg' id='Img' />
					<div id='name' className='overflow-visible'>
						<h3 className='pInfo overflow-hidden'>
							Name:
							<span className='info'>
								<p className='overflow-hidden'>{data.name}</p>
							</span>
						</h3>
						<br />
						<h3 className='name'>
							Hospital Name:
							<span className='n overflow-hidden'>
								<p className='overflow-hidden'>hospital name</p>
							</span>
						</h3>
					</div>
				</div>
				<form onSubmit={edit}>
					{!editMode && (
						<button
							type='button'
							onClick={() => {
								setEditMode(true)
							}}
						>
							Edit
						</button>
					)}
					{editMode && (
						<>
							<button
								type='button'
								onClick={() => {
									setEditMode(false)
								}}
							>
								Cancel
							</button>
							<button>Submit</button>
						</>
					)}
					<div className='details-container'>
						<div className='personalInformation'>
							<h3 className='pInfo'>
								Patient Id:
								<span className='info'>
									<p className='overflow-hidden'>{data.id}</p>
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Age:
								<span className='info'>
									{editMode ? <input name='age' defaultValue={data.age} /> : <p className='overflow-hidden'>{data.age}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Father's Name:
								<span className='info'>
									{editMode ? <input name='father' defaultValue={data.father} /> : <p className='overflow-hidden'>{data.father}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Mother's Name:
								<span className='info'>
									{editMode ? <input name='mother' defaultValue={data.mother} /> : <p className='overflow-hidden'>{data.mother}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Email Id:
								<span className='info'>
									{editMode ? <input name='email' defaultValue={data.email} /> : <p className='overflow-hidden'>{data.email}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Phone:
								<span className='info'>
									{editMode ? <input name='phone' defaultValue={data.phone} /> : <p className='overflow-hidden'>{data.phone}</p>}
								</span>
							</h3>
							<br />
							<br />
							<h3 className='pInfo'>
								Address:
								<span className='info'>
									{editMode ? <input name='address' defaultValue={data.address} /> : <p className='overflow-hidden'>{data.address}</p>}
								</span>
							</h3>
							<br />
						</div>
						<div className='medicalInformation'>
							<h3 className='pInfo'>
								DOB:
								<span className='info'>
									{editMode ? <input name='dob' defaultValue={data.dob} /> : <p className='overflow-hidden'>{data.dob}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Gender:
								<span className='info'>
									{editMode ? <input name='gender' defaultValue={data.gender} /> : <p className='overflow-hidden'>{data.gender}</p>}
								</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Weight:
								<span className='info'>{editMode ? <input name='weight' defaultValue={data.weight} /> : <p>{data.weight}</p>}</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Height:
								<span className='info'>{editMode ? <input name='height' defaultValue={data.height} /> : <p>{data.height}</p>}</span>
							</h3>
							<br />
							<h3 className='pInfo'>
								Blood Group:
								<span className='info'>{editMode ? <input name='blood' defaultValue={data.blood} /> : <p>{data.blood}</p>}</span>
							</h3>
							<br />
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default UserProfile
