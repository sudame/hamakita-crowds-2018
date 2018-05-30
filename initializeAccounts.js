const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyCDK3a3OEt5DfLa1G63_jdrjWuAEFbKDE0',
  authDomain: 'hamakita-crowds-2018.firebaseapp.com',
  databaseURL: 'https://hamakita-crowds-2018.firebaseio.com',
  projectId: 'hamakita-crowds-2018',
  storageBucket: 'hamakita-crowds-2018.appspot.com',
  messagingSenderId: '1023736634196',
};
firebase.initializeApp(config);

const clubs = [
  {
    name: '書道部',
    name_yomi: 'ショドウブ',
    email: 'calg',
  },
  {
    name: '美術部',
    name_yomi: 'ビジュツブ',
    email: 'art',
  },
  {
    name: '地学部',
    name_yomi: 'チガクブ',
    email: 'geo',
  },
  {
    name: '生物部',
    name_yomi: 'セイブツブ',
    email: 'bio',
  },
  {
    name: '物理部',
    name_yomi: 'ブツリブ',
    email: 'phys',
  },
  {
    name: '数学部',
    name_yomi: 'スウガクブ',
    email: 'math',
  },
  {
    name: '写真部',
    name_yomi: 'シャシンブ',
    email: 'pic',
  },
  {
    name: '漕艇部',
    name_yomi: 'ソウテイブ',
    email: 'boat',
  },
  {
    name: '将棋部',
    name_yomi: 'ショウギブ',
    email: 'jchess',
  },
  {
    name: '軽音部',
    name_yomi: 'ケイオンブ',
    email: 'band',
  },
  {
    name: '茶華道部',
    name_yomi: 'サカドウブ',
    email: 'sakado',
  },
  {
    name: '囲碁部',
    name_yomi: 'イゴブ',
    email: 'go',
  },
];

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});
const col = db.collection('data');

const uids = [];

let i = 0;

const siID = setInterval(() => {
  firebase
    .auth()
    .signInWithEmailAndPassword(`hamakita.crowds+${clubs[i].email}@gmail.com`, 'hamakita')
    .then(v => {
      console.log(`${clubs[i].name} is successfully authorized.`);
      col
        .doc(v.user.uid)
        .set({
          name: clubs[i].name,
          name_yomi: clubs[i].name_yomi,
          people: 0,
          waitPerGroup: 1,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log(`${clubs[i].name}'s data is successfully initialized.`);
        }).then(() => {
          i++;
        });
    })
    .catch(e => {
      console.log(`${e.code}: ${e.message} | ${clubs[i].name}`);
    });
  if (i > clubs.length) clearInterval(siID);
}, 5000);

// const db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true,
// })
// const batch = db.batch();
// const ref = db.collection('data');

// const classUidList = [];
// for (let i = 10; i < 40; i++) {
//   firebase.auth().signInWithEmailAndPassword(`hamakita.crowds+${i}hr@gmail.com`, 'hamakita')
//     .then((userData) => {
//       console.log(`success login to ${i}HR.`);
//       console.log(userData.user.uid);
//       classUidList.push({
//         name: i,
//         uid: userData.user.uid,
//       });
//     }).catch((e) => {
//       console.log(i + ': ' + e.message)
//     });

// }

// setTimeout(() => {
//   const pushData = {};
//   for (let i = 0; i < classUidList.length; i++) {
//     batch.set(ref.doc(classUidList[i].uid), {
//       name: classUidList[i].name.toString() + 'HR',
//       name_yomi: classUidList[i].name.toString() + 'HR',
//       people: 0,
//       waitPerGroup: 1,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     }, {
//       merge: true,
//     });
//   }
//   batch.commit();
// }, 10000);
