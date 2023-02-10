

import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { fireStoreDB } from '../../firebaseConnection';
import handleAdd from '../../utils/cadastrar_post';
import excluirPost from '../../utils/delete_post';
import editarPost from '../../utils/editar_post';

import './index.css'

const Home = () => {
    const [title, setTitle] = useState('');
    const [autor, setAutor] = useState('');
    const [posts, setPosts] = useState([]);
    const [idPost, setIdPost] = useState('');
  
    
  
    useEffect(() => {
      async function loadPosts(){
        // eslint-disable-next-line no-unused-vars
        const unsub = onSnapshot(collection(fireStoreDB, 'posts'), 
        (snapshot) => {
          let listaPost = [];
  
          snapshot.forEach((doc) => {
            listaPost.push({
              id: doc.id,
              title: doc.data().title,
              autor: doc.data().autor, 
            })
          })
          setPosts(listaPost);
        })
      }
      loadPosts();
    }, [])
  
    return (
        <div className='container'>
          <h1>Posts Collections</h1>
          <div className='autor-title'>
  
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
            <button 
              onClick={() => 
                handleAdd(autor, title)
                  .then(() => {console.log('dados registrados');
                    setAutor('');
                    setTitle('');
                  })
                  .catch((error) => {
                    alert('Erro ao criar post' + error);
                  })
              }>
              Cadastrar
            </button> 
          </div>
         
          <div className='edit-post'>
            <label>Id do Post:</label>
            <input 
              placeholder='Digite o id do post para editar ele'
              value={idPost}
              onChange={ (e) => setIdPost(e.target.value)}
            /> 
            <button 
              onClick={() => editarPost(title, autor, idPost)
                .then(()=>{
                  alert('Post atualizado');
                  setAutor(''); 
                  setTitle('');
                  setIdPost('');
                })
                .catch((error)=>{
                  console.log('erro: ', error);
                })
              }>
              Editar post
            </button>
          </div>
          
          <div className='list-posts'>
            <ul>
              {posts.map((post) => {
                return(
                    <div className='detail-post' key={post.id}>
                      <li id='id-post'>ID do post: {post.id}</li>
                      <li> <p>Titulo: {post.title} </p></li> 
                      <li>Autor: {post.autor}</li>  
                      
                      <center>
                        <button 
                          onClick={() => excluirPost(post.id)
                            .then(() => {
                                console.log('post deletado')
                              })
                            .catch((error) => {
                                alert('Erro ao excluir:', error)
                              })
                          }>
                          Delete
                        </button>  
                      </center>
                    </div>
                )
              })}
            </ul>
          </div>
          
        </div>
    );
  }


export default Home