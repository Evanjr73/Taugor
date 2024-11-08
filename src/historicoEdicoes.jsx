import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from './firebaseConfig';

const Historico = () => {
  const { id } = useParams(); 
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true); 
  const db = getFirestore(app);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const historicoRef = collection(db, 'users_history'); 
        const q = query(historicoRef, where('originalId', '==', id));
        const querySnapshot = await getDocs(q);

        const historicoData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistorico(historicoData);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [db, id]);

  if (loading) {
    return <p>Carregando histórico...</p>;
  }

  return (
    <div>
      <h2>Histórico de Edições do Candidato</h2>
      {historico.length > 0 ? (
        <ul>
          {historico.map((registro) => (
            <li key={registro.id}>
              <p><strong>Nome:</strong> {registro.nome}</p>
              <p><strong>Email:</strong> {registro.email}</p>
              <p><strong>Telefone:</strong> {registro.telefone}</p>
              <p><strong>Endereço:</strong> {registro.endereco}</p>
              <p><strong>Emprego:</strong> {registro.emprego}</p>
              <p><strong>Situação:</strong> {registro.situacao}</p>
              <p><strong>Área:</strong> {registro.setor}</p>
              <p><strong>Data da Edição:</strong> {new Date(registro.timestamp.seconds * 1000).toLocaleString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há histórico de edições para este candidato.</p>
      )}
    </div>
  );
};

export default Historico;
