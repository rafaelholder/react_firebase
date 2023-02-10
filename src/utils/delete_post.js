import { deleteDoc, doc } from "firebase/firestore";
import { fireStoreDB } from "../firebaseConnection";

async function excluirPost(id){
    const docRef = doc(fireStoreDB, "posts", id);
    await deleteDoc(docRef) 
}

export default excluirPost;