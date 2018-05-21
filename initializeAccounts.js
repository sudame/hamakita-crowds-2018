const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyCDK3a3OEt5DfLa1G63_jdrjWuAEFbKDE0",
  authDomain: "hamakita-crowds-2018.firebaseapp.com",
  databaseURL: "https://hamakita-crowds-2018.firebaseio.com",
  projectId: "hamakita-crowds-2018",
  storageBucket: "hamakita-crowds-2018.appspot.com",
  messagingSenderId: "1023736634196"
};
firebase.initializeApp(config);

for (let i = 30; i < 40; i++) {
  firebase.auth().createUserWithEmailAndPassword(`hamakita.crowds+${i}HR@gmail.com`, 'hamakita').then(v => {
      console.log(`${v.user.email} is successfully authorized.`);
  }).catch(e => {
      console.log(`${e.code}: ${e.message}`)
  })
}
