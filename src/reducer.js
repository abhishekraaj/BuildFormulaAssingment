import { actions } from "./actions";
import { combineReducers } from "redux";

const userReducer = (state = [], action) => {
  console.log(action, "reducer me hu");
  switch (action.type) {
    case actions.ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

const isLogin = (state = false, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return action.payload;
    default:
      return state;
  }
};

const matchedUser = (state = {}, action) => {
  switch (action.type) {
    case actions.LOGGUSER:
      return action.payload;

    default:
      return state;
  }
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_POST:
      return [...state, action.payload];

    case actions.DELETE_POST:
      state = state.filter((el) => el.id !== action.payload.id);
      return state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  userReducer,
  matchedUser,
  postReducer,
  isLogin
});
