const collectionName = "poeiria";

firebase.auth().onAuthStateChanged(user =>
{
  const $isLoggedItems = document.querySelectorAll(".isLoggedItems");
  const $isNotLoggedItems = document.querySelectorAll(".isNotLoggedItems");
  const $isMyAccount = document.querySelectorAll(".isMyAccount");
  
  if(!user) {
    $isLoggedItems.forEach((item) => {
      item.classList.add("hidden");
    })
    $isMyAccount.forEach((item) => {
      item.classList.add("hidden");
    })
    $isNotLoggedItems.forEach((item) => {
      item.classList.remove("hidden");
    })
  }
  else {
    $isLoggedItems.forEach((item) => {
      item.classList.remove("hidden");
    })
    $isNotLoggedItems.forEach((item) => {
      item.classList.add("hidden");
    })
  }
})

function formatedError(error) {
  console.error(`Failed: ${error}`);
  return error;
}

async function hash() {
  const str = new Date().toISOString()
  const hash = [];
  for(let i = 0;i < str.length; i++) {
      hash.push(str.charCodeAt(i));
  }
  await firebase.firestore().collection(collectionName).doc("XkqfSqDQado4b8XzAAT0").update({
    hash: hash.join("")
  });
}

async function exe(query) {
  try {
    if(query) {
      const response = await query;
      await hash();
      return response;
    }
    throw error;
  }
  catch (error) {
    throw error;
  }
}

const Poeiria = {
    getAll: async () => {
      try {
        const snapshot = await firebase.firestore().collection(collectionName).orderBy('title', 'asc').get();
        const result = snapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id
        }))
        
        const filter = [];
        result.map(async (doc) => {
          firebase.auth().onAuthStateChanged(user => {
            doc.deletedAt == null 
            ?filter.push(doc)
            :null;
          })
        })
        return filter;
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    getAllRecycle: async () => {
      try {
        const snapshot = await firebase.firestore().collection(collectionName).orderBy('title', 'asc').get();
        const result = snapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id
        }))
        
        const filter = [];
        result.map(async (doc) => {
          firebase.auth().onAuthStateChanged(user => {
            doc.createdBy == user.uid && doc.deletedAt !== null 
            ?filter.push(doc)
            :null;
          })
        })
        return filter;
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    addDoc: async (data) => {
      try {
        return await exe(firebase.firestore().collection(collectionName).add(data));      
      } catch (error) {
        throw formatedError(error);
      }
    },
    getDoc: async () => {
      try {
        const docId = new URLSearchParams(location.search).get('doc');
        const snapshot = await firebase.firestore().collection(collectionName).doc(docId).get();
        const {uid, ...info} = snapshot.data();
        return info;
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    setDoc: async (newData, uid=false) => {
      try {
        const docId = uid ? uid : new URLSearchParams(location.search).get('doc');
        console.log(docId, newData)
        return await exe(firebase.firestore().collection(collectionName).doc(docId).update(newData));
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    recycleDoc: async () => {
      try {
        const docId = new URLSearchParams(location.search).get('doc');
        return await exe(firebase.firestore().collection(collectionName).doc(docId).update({
          deletedAt: new Date().toDateString()
        }));
      } catch (error) {
        throw formatedError(error);
      }
    },
    deleteDoc: async () => {
      try {
        const docId = new URLSearchParams(location.search).get('doc');
        return await exe(firebase.firestore().collection(collectionName).doc(docId).delete());
      } catch (error) {
        throw formatedError(error);
      }
    },
    createUser: async (email, password) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    recoverPassword: async (email) => {
      try {
        await firebase.sendPasswordResetEmail(email);
      }
      catch (error) {
        throw formatedError(error);
      }
    },
    login: async (email, password) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);        
      } catch (error) {
        throw formatedError(error); 
      }
    },
    logout: async () => {
      try {
        await firebase.auth().signOut();        
      } catch (error) {
        throw formatedError(error); 
      }
    },
    getMyUID: () => {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(user => {
          resolve(user.uid);
        })
      })
    }
}