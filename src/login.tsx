// LoginComponent.jsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Para navegação após login
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Inicializando o hook de navegação

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const auth = getAuth();
    try {
      // Fazendo login com o Firebase Authentication
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Se o login for bem-sucedido, redireciona para a página principal (ou qualquer página que deseje)
      navigate('/home');
    } catch (error) {
      console.error('Erro de login:', error.message);
      alert('Falha no login. Verifique suas credenciais.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="containerlogin">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="my-4">Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form className="form-login">
                <BootstrapForm.Group controlId="formEmail">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field name="email" type="email" as={BootstrapForm.Control} />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPassword">
                  <BootstrapForm.Label>Senha</BootstrapForm.Label>
                  <Field name="password" type="password" as={BootstrapForm.Control} />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <Button type="submit" disabled={isSubmitting} className="mt-3">
                  {isSubmitting ? 'Entrando...' : 'Login'}
                </Button>

                {/* Botão para redirecionar para a página de cadastro */}
                <Button
                  variant="link"
                  onClick={() => navigate('/cadastrar')}
                  className="mt-3"
                >
                  Não tem uma conta? Cadastre-se
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
