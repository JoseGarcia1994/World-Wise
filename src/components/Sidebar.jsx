import Logo from './Logo.jsx';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <p>AppNav Component</p>

      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &:copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;