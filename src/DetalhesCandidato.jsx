import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';
import "./styles/detalhes.css"
const DetalhesCandidato = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true); // Para gerenciar o carregamento
  const [formData, setFormData] = useState({});
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidato = async () => {
      try {
        const candidatoDoc = doc(db, 'users', id); // Certifique-se que "users" é o nome correto da coleção
        const candidatoData = await getDoc(candidatoDoc);

        if (candidatoData.exists()) {
          const data = candidatoData.data();
          setCandidato(data);
          setFormData(data); // Preenche os dados no formulário
        } else {
          console.error("Candidato não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar candidato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidato();
  }, [db, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveHistory = async () => {
    try {
      // Salva uma cópia dos dados no histórico
      await addDoc(collection(db, 'users_history'), {
        ...formData,
        originalId: id,
        timestamp: new Date(),
      });
      alert('Alterações salvas no histórico!');
      navigate(`/detalhes/${id}`); // Redireciona para a página de detalhes novamente
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
    }
  };

  if (loading) {
    return <p>Carregando dados do candidato...</p>;
  }

  return (
    <div className='containeredit'>
      <h2>Detalhes do Candidato</h2>
      {candidato ? (
        <div className='containerdivlistaeditavel'>
          <form className='formdivlistaeditavel'>
            <div className='containerdivedit'>
              <div className='divlistaeditavel'>
                <label><strong>Nome:</strong></label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  style={{width:"350px", paddingInline:"15px", alignItems:"center"}}
                />
              </div>
              <div className='divlistaeditavel'>
                <label><strong>Endereço:</strong></label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  style={{width:"350px", paddingInline:"15px", alignItems:"center"}}
                />
              </div>

            </div>

            <div className='containerdivedit'>
              <div className='divlistaeditavel'>
                <label><strong>Telefone:</strong></label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className='divlistaeditavel'>
                <label><strong>Email:</strong></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
        
            </div>




            <div className='containerdivedit'>
              <div className='divlistaeditavel'>
                <label><strong>Emprego:</strong></label>
                <input
                  type="text"
                  name="emprego"
                  value={formData.emprego}
                  onChange={handleChange}
                />
              </div>
              <div className='divlistaeditavel'>
                <label><strong>Situação:</strong></label>
                <input
                  type="text"
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                />
              </div>
            </div>














            <div className='divlistaeditavel'>
              <label><strong>Área:</strong></label>
              <input
                type="text"
                name="setor"
                value={formData.setor}
                onChange={handleChange}
              />
            </div>

            {/* Adicione outros campos conforme necessário */}

          </form>

          <button type="button" onClick={handleSaveHistory} className='bttneditar'>Salvar Alterações no Histórico</button>
        </div>
      ) : (
        <p>Candidato não encontrado</p>
      )}
    </div>
  );
};

export default DetalhesCandidato;
