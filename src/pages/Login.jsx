import { useState, useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext.jsx";
import PagNav from "../components/PagNav.jsx";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if(email && password) login(email, password)
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", {replace: true})
  }, [isAuthenticated, navigate])
  

  return (
    <main className={styles.login}>
      <PagNav />
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <input type="submit" value='Login' className={styles.logBtn} />
        </div>
      </form>
    </main>
  );
};

export default Login;