
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebaseConnection';

import './index.css'

const Cadastro = () => {
    
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');
    const [user, setUser] = useState(false);
    const [userDetail, setUserDetail] = useState([]);

    async function newUser(){
        await createUserWithEmailAndPassword(firebaseAuth, email, passWord)
        .then((value) => {
            toast.success('User cadastrado com sucesso')
            setEmail('');
            setPassword('');
        })
        .catch((error) =>{
           if(error.code === 'auth/weak-password'){
            toast.warn('Digite uma senha com mais de 4 caracteres')
           }
           else if(error.code === 'auth/email-already-in-use'){
            toast.warning('Este Email já esta em uso. \nDigite um diferente');
           }
        });
    }

    async function LoginUser(){
        await signInWithEmailAndPassword(firebaseAuth, email, passWord)
        .then((value)=>{
            toast.success('Logado com sucesso')
            setUserDetail({
                uid: value.user.uid,
                email: value.user.email,
            });
            setUser(true);
            setEmail('');
            setPassword('');
        })
        .catch((error) => {
            if(error.code === 'auth/weak-password'){
                toast.error('Email ou senha invalido.');
               }
               else if(error.code === 'auth/email-already-in-use'){
                toast.error('Este Email não existe');
               }
        });
    }

    async function logOut(){
        await signOut(firebaseAuth)
        .then(() =>{
            toast.info('Log_Out feito com sucesso')
            setUser(false);
            setUserDetail([]);
        })
        .catch((error) =>{
            toast.error('Erro ao deslogar');
            console.log(error)
        });
    }

    useEffect(() => {
        async function checkLogin(){
            onAuthStateChanged(firebaseAuth, (user)=>{
                if(user){
                    console.log(user);
                    setUser(true)
                    setUserDetail({
                        uid: user.uid,
                        email: user.email
                    })
                }else{

                    setUser(false);
                    setUserDetail([]);
                }
            })
        }
        checkLogin();
    }, [])

  return (
    
    <div className='container'>
        <h1>Autenticação de users</h1>


        {(user === false) && (
            <>
            <div className='sign-in'>
                <form action="auth">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Digite um email' />
                    <label>Senha:</label>
                    <input
                        autoComplete='false'
                        type="password"
                        value={passWord}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Informe sua senha' /> 
                </form>
                <div className='cadastro'>
                    <button onClick={newUser}>Cadastrar</button>
                </div>
                <div className='login'>
                    <button onClick={LoginUser}>Log_In</button>
                </div>
            </div> 
            </>
        )}

        { user && (
            <div className='logged'>
                <strong>Seja bem vindo(a), (Você está logado)</strong>
                <span>ID: {userDetail.uid}</span>
                <span>Email: {userDetail.email}</span>
                <div className='sign-out'>
                    <  button onClick={logOut}>Log_Out</button>
                </div>
            </div>

        )}

        
        
    </div>
  )
}

export default Cadastro