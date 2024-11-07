import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, addDoc, collection } from './firebaseConfig';

import './App.css';
import lapis from "../src/assets/lapis.png";
import envio from "../src/assets/envio.png";
import perfill from "../src/assets/perfill.jpg";

function Home() {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        emprego: '',
        endereco: '',
        telefone: '',
        email: '',
        imagem: '',
        nacionalidade: '',
        datadenascimento: '',
    });

    const [profileImage, setProfileImage] = useState(perfill);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
            setFormData({ ...formData, imagem: file });
        }
    };

    const handleRegister = async () => {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, 'senha123');
            const user = userCredential.user;
            await addDoc(collection(db, 'users'), { uid: user.uid, ...formData });
            generatePDF(formData);
            alert('Usuário registrado e PDF criado com sucesso!');
        } catch (error) {
            console.error("Erro no cadastro: ", error.message);
            alert('Erro ao cadastrar usuário');
        }

    };

    const generatePDF = (data) => {
        const pdf = new jsPDF();
        // Define o tamanho e a fonte
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(40, 40, 40);  // Definindo a cor do texto

        // Desenha um retângulo para o cabeçalho
        pdf.setFillColor(100, 100, 255); // Cor de fundo azul claro
        pdf.rect(10, 10, 190, 20, "F"); // Preenchimento completo do retângulo
        // Cabeçalho

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        // Título em cima do retângulo
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(18);
        pdf.text("Informações do Usuário", 20, 25);
        // Resetando cor e fonte para o conteúdo
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(`Nome: ${data.nome}`, 20, 50);
        pdf.text(`Sobrenome: ${data.sobrenome}`, 20, 60);

        if (data.imagem) {
            pdf.addImage(data.imagem, 'JPEG', 20, 80, 50, 50); // Posição e tamanho
        }
        pdf.text(20, 50, `Nome: ${data.nome}`);
        pdf.text(20, 60, `Sobrenome: ${data.sobrenome}`);
        pdf.text(20, 70, `Emprego: ${data.emprego}`);
        pdf.text(20, 80, `Endereço: ${data.endereco}`);
        pdf.text(20, 90, `email: ${data.email}`);
        pdf.text(20, 100, `data de nascimento: ${data.datadenascimento}`);
        pdf.text(20, 110, `Emprego: ${data.emprego}`);
        pdf.text(20, 120, `Endereço: ${data.profileImage}`);



        pdf.save('informacoes_usuario.pdf');
    };

    return (
        <div className='container'>
            <div className='container2'>
                <div className='fale'>
                    <h3>Fale-nos um pouco sobre você</h3>
                    <p style={{ fontSize: "10px", margin: "0", marginTop: "7px", color: "#871F78" }}>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão</p>
                </div>
                <div className='infbase'>
                    <div className='infbase2'>
                        <h3>Informações de contato</h3>
                        <button style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                            <img src={lapis} alt="" className='lapis' />
                        </button>
                    </div>
                    <div className='infbasecontainer'>
                        <form className='infbaseform'>
                            <div className='containerinput'>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                                <p className='ppequeno'>ex: Tiago</p>
                            </div>
                            <div className="containerinput">
                                <input
                                    type="text"
                                    name="sobrenome"
                                    placeholder="Sobrenome"
                                    value={formData.sobrenome}
                                    onChange={handleChange}
                                />
                                <p className='ppequeno'>ex: Souza</p>
                            </div>
                        </form>
                        <div className='infbaseimage'>
                            <div className="imagemperfil">
                                <img src={profileImage} alt="Foto do perfil" className='fotoperfil' />
                            </div>

                            <form className='infbaseimagebuttons'>
                                <h7>Foto do Perfil</h7>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="inputfile"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <button onClick={(e) => { e.preventDefault(); handleButtonClick(); }} className="upload-btn">
                                    <img src={envio} alt="" className='lapis' />
                                    <p className='pfoto'>Enviar Foto</p>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='empreende'>
                    <div className='containerinputen'>
                        <input
                            type="text"
                            name="emprego"
                            placeholder="Emprego"
                            value={formData.emprego}
                            onChange={handleChange}
                            className='emprego'
                        />
                        <p className='ppequeno'>ex: Vendedor</p>
                    </div>
                    <div className="containerinputen">
                        <input
                            type="text"
                            name="endereco"
                            placeholder="Endereço"
                            value={formData.endereco}
                            className='emprego'
                            onChange={handleChange}
                        />
                        <p className='ppequeno'>ex: Avenida Paulista, 1 2234 - São Paulo - SP - 07010 001</p>
                    </div>
                </div>
                <div className='infor'>
                    <form className='infbaseform'>
                        <div className='containerinput'>
                            <input
                                type="tel"
                                name="telefone"
                                placeholder="Telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                            <p className='ppequeno'>ex: (11) 9 9123-7676</p>
                        </div>
                        <div className="containerinput">
                            <input
                                type="text"
                                name="nacionalidade"
                                placeholder="Nacionalidade"
                                value={formData.nacionalidade}
                                onChange={handleChange}
                            />
                            <p className='ppequeno'>ex: Brasileira</p>
                        </div>
                    </form>
                    <form className='infbaseform'>
                        <div className='containerinput'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <p className='ppequeno'>ex: 123@email.com</p>
                        </div>
                        <div className="containerinput">
                            <input
                                type="date"
                                name="datadenascimento"
                                value={formData.datadenascimento}
                                onChange={handleChange}
                            />
                            <p className='ppequeno'>ex: 23 jun 1985</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='buttonsnavigate'>
                <button className='bttn' onClick={handleRegister}>PROXÍMO</button>
            </div>
        </div>
    );
}

export default Home;
