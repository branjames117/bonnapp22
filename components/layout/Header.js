import { useState, useContext } from 'react';
import { signout, useSession } from 'next-auth/client';
import Link from 'next/link';
import { ThemeContext } from './ThemeContext';
import classes from './Header.module.css';
import randomColorGenerator from '../../lib/random-colors';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [session, loading] = useSession();
  const { darkTheme } = useContext(ThemeContext);

  function logoutHandler() {
    signout({ callbackUrl: '/' });
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <span className={classes.navLogo}>
            <Link href='/'>
              <span
                className={classes.navLink}
                style={
                  darkTheme
                    ? { color: '#ddd' }
                    : { color: randomColorGenerator() }
                }
                onClick={() => setOpenMenu(false)}
              >
                BonnApp22
              </span>
            </Link>
          </span>
        </div>
        {!loading && (
          <>
            <div>
              <div className={classes.fullMenu}>
                <ul className={classes.navLinkList}>
                  <li>
                    <Link href='/shows/'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        Lineup
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/genres'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        Genres
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/about'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        About
                      </span>
                    </Link>
                  </li>
                  {/* render if no active session */}
                  {!session && (
                    <>
                      <li>
                        <Link href='/register'>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            Register
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href='/login'>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            Login
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  {/* render if active session */}
                  {session && !loading && (
                    <>
                      <li>
                        <Link href={`/user/${session.user.name}`}>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            My Profile
                          </span>
                        </Link>
                      </li>
                      <li onClick={logoutHandler}>
                        <span
                          className={classes.navLink}
                          style={
                            darkTheme
                              ? { color: '#ddd', cursor: 'pointer' }
                              : {
                                  color: randomColorGenerator(),
                                  cursor: 'pointer',
                                }
                          }
                        >
                          Logout
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className={classes.miniMenu}>
                <div
                  className={classes.hamburger}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <div
                    style={
                      darkTheme
                        ? { backgroundColor: '#ddd' }
                        : {
                            backgroundColor: randomColorGenerator(),
                          }
                    }
                    className={`${classes.line} ${classes.line1} ${
                      openMenu ? classes.active : null
                    }`}
                  ></div>
                  <div
                    style={
                      darkTheme
                        ? { backgroundColor: '#ddd' }
                        : {
                            backgroundColor: randomColorGenerator(),
                          }
                    }
                    className={`${classes.line} ${classes.line2} ${
                      openMenu ? classes.active : null
                    }`}
                  ></div>
                  <div
                    style={
                      darkTheme
                        ? { backgroundColor: '#ddd' }
                        : {
                            backgroundColor: randomColorGenerator(),
                          }
                    }
                    className={`${classes.line} ${classes.line3} ${
                      openMenu ? classes.active : null
                    }`}
                  ></div>
                </div>
              </div>
              <div
                className={`${classes.slideMenu} ${
                  openMenu ? classes.active : null
                }`}
                onClick={() => setOpenMenu(false)}
              >
                <ul className={classes.navLinkList}>
                  <li>
                    <Link href='/shows/'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        Lineup
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/genres'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        Genres
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/about'>
                      <span
                        className={classes.navLink}
                        style={
                          darkTheme
                            ? { color: '#ddd' }
                            : { color: randomColorGenerator() }
                        }
                      >
                        About
                      </span>
                    </Link>
                  </li>
                  {/* render if no active session */}
                  {!session && (
                    <>
                      <li>
                        <Link href='/register'>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            Register
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href='/login'>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            Login
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  {/* render if active session */}
                  {session && !loading && (
                    <>
                      <li>
                        <Link href={`/user/${session.user.name}`}>
                          <span
                            className={classes.navLink}
                            style={
                              darkTheme
                                ? { color: '#ddd' }
                                : { color: randomColorGenerator() }
                            }
                          >
                            My Profile
                          </span>
                        </Link>
                      </li>
                      <li onClick={logoutHandler}>
                        <span
                          className={classes.navLink}
                          style={
                            darkTheme
                              ? { color: '#ddd', cursor: 'pointer' }
                              : {
                                  color: randomColorGenerator(),
                                  cursor: 'pointer',
                                }
                          }
                        >
                          Logout
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
