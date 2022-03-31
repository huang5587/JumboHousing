import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, getDocs,
  query, where, orderBy, serverTimestamp




} from 'firebase/firestore'
import { 
   getAuth, createUserWithEmailAndPassword,
   signOut, signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDQMBIbRCNOZFQpY2QEH5sdtDPxGa--vAU",
  authDomain: "jumbohousing-5a879.firebaseapp.com",
  projectId: "jumbohousing-5a879",
  storageBucket: "jumbohousing-5a879.appspot.com",
  messagingSenderId: "78217098321",
  appId: "1:78217098321:web:60e115a1c8fc9463a3b470",
  measurementId: "G-DHP2M7CD3M"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()



// collection ref
const colRef = collection(db, 'Houses')

//queries
const q = query(colRef,where("rent", "<", 500))

// realtime get collection data
onSnapshot(colRef, (snapshot) =>{
    let houses = []
    snapshot.docs.forEach((doc) => {
      houses.push({ ...doc.data(), id: doc.id })
    })
    console.log(houses)
})

//finds houses where that mactch query q
onSnapshot(q, (snapshot) =>{
  let houses = []
  snapshot.docs.forEach((doc) => {
    houses.push({ ...doc.data(), id: doc.id })
  })
  console.log(houses)
})

// getDocs(colRef)
//   .then(snapshot => {
//      let houses = []
//      snapshot.docs.forEach((doc) => {
//        houses.push({ ...doc.data(), id: doc.id })
//      })
//      console.log(houses)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })


// adding books
//stores form to var, 
const addHouseForm = document.querySelector('.add')
//creates event listerner object 
addHouseForm.addEventListener('submit', (e) =>{
  e.preventDefault()

  addDoc(colRef, {
    address: addHouseForm.address.value, 
    rent: addHouseForm.rent.value,
    postalcode: addHouseForm.postalcode.value,
    createdAt: serverTimestamp()
  })
  //resets form after addition 
  .then(() => {
    addHouseForm.reset()
  })
})

//deleting books
const deleteHouseForm = document.querySelector('.delete')
deleteHouseForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Houses', deleteHouseForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteHouseForm.reset()
    })
})


//sign up new user
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) =>{
  e.preventDefault()

  createUserWithEmailAndPassword(auth, signupForm.email.value, signupForm.password.value)
    .then((cred)=>{
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(() => {
      console.log(err.message)
    })
})

//logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', ()=>{
  signOut(auth)
    .then(()=>{
      console.log('the user signed out')
    })
    .catch((err)=>{
      console.log(err.message)
    })
})

//logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e)=> {
  e.preventDefault()

  signInWithEmailAndPassword(auth,loginForm.email.value, loginForm.password.value)
    .then((cred) => {
      console.log('user logged in', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })
})