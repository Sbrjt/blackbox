import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, collection, setDoc, onSnapshot, orderBy, query } from '../../fb'

function Medicine({ userId }) {
	const [medicines, setMedicines] = useState()

	useEffect(() => {
		if (userId) {
			onSnapshot(query(collection(firestore, 'users', userId, 'medicines')), (snap) => {
				setMedicines(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [userId])

	return <>{console.log(medicines)}</>
}

export default Medicine
