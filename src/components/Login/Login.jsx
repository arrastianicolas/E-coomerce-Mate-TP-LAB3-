import NavBarLanding from "../Navs/NavBarLanding";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const changeEmailHandler = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
  };

  const changePasswordHandler = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (emailRef.current.value.length === 0) {
      emailRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
        password: false,
      }));
      return;
    }

    if (password.length === 0) {
      passwordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
        email: false,
      }));
      return;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: false,
      password: false,
    }));

    console.log(`Usuario ${email} ha iniciado sesión.`);

    navigate("/home");
  };

  return (
    <>
      <NavBarLanding />
      <div className="login-container">
        <Card className="content-login">
          <Card.Body>
            <Row>
              <h5>INICIE SESION</h5>
            </Row>
            <hr />
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-4">
                <label>Email:</label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  className={errors.email ? "border border-danger" : ""}
                  onChange={changeEmailHandler}
                  placeholder="Ingresar email"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <label>Password:</label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  value={password}
                  className={errors.password ? "border border-danger" : ""}
                  onChange={changePasswordHandler}
                  placeholder="Ingresar contraseña"
                />
              </FormGroup>
              <label>¿No tenes una cuenta? Registrate</label>
              <hr />
              <Row>
                <Col />
                <div>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="btnLogIn" type="sumbit">
                      Iniciar sesión
                    </Button>
                  </Col>
                </div>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;