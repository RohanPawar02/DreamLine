import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { signOut } from "../../reducks/userAuth/operations";

function Header() {
  const dispatch = useDispatch();
  const key = localStorage.getItem("LOGIN_USER_KEY");

  const signOutButton = (e) => {
    dispatch(signOut());
    dispatch(push("/signin"));
  };

  return (
    <header class="header">
      <nav class="flex-header">
        <div class="mb-0">
          <p>
            <a href="/">
              <span> DREAMLINE</span> digital
            </a>
          </p>
        </div>
        <div class="mb-1">
          {key ? (
            <input
              type="submit"
              class="signup"
              onClick={signOutButton}
              value="Logout"
            />
          ) : (
            <input
              type="submit"
              class="signin"
              onClick={() => dispatch(push("/signin"))}
              value="Sign in"
            />
          )}
          {key ? (
            <input
              type="submit"
              class="mycard"
              onClick={() => dispatch(push("/userbackground"))}
              value="My cards"
            />
          ) : (
            <input
              type="submit"
              class="signup"
              onClick={() => dispatch(push("/signup"))}
              value="Sign up"
            />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
