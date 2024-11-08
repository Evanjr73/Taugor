import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebaseConfig';

const Lista = () => {
  const [candidatos, setCandidatos] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCandidatos = async () => {
      const candidatosCollection = collection(db, 'users');
      const candidatosSnapshot = await getDocs(candidatosCollection);
      const candidatosList = candidatosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCandidatos(candidatosList);
    };

    fetchCandidatos();
  }, [db]);

  return (
    <div>
      <h2>Lista de Candidatos</h2>
      {candidatos.length > 0 ? (
        <ul >
          {candidatos.map(users => (
            <li key={users.id}>
              <br />
              <span
                style={{ cursor: 'pointer', color: 'black',  }}
                onClick={() => navigate(`/users/${users.id}`)}
              >
                {users.nome} ,EMPREGO: {users.emprego}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum users encontrado</p>
      )}
    </div>
  );
};

export default Lista;
