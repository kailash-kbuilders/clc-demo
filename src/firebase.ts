import { initializeApp } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

/* =======================================================================
   PASTE YOUR FIREBASE CONFIG HERE
   Firebase console -> Project settings -> Your apps -> Web app -> Config
   (You can also set these as Vercel environment variables instead -
    see README. Env vars win over the values below.)
   ======================================================================= */
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}
/* ======================================================================= */

/** The admin login email. Create exactly this user in Firebase Authentication. */
export const ADMIN_EMAIL = 'admin@clcbarmer.com'

/**
 * Firebase requires a password of 6+ characters, but the institute only types a
 * short PIN. This prefix is added automatically before the password is sent to
 * Firebase, so nothing short has to be stored anywhere.
 *
 *   Firebase password  =  ADMIN_PASSWORD_PREFIX + what you type at /admin
 *   Example            =  'clc' + '2026'  ->  'clc2026'
 *
 * So create the Firebase user with password `clc2026`, and at the login box just
 * type `2026`.
 */
export const ADMIN_PASSWORD_PREFIX = 'clc'

const env: Record<string, string | undefined> = (import.meta as { env?: Record<string, string> }).env || {}
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
}

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId)

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

if (isFirebaseConfigured) {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

export { app, auth, db, storage }
