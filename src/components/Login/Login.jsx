import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { AuthenticationContext } from "../../services/auth/Auth.context";
import NavBarLanding from "../navs/NavBarLanding";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthenticationContext);
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

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (emailValue === "" || passwordValue === "") {
      setErrors({
        email: emailValue === "",
        password: passwordValue === "",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const userData = await response.json();
      handleLogin(userData.email, userData.userType);

      if (userData.userType === "client") {
        navigate("/client");
      } else if (userData.userType === "seller") {
        navigate("/seller");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <>
      <NavBarLanding></NavBarLanding>
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
                <label>Contraseña:</label>
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
                    <Button className="btnLogIn" type="submit">
                      Iniciar sesión
                    </Button>
                    {/* {isAuthenticated && (
                      <Button
                        className="btnStore"
                        onClick={() => navigate("/client")}
                      >
                        Tienda
                      </Button>
                    )} */}
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
