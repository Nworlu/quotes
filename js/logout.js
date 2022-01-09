

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


document.getElementById('log-out-btn').addEventListener('click', function(){

    signOut(auth).then(() => {
        document.getElementById('footer').style.display = 'none';
        window.open('index.html','_self')
        
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('result').innerHTML = errorMessage
    // An error happened.
  })
})



fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes15.p.rapidapi.com",
		"x-rapidapi-key": "2febfc0067msh4a4fa7409c08925p15427bjsn43cb982f7edf"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);

    document.getElementById('quote').innerHTML = response.content
    document.getElementById('author').innerHTML = response.originator.name
})
.catch(err => {
	console.error(err);
});
/*function () {
    var image = document.createElement('img');
    var div = document.getElementById('gen-quot');
    image.src = "https://cdn2.thecatapi.com/images/be6.gif"
    image.width = "250"
    div.appendChild(image);
}*/
