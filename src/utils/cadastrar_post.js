import { addDoc, collection } from "firebase/firestore";
import { fireStoreDB } from "../firebaseConnection";


async function handleAdd (autor, title) {

    // let id = Math.floor(Math.random() * 10000000 + 1);
    // await setDoc(doc(fireStoreDB, "posts", `${ id }`), {
    //   autor: autor,
    //   title: title,
    // })
    // .then( () => {
    //   console.log('dados registrados')
    // })
    // .catch( (error) => {
    //   console.log('gerou erro: ', error);
    // })
    return (
        await addDoc(collection(fireStoreDB, "posts"), {
            autor: autor,
            title: title,
          })
    ) 
  }

  export default handleAdd;