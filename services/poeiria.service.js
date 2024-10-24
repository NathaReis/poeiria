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
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    deleteDoc: async (docId) => {
      try {
        const docRef = fire.doc(fire.db, collectionName, docId);
        return await fire.deleteDoc(docRef);
      } catch (error) {
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
        throw error;
      }
    }
}
window.Poeiria = Poeiria;