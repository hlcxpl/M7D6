import "../assets/css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context";

export default function Navbar() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useContext(Context);
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <span className="logo">SJ</span>

      <div className="opciones">
        <span className="me-3">
          <Link to="/">
            Inicio
            <i className="fa-solid fa-house ms-2"></i>
          </Link>
        </span>

        {!usuario ? (
          <div>
            <Link to="/registrarse">
              <button className="btn m-1 register-btn">Registrarse</button>
            </Link>

            <Link to="/login">
              <button className="btn login-btn">Iniciar Sesión</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/perfil">
              <button className="btn  m-1 btn-light">Mi Perfil</button>
            </Link>
            <button onClick={logout} className="btn btn-danger">
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
