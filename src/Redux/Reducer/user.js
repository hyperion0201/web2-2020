import { assign } from "lodash";
const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return assign(state, action.payload);
    default:
      return state;
  }
};
export default user;
