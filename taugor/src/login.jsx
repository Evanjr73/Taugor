import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import style from "./styles/Loginn.module.css";

const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
            navigate('/home');
        } catch (error) {
            console.error('Erro de login:', error.message);
            alert('Falha no login. Verifique suas credenciais.');
        }
    };

    return (

        <div className={style.container}>

            <div className={style.container2}>
                <form onSubmit={onSubmit}>
                    <div className={style.containerinpupt}>
                        <h3>Email</h3>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className={style.inputt}
                        />
                    </div>
                    <div className={style.containerinpupt}>
                        <h3>Senha</h3>
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className={style.inputt}
                        />
                    </div>
                    <button type="submit" className={style.button}>
                        Login
                    </button>
                </form>

                <button
                    onClick={() => navigate('/cadastrar')}
                    className={`${style.buttonn} mt-3`}
                >
                    Criar conta
                </button>
            </div>
        </div>
    );
};

export default Login;
