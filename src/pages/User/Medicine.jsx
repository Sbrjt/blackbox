import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, collection, setDoc, onSnapshot, orderBy, query } from '../../fb'

function Medicine({ userId }) {
	const [patient, setPatient] = useState()

	// async function getPatient(id) {
	// 	try {
	// 		let snap = await getDoc(doc(firestore, 'users', id))
	// 		setPatient({ ...snap.data(), id: id.value })

	// 		// snap = await getDoc(doc(firestore, 'hospitals', hospitalId, 'users', id))
	// 		// setPatient({ ...patient, ...snap })
	// 	} catch (err) {
	// 		alert('Patient not found!')
	// 		console.log(err)
	// 	}
	// }

	// useEffect(() => {
	// 	if (hospitalId) {
	// 		const id = new URLSearchParams(window.location.search).get('id')
	// 		getPatient(id)
	// 	}
	// }, [hospitalId])

	return (
		// <div className=' bg-light '>
		// 	<div className='container px-4 py-5'>
		// 		<h2 className='pb-2 border-bottom'>Patient details</h2>

		// 		<div className='row g-5 py-5 gap-4 '>
		// 			<div className='col bg-white rounded-4 p-5 card'>
		// 				<div className=' text-center'>
		// 					<img src='/images/avatar.svg' className='img-fluid' alt='...' />
		// 					<h2 className='card-title mt-3 mb-0'>{patient?.name}</h2>
		// 				</div>
		// 				{/* <p className='text-body-secondary mb-0'>abc</p>
		// 				 */}
		// 			</div>

		// 			<div className='col-9 bg-white rounded-4 p-5 card'>
		// 				<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4'>
		// 					{patient &&
		// 						Object.entries(patient).map(([key, value]) => (
		// 							<div key={key} className='col'>
		// 								<p className='text-muted mb-2'>{key}</p>
		// 								<h4 className='fw-semibold text-body-emphasis'>{value}</h4>
		// 							</div>
		// 						))}
		// 				</div>
		// 			</div>
		// 		</div>

		// 		<div className='bg-white rounded-4 py-5 card'>
		// 			<div className=' text-center'>
		// 				<img src='/images/avatar.svg' className='img-fluid' alt='...' />
		// 				<h2 className='card-title mt-3 mb-0'>{patient?.name}</h2>
		// 			</div>
		// 			{/* <p className='text-body-secondary mb-0'>abc</p>
		// 			 */}
		// 		</div>
		// 	</div>
		// </div>
		<>dksfhk</>
	)
}

export default Medicine
