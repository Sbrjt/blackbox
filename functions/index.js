import { https } from 'firebase-functions'
import admin from 'firebase-admin'

const app = admin.initializeApp()
const firestore = admin.firestore(app)

const f = https.onCall((data, context) => {
	return 'Hello world!'
})

export { f }
