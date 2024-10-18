import { fire }  from "./firebase-init.js";

const collectionName = "poeiria";
const collectionPoeiria = fire.collection(fire.db, collectionName); // Create a collection reference

const Poeiria = {
    getAll: async () => {
        try {
          const snapshot = await fire.getDocs(collectionPoeiria);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          return error;
        }
    },
    addDoc: async (data) => {
      try {
        return await fire.addDoc(collectionPoeiria, data);
      } catch (error) {
        return error;
      }
    },
    setDoc: async (docId, newData) => {
      try {
        const docRef = fire.doc(fire.db, collectionName, docId);
        return await fire.setDoc(docRef, newData);
      } catch (error) {
        return error;
      }
    },
    deleteDoc: async (docId, newData) => {
      try {
        const docRef = fire.doc(fire.db, collectionName, docId);
        return await fire.deleteDoc(docRef);
      } catch (error) {
        return error;
      }
    },
}
window.Poeiria = Poeiria;