import NavBarLanding from "../navs/NavBarLanding";
import { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { ApiContext } from "../../services/apiContext/Api.context";

const Register = () => {
  const { setUsers } = useContext(ApiContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUser] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    username: false,
    userType: false,
    passwordLengthAndWordUppercase: false,
  });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userRef = useRef(null);
  const userTypeRef = useRef(null);

  // Manejadores de cambios en los campos del formulario
  const changeEmailHandler = (event) => setEmail(event.target.value);
  const changeUserHandler = (event) => setUser(event.target.value);
  const changePasswordHandler = (event) => setPassword(event.target.value);
  const changeUserTypeHandler = (event) => setUserType(event.target.value);

  // Función para limpiar errores relacionados con la contraseña
  const clearPasswordErrors = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordLengthAndWordUppercase: false,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validaciones
    if (!username) {
      userRef.current.focus();
      setErrors({
        username: true,
        email: false,
        password: false,
        userType: false,
        passwordLengthAndWordUppercase: false,
      });
      return;
    }
    if (!email) {
      emailRef.current.focus();
      setErrors({
        email: true,
        username: false,
        password: false,
        userType: false,
        passwordLengthAndWordUppercase: false,
      });
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      setErrors({
        password: true,
        email: false,
        username: false,
        userType: false,
        passwordLengthAndWordUppercase: false,
      });
      return;
    }
    if (!userType) {
      userTypeRef.current.focus();
      setErrors({
        userType: true,
        email: false,
        username: false,
        password: false,
        passwordLengthAndWordUppercase: false,
      });
      return;
    }

    // Validar longitud mínima de la contraseña (más de 6 caracteres) y al menos una letra mayúscula
    if (password.length <= 6 || !/[A-Z]/.test(password)) {
      setErrors({
        ...errors,
        passwordLengthAndWordUppercase: true,
        email: false,
        username: false,
        userType: false,
      });
      return;
    }

    // Resetear errores
    setErrors({
      email: false,
      password: false,
      username: false,
      userType: false,
      passwordLengthAndWordUppercase: false,
    });
    setApiError("");

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "El correo electronico ya existe") {
          setErrors({ ...errors, email: true });
          setApiError("El correo electrónico ya está registrado");
        } else if (errorData.message === "El nombre de usuario ya existe") {
          setErrors({ ...errors, username: true });
          setApiError("El nombre de usuario ya está registrado");
        } else {
          throw new Error(errorData.message || "Error al registrar usuario");
        }
      } else {
        console.log(`Usuario ${username} se ha registrado con email ${email}.`);
        navigate("/login");
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      setApiError(error.message);
    }
  };

  return (
    <>
      <NavBarLanding />
      <div className="register-container">
        <Card className="content-register">
          <Card.Body>
            <Row>
              <h5>REGÍSTRATE</h5>
            </Row>
            <hr />
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-4">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  ref={userRef}
                  value={username}
                  type="text"
                  className={errors.username ? "border border-danger" : ""}
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
                  className={
                    (errors.password ||
                      errors.passwordLengthAndWordUppercase) &&
                    "border border-danger"
                  }
                  onChange={(event) => {
                    changePasswordHandler(event);
                    clearPasswordErrors();
                  }}
                  placeholder="Ingresar contraseña"
                />
                {errors.passwordLengthAndWordUppercase && (
                  <small className="text-danger">
                    La contraseña debe tener más de 6 caracteres y al menos una
                    mayúscula.
                  </small>
                )}
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

              {apiError && (
                <div className="alert alert-danger" role="alert">
                  {apiError}
                </div>
              )}

              <p style={{ textAlign: "center" }}>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Inicia sesión
                </Link>
              </p>
              <hr />
              <Row>
                <Col />
                <div>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="btnRegister" type="submit">
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
