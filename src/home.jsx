import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, addDoc, collection } from './firebaseConfig';

import './App.css';
import lapis from "../src/assets/lapis.png";
import envio from "../src/assets/envio.png";
import perfill from "../src/assets/perfill.jpg";
import Cadastrar from './components/cadastrar';

function Home() {
   
    return(
        <div className="container">
            <Cadastrar></Cadastrar>

        </div>
    )
}

export default Home;
