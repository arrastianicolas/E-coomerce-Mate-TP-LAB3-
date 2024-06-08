import NavBarLanding from "../Navs/NavBarLanding";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    user : false,
  });
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userRef = useRef(null);

  //-----HANDLER-----
  const changeEmailHandler = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
  };

  const changeUserHandler = (event) => {
    const inputUser = event.target.value;
    setUser(inputUser);
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
        user: false,
      }));
      return;
    }

    if (password.length === 0) {
      passwordRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
        email: false,
        user: false,
      }));
      return;
    }
    
    //-----SET-ERRORS-----
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: false,
      password: false,
      user: false,
    }));

    console.log(`Usuario ${email} ha iniciado sesión.`);

    navigate("/");
  };
    //-----FORM-----
  return (
    <>
      <NavBarLanding />
      <div className="login-container">
        <Card className="content-login">
          <Card.Body>
            <Row>
              <h5>REGISTRATE</h5>
            </Row>
            <hr/>
            <Form onSubmit={submitHandler}>

                <FormGroup className="mb-4">
                    <Form.label>Usuario</Form.label>
                    <Form.Control
                    ref={userRef}
                    type="user"
                    className={errors.user ? "border border-danger" : ""}
                    onChange={changeUserHandler}
                    placeholder="Ingresar usuario"
                    />
                </FormGroup>

                <FormGroup className="mb-4">
                    <Form.label>Email:</Form.label>
                    <Form.Control
                    ref={emailRef}
                    type="email"
                    className={errors.email ? "border border-danger" : ""}
                    onChange={changeEmailHandler}
                    placeholder="Ingresar email"
                    />
                </FormGroup>

                <FormGroup className="mb-4">
                    <Form.label>Password:</Form.label>
                    <Form.Control
                    ref={passwordRef}
                    type="password"
                    value={password}
                    className={errors.password ? "border border-danger" : ""}
                    onChange={changePasswordHandler}
                    placeholder="Ingresar contraseña"
                    />
                </FormGroup>
              <hr />
              <Row>
                <Col />
                <div>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="btnLogIn">Iniciar sesión</Button>
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
