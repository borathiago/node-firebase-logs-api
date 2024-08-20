import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { env } from '../../../core/env/env'

const firebaseConfig = {
    apiKey: env?.APIKEY,
    authDomain: env?.AUTHDOMAIN,
    projectId: env?.PROJECTID,
    storageBucket: env?.STORAGEBUCKET,
    messagingSenderId: env?.MESSAGESENDERID,
    appId: env?.APPID
}

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export { database }