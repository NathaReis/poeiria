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
        throw error;
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
        throw error;
      }
    },
    addDoc: async (data) => {
      try {
        return await firebase.firestore().collection(collectionName).doc().add(data);      
      } catch (error) {
        throw error;
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
        throw error;
      }
    },
    setDoc: async (docId, newData) => {
      try {
        return await firebase.firestore().collection(collectionName).doc(docId).update(newData);
      }
      catch (error) {
        throw error;
      }
    },
    recycleDoc: async () => {
      try {
        const docId = new URLSearchParams(location.search).get('doc');
        return await firebase.firestore().collection(collectionName).doc(docId).update({
          deletedAt: new Date().toDateString()
        });
      } catch (error) {
        throw error;
      }
    },
    // createUser: async (email, password) => {
    //   try {
    //     await fire.createUserWithEmailAndPassword(fire.auth, email, password);
    //   }
    //   catch (error) {
    //     throw error;
    //   }
    // },
    // recoverPassword: async (email) => {
    //   try {
    //     await fire.sendPasswordResetEmail(fire.auth, email);
    //   }
    //   catch (error) {
    //     throw error;
    //   }
    // },
    // login: async (email, password) => {
    //   try {
    //     const userCredential = await fire.signInWithEmailAndPassword(fire.auth, email, password);
    //     return userCredential.user;
    //   }
    //   catch (error) {
    //     throw error;
    //   }
    // },
    // logout: async () => {
    //   try {
    //     await fire.signOut(fire.auth);
    //   }
    //   catch (error) {
    //     alert(error);
    //   }
    // },
    getMyUID: () => {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(user => {
          resolve(user.uid);
        })
      })
    }
}