import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import Cadastro from './components/Cadastro';




function App() {
  
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />

      <h1>React + Firebase</h1>
      
      < Cadastro />
      < Home /> 
      
    </div>
    
  );
}

export default App;
