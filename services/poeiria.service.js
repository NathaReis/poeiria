import { fire }  from "./firebase-init.js";

const collectionName = "poeiria";
const collectionPoeiria = fire.collection(fire.db, collectionName); // Create a collection reference

fire.onAuthStateChanged(fire.auth, (user) => {
  const $isLoggedItems = document.querySelectorAll(".isLoggedItems");
  const $isNotLoggedItems = document.querySelectorAll(".isNotLoggedItems");

  if(!user) {
    $isLoggedItems.forEach((item) => {
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
          const snapshot = await fire.getDocs(collectionPoeiria);
          const allData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Excluir docs com deletedAt mais antigos que 31 dias
          const oldData = allData.filter(d => {
            if(d.deletedAt != null) {
              const newDate = new Date(d.deletedAt);
              const currentDay = newDate.getDate();
              newDate.setDate(currentDay + 30);
              if((newDate) < new Date()) {

                const docRef = fire.doc(fire.db, collectionName, d.id);
                return fire.deleteDoc(docRef);

              }
            }
          })
          await Promise.all(oldData);

          return allData.filter(doc => doc.deletedAt == null);
        } catch (error) {
          throw error;
        }
    },
    getAllRecycle: async () => {
      try {
        const snapshot = await fire.getDocs(collectionPoeiria);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(doc => doc.deletedAt != null);
      } catch (error) {
        throw error;
      }
    },
    addDoc: async (data) => {
      try {
        return await fire.addDoc(collectionPoeiria, data);
      } catch (error) {
        throw error;
      }
    },
    setDoc: async (docId, newData) => {
      try {
        const docRef = fire.doc(fire.db, collectionName, docId);
        return await fire.setDoc(docRef, newData);
      } catch (error) {
        throw error;
      }
    },
    deleteDoc: async (doc) => {
      try {
        const docRef = fire.doc(fire.db, collectionName, doc.id);
        doc['deletedAt'] = new Date().toDateString();
        return await fire.setDoc(docRef, doc);
      } catch (error) {
        throw error;
      }
    },
    createUser: async (email, password) => {
      try {
        await fire.createUserWithEmailAndPassword(fire.auth, email, password);
      }
      catch (error) {
        throw error;
      }
    },
    recoverPassword: async (email) => {
      try {
        await fire.sendPasswordResetEmail(fire.auth, email);
      }
      catch (error) {
        throw error;
      }
    },
    login: async (email, password) => {
      try {
        const userCredential = await fire.signInWithEmailAndPassword(fire.auth, email, password);
        return userCredential.user;
      }
      catch (error) {
        throw error;
      }
    },
    logout: async () => {
      try {
        await fire.signOut(fire.auth);
      }
      catch (error) {
        alert(error);
      }
    },
    getMyUID: () => {
      return new Promise((resolve) => {
        fire.onAuthStateChanged(fire.auth, (user) => {
          resolve(user.uid);
        })
      })
    }
}
window.Poeiria = Poeiria;