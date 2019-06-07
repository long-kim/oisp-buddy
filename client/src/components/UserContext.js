import React from "react";

export const UserContext = React.createContext({
  currentUser: {
    firstName: "",
    user_id: 0,
    username: "",
    avatar: "",
    cover: ""
  },
  authorize: () => {}
});
UserContext.displayName = "CurrentUser";

export default UserContext;
