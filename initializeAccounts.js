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

// for (let i = 30; i < 40; i++) {
//   firebase.auth().createUserWithEmailAndPassword(`hamakita.crowds+${i}HR@gmail.com`, 'hamakita').then(v => {
//       console.log(`${v.user.email} is successfully authorized.`);
//   }).catch(e => {
//       console.log(`${e.code}: ${e.message}`)
//   })
// }

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
})
const batch = db.batch();
const ref = db.collection('data');

const classUidList = [];
for (let i = 10; i < 40; i++) {
  firebase.auth().signInWithEmailAndPassword(`hamakita.crowds+${i}hr@gmail.com`, 'hamakita')
    .then((userData) => {
      console.log(`success login to ${i}HR.`);
      console.log(userData.user.uid);
      classUidList.push({
        name: i,
        uid: userData.user.uid,
      });
    }).catch((e) => {
      console.log(i + ': ' + e.message)
    });

}

setTimeout(() => {
  const pushData = {};
  for (let i = 0; i < classUidList.length; i++) {
    batch.set(ref.doc(classUidList[i].uid), {
      name: classUidList[i].name.toString() + 'HR',
      name_yomi: classUidList[i].name.toString() + 'HR',
      people: 0,
      waitPerGroup: 1,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }, {
      merge: true,
    });
  }
  batch.commit();
}, 10000);
