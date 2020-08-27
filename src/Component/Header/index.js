import React, {useRef, useEffect, useState} from 'react';
import './style.scss';
import {getCookie, removeCookie} from '../../helpers/cookie';
import Profile from '../profile';
import EditAccountSpending from '../EditAccountSpending';
import {get} from 'lodash';
import {getUserInfo} from '../../Redux/Action/userAction';
import {Popover, MenuItem, Button} from '@material-ui/core';

const Header = () => {
  const [user, setUser] = useState({});
  const headerRef = useRef();

  const isLogin = getCookie('user_token');
  const pathname = get(window, 'location.pathname');

  useEffect(() => {
    getUserInfo().then((res) => {
      const {data} = res;
      data && setUser(data.user);
    });
    if (['/login', '/register'].includes(pathname)) {
      headerRef.current.classList.add('transparent-header');
    } else {
      headerRef.current.classList.remove('transparent-header');
    }
  }, [pathname]);

  const handleLogout = () => {
    removeCookie('user_token');
    localStorage.clear();
    window.location.replace('/');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div ref={headerRef} className="header">
      <div className="header-nav">
        <div className="nav-bar">
          <img
            className="logo"
            onClick={() => window.location.replace('/')}
            src="/images/logo.png"
            alt=""
          />
          <div className="not-responsive">
            {!isLogin ? (
              <div className="link-group">
                <a href="/login" className="link-btn">
                  Log in
                </a>
                <a href="/register" className="link-btn sign-up">
                  Sign up
                </a>
              </div>
            ) : (
              <div className="link-group">
                {user && user.role === 'staff' && (
                  <a href="/user-management" className="link-btn">
                    User Management
                  </a>
                )}
                {user && user.role === 'staff' && <EditAccountSpending />}
                {user && user.role !== 'staff' && (
                  <a href="/account" className="link-btn">
                    List accounts
                  </a>
                )}
                {user && user.role !== 'staff' && (
                  <a href="/transfer" className="link-btn">
                    Transfer
                  </a>
                )}
                <Profile />
                <span onClick={handleLogout} className="link-btn">
                  Log out
                </span>
              </div>
            )}
          </div>
          <div className="had-responsive">
            <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Menu
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {!isLogin ? (
                <div>
                  <MenuItem>
                    <a href="/login" className="link-btn">
                    <div className="list-account-btn"> Log in</div>
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="/register" className="link-btn sign-up">
                    <div className="list-account-btn"> Sign up</div>
                    </a>
                  </MenuItem>
                </div>
              ) : (
                <div className="background-color-menu-res">
                <div className="header-with-staff">
                  {user && user.role === 'staff' && (
                    <MenuItem>
                    <a href="/user-management" className="link-btn">
                    <div className="list-account-btn"> User Management</div>
                    </a>
                    </MenuItem>
                  )}
                  {user && user.role === 'staff' && <div className="list-account-btn-staff"><EditAccountSpending /> </div>}
                  {user && user.role !== 'staff' && (
                    <MenuItem>
                    <a href="/account" className="link-btn">
                      <div className="list-account-btn">List accounts</div>
                    </a>
                    </MenuItem>
                  )}
                  </div>

                  {user && user.role !== 'staff' && (
                    <MenuItem>
                    <a href="/transfer" className="link-btn">
                      <div className="list-account-btn">Transfer</div>
                    </a>
                    </MenuItem>
                  )}
                 <MenuItem><Profile/> </MenuItem>
                  <MenuItem>
                  <a onClick={handleLogout} className="link-btn">
                  <div className="list-account-btn">Log out</div>
                  </a>
                  </MenuItem>
                </div>
                
              )}
            </Popover>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
