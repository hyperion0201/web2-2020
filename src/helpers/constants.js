export const HEADER_PERMISSION = {
  loggedIn: [
    { value: "account", title: "List Account" },
    { value: "profile", title: "Profile" },
    { value: "logout", title: "Log out" },
  ],
  noLogIn: [
    { value: "login", title: "Log in" },
    { value: "signup", title: "Sign up" },
  ],
};

export const ROLE_PERMISSION = {
  user: ["profile", "account"],
  noLogin: ["login", "logout"],
};
