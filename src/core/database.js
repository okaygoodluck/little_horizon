import { db, auth, isMock } from './firebaseConfig';
import { collection, doc, setDoc, getDoc, getDocs, query, where, addDoc } from 'firebase/firestore';

// Coleções
const USERS_COLLECTION = 'Users';
const CHILDREN_COLLECTION = 'Children';

// Mocks simulados na memória
let mockChildren = [];

// Funções de Usuário (Responsável)
export async function createUserProfile(uid, email, name) {
  if (isMock) {
    console.log("[MOCK] Criando perfil de usuário", { uid, email, name });
    return true;
  }
  
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(userRef, {
      uid,
      email,
      name,
      subscription_tier: 'free',
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Erro ao criar perfil de usuário: ", error);
    throw error;
  }
}

export async function getUserProfile(uid) {
  if (isMock) {
    console.log("[MOCK] Buscando perfil", uid);
    return { uid, name: 'Parent User Mock', subscription_tier: 'free' };
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar perfil: ", error);
    throw error;
  }
}

// Funções da Criança
export async function createChildProfile(childData) {
  if (isMock) {
    console.log("[MOCK] Criando perfil da criança", childData);
    const id = Date.now().toString();
    mockChildren.push({ id, ...childData, parentId: 'mock-uid' });
    return id;
  }

  try {
    const parentId = auth.currentUser?.uid;
    if (!parentId) throw new Error("Usuário não está autenticado");

    const childrenRef = collection(db, CHILDREN_COLLECTION);
    const docRef = await addDoc(childrenRef, {
      ...childData,
      parentId,
      createdAt: new Date().toISOString(),
      development_index: 0
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar perfil da criança: ", error);
    throw error;
  }
}

export async function getChildrenByParent(parentId) {
  if (isMock) {
    return mockChildren;
  }

  try {
    const childrenRef = collection(db, CHILDREN_COLLECTION);
    const q = query(childrenRef, where("parentId", "==", parentId));
    const querySnapshot = await getDocs(q);
    
    const children = [];
    querySnapshot.forEach((doc) => {
      children.push({ id: doc.id, ...doc.data() });
    });
    return children;
  } catch (error) {
    console.error("Erro ao buscar crianças: ", error);
    throw error;
  }
}
