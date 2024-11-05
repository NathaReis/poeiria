const collectionName = "poeiria";
const hashUID = "XkqfSqDQado4b8XzAAT0";

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

async function hash() {
  const str = new Date().toISOString()
  const hash = [];
  for(let i = 0;i < str.length; i++) {
      hash.push(str.charCodeAt(i));
  }
  await firebase.firestore().collection(collectionName).doc(hashUID).update({
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

function formatedError(error) {
  switch(error.code) {
    case 'auth/invalid-login-credentials':
      throw 'Credenciais inválidas';

    case 'auth/user-not-found':
      throw 'Usuário não encontrado';

    case 'auth/weak-password':
      throw 'Senha muito fraca';

    case 'auth/invalid-email':
      throw 'Email inválido';

    case 'permission-denied':
      throw 'Permissão negada';

    case 'not-found':
      throw 'Documento não encontrado';

    case 'invalid-argument':
      throw 'Argumento inválido';

    case 'function-not-found':
      throw 'Função não encontrada';

    case 'permission-denied':
      throw 'Permissão negada';

    case 'timeout':
      throw 'Tempo limite excedido';

    case 'auth/password-does-not-meet-requirements':
      throw 'Requerido 6 dígitos e no mínimo um caractere: maiúsculo, minúsculo, numérico e especial'

    default:
      throw error;
  }
}

const Poeiria = {
    getAll: async (recycled=false) => {
      try {
        const hashLocal = localStorage.getItem("hash");
        const local = JSON.parse(localStorage.getItem("registers"));
        let docs = [];
        let hash = (await firebase.firestore().collection(collectionName).doc(hashUID).get()).data().hash;
        if(local && hash === hashLocal) {
          docs = local;
        }
        else {
          const snapshot = await firebase.firestore().collection(collectionName).orderBy('title', 'asc').get();
          docs = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
        }

        localStorage.setItem("hash", hash);
        localStorage.setItem("registers",JSON.stringify(docs));
        
        const readDoc = [];
        const deletedDoc = [];
        for(let doc of docs) {
          if(doc.deletedAt == null) {
            readDoc.push(doc);
          }
          else {
            const myUID = await Poeiria.getMyUID();
            if(doc.createdBy === myUID) {
              deletedDoc.push(doc);
            }
          }
        }
        return recycled ? deletedDoc : readDoc;
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
        await firebase.auth().sendPasswordResetEmail(email);
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
            resolve(user ? user.uid : '');
        })
      })
    },
    loginG: async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        location = "../home/index.html";
      }
      catch (error) {
        throw formatedError(error);
      }
    }
}