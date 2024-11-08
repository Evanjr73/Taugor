
import React from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './styles/Login.css';

const CadastroComponent = () => {
  const navigate = useNavigate(); 

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
   
      await createUserWithEmailAndPassword(auth, values.email, values.password);
 
      navigate('/');
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      alert('Falha no cadastro. Verifique suas informações e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="containerlogin">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="my-4">Cadastro</h2>
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
                  {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
        
              </Form>
              
            )}
          </Formik>
         
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroComponent;
