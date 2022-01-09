import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiBKKEa3JSPcnonU7b7TT6olFkoJc-pYg",
  authDomain: "formlogin-9d5f0.firebaseapp.com",
  projectId: "formlogin-9d5f0",
  storageBucket: "formlogin-9d5f0.appspot.com",
  messagingSenderId: "991527864170",
  appId: "1:991527864170:web:ace6a67041790f6f8dc713"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;

/*function validate_email(email){
    expression = /^[^@]+@\w+(\.\W+)+\w$/
    if (expression.test(email) == true){
        return true
    }else{
        return false
    }

}

function validate_password(password){
    if(password < 6){
        return false
    }else{
        return true
    }
}
function validate_field(field){
    if(field == null){
    return false
    }
    if(field.length <=0){
        return false
    }else{
        return true
    }
    
}*/





document.getElementById("reg-btn").addEventListener('click', function(){
    document.getElementById("register-div").style.display ="block";
    document.getElementById("login-div").style.display ="none";
});

document.getElementById('log-btn').addEventListener('click', function(){
    document.getElementById("register-div").style.display ="none";
    document.getElementById("login-div").style.display ="inline";
});

document.getElementById('register-btn').addEventListener('click', function(){
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password =document.getElementById('register-password').value;

 /*   if(validate_field(name) == false || validate_email(email) == false || validate_password(password) == false){
        alert(errorMessage)
        return
    }*/



    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      set(ref(database, 'users/' + user.uid),{
        name: name,
        email: email
    })
    document.getElementById('footer').style.display = 'inline';
    document.getElementById('login-div').style.display = 'none';
    document.getElementById('result').innerHTML ='User created!';

    window.open('form.html',"_self")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  




})

document.getElementById('login-btn').addEventListener('click', function(){
    const email = document.getElementById('login-email').value;
    const password =document.getElementById('login-password').value;
    

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const dt = new Date();
    update(ref(database, 'users/' + user.uid),{
            last_login: dt,
            email: email
    

    })
    
    document.getElementById('result').innerHTML ='User logged in!';

    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

})
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('register-div').style.display = 'none';
        document.getElementById('login-div').style.display = 'none';
        window.open('form.html',"_self")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
   /*     document.getElementById('result-box').style.display = 'none';
        document.getElementById('login-div').style.display = 'inline';*/
    // Sign-out successful.
        // User is signed out
        // ...
    }
});



/*document.getElementById('log-out-btn').addEventListener('click', function(){

    signOut(auth).then(() => {
        
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('result').innerHTML = errorMessage
    // An error happened.
  })
})
*/
