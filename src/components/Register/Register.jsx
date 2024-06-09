import NavBarLanding from "../Navs/NavBarLanding";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    user: false,
    userType: false,
  });
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userRef = useRef(null);
  const userTypeRef = useRef(null);

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
  const changeUserTypeHandler = (event) => {
    const selectUsertype = event.target.value;
    setUserType(selectUsertype);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (userRef.current.value.length === 0) {
      userRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        user: true,
        email: false,
        password: false,
      }));
      return;
    }

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

    if (passwordRef.current.value.length === 0) {
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

    console.log(`Usuario ${user} se ha registrado con email ${email}.`);

    navigate("/seller");
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
            <hr />
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-4">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  ref={userRef}
                  value={user}
                  type="text"
                  className={errors.user ? "border border-danger" : ""}
                  onChange={changeUserHandler}
                  placeholder="Ingresar usuario"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  ref={emailRef}
                  value={email}
                  type="email"
                  className={errors.email ? "border border-danger" : ""}
                  onChange={changeEmailHandler}
                  placeholder="Ingresar email"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  value={password}
                  className={errors.password ? "border border-danger" : ""}
                  onChange={changePasswordHandler}
                  placeholder="Ingresar contraseña"
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Label>Quieres Ser...</Form.Label>
                <Form.Select
                  ref={userTypeRef}
                  value={userType}
                  className={errors.userType ? "border border-danger" : ""}
                  onChange={changeUserTypeHandler}
                >
                  <option value="" disabled>
                    Selecciona una opción...
                  </option>
                  <option value="client">Cliente</option>
                  <option value="seller">Vendedor</option>
                </Form.Select>
              </FormGroup>
              <hr />
              <Row>
                <Col />
                <div>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="btnLogIn" type="submit">
                      Registrarme
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

export default Register;
