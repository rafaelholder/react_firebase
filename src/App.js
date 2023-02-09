import { fireStoreDB } from './firebaseConnection'
import { useState } from 'react';
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';

import './App.css';


function App() {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  

  async function handleAdd () {
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
    await addDoc(collection(fireStoreDB, "posts"), {
      autor: autor,
      title: title,
    })
    .then( () => {
      console.log('dados registrados');
      setAutor('');
      setTitle('');
    })
    .catch( (error) => {
      console.log('gerou erro: ', error);
    });
  }
  
  async function buscarPost(){
    // const postRef = doc(fireStoreDB, "posts", "H8wgxipBEQXIatgYag2T")
    // await getDoc(postRef)
    //   .then((snapshot)=>{
    //     setAutor(snapshot.data().autor);
    //     setTitle(snapshot.data().title);
    //     console.log(autor + title)
    //   })
    //   .catch(()=>{
    //     console.log('error ao buscar')
    //   })

    const postRef = collection(fireStoreDB, "posts")
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          title: doc.data().title,
          autor: doc.data().autor,
        })
      })

      setPosts(lista);

    })
    .catch((error) => {
      console.log('erro ao buscar post:', error)
    })
  }


  return (
    <div className="App">
      <h1>React + Firebase</h1>

      <div className='container'>
        <label>Titulo:</label>
        <textarea 
          type='text'
          value={title}
          placeholder='Digite o titulo' 
          onChange={ (e) => { setTitle(e.target.value); }}
          />
      
        <label>Autor:</label>
        <input 
          type='text' 
          value={autor}
          placeholder='Autor do post'
          onChange={ (e) => { setAutor(e.target.value); }}
          />

        <button onClick={handleAdd}>Cadastrar</button> 
        <button onClick={buscarPost}>Buscar posts</button> 
        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <span>-Titulo: {post.title}</span> <br />
                <span>-Autor: {post.autor}</span> <br /> <br />
              </li>
            )
          })}
        </ul>
      </div>

      
    
    </div>
  );
}

export default App;
