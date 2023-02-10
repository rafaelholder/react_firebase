import { doc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "../firebaseConnection";


async function editarPost(title, autor, idPost){
    const docRef = doc(fireStoreDB, "posts", idPost);
    await updateDoc(docRef, {
      title: title,
      autor: autor,
    })
  }

  export default editarPost;