import React from 'react';
import Logo from '../../assets/icons/logo.png'
import Search from "./Search/Search";
import Navigation from "./Navigation/Navigation";
import ProfileLink from "./ProfileLink/ProfileLink";
import styles from './Header.module.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 639);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 639);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  return isMobile ? (
    <header className={styles.mobile_header}>
      <Link to={"/"}><img className={styles.logo} src={Logo} alt="logo" /></Link>
      <Link to={'/'} className={styles.site_name}><h1>Cooking Forum</h1></Link>
      <div
        className={
          isBurgerOpen
            ? `${styles.burger} ${styles.burger_active}`
            : styles.burger
        }
        onClick={() => setIsBurgerOpen((prev) => !prev)}
      >
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
      </div>

      <div
        className={
          isBurgerOpen
            ? `${styles.burger_content_wrapper} ${styles.burger_content_active}`
            : styles.burger_content_wrapper
        }
        onClick={() => setIsBurgerOpen(false)}
      >
        <div
          className={styles.burger_content}
          onClick={e => e.stopPropagation()}
        >
          <Search />
          <Navigation />
          <div className={styles.burger_content_line}>
            {isAuth ? <ProfileLink /> : <Link to={'/login'} className={styles.login}>Login</Link>}
            <button
              className={styles.burger_content_close}
              onClick={() => setIsBurgerOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      <Link to={"/"}><img className={styles.logo} src={Logo} alt="logo" /></Link>
      <Search />
      <Navigation />
      {isAuth ? <ProfileLink /> : <Link to={'/login'} className={styles.login}>Login</Link>}
    </header>
  );
};

export default Header;