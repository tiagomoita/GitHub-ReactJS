import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_up": {
      return {
        ...state,
        users: [...state.users, action.payload],
        logged: action.payload,
      };
    }
    case "sign_in": {
      return { ...state, logged: action.payload };
    }
    case "add_favorite": {
      let logged = {};
      const users = state.users.map((element) => {
        if (element.email === state.logged.email) {
          const elemFavIndexOf = element.favourites.indexOf(action.payload.favourite);
          let newElement = {};
          if (elemFavIndexOf !== -1) {
            newElement = {
              ...element,
              favourites: [
                ...element.favourites.slice(0, elemFavIndexOf),
                ...element.favourites.slice(elemFavIndexOf + 1, element.length),
              ],
            };
          } else {
            newElement = {
              ...element,
              favourites: [...element.favourites, action.payload.favourite],
            };
          }
          logged = newElement;
          return newElement;
        }
        return element;
      });

      localStorage.setItem("Data", JSON.stringify(users));

      return { ...state, users, logged };
    }



    case "logged": {
      let logged = {};
      const users = state.users.map((element) => {
        if (element.email === state.logged.email && action.payload === "login") {
          logged = { ...element, Logged: true };
          return { ...element, Logged: true };
        }
        if (element.email === state.logged.email && action.payload === "logout") {
          logged = {};
          return { ...element, Logged: false };
        }
        return element;
      });

      return { ...state, users, logged };
    }


    case "set_error_message": {
      return { ...state, error: action.payload };
    }
    case "set_loading": {
      return { ...state, loading: action.payload };
    }
    case "update_logged": {

      if (localStorage.length !== 0){
        const logged = JSON.parse(localStorage.getItem("Data")).find((element) => {
          return element.Logged === true;
       });
      
       if(logged === undefined){
        return  { ...state, logged: {} };
       }
       return  { ...state, logged };
      }
   
      return state;
    }
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async (user) => {
    await dispatch({ type: "sign_in", payload: user });
  };
};

const signup = (dispatch) => {
  return async (user) => {
    await dispatch({ type: "sign_up", payload: user });
  };
};

const error_message = (dispatch) => {
  return (message) => {
    dispatch({ type: "set_error_message", payload: message });
  };
};

const authentication = (dispatch) => {
  return (operation) => {
    dispatch({ type: "logged", payload: operation });
  };
};

const set_loading = (dispatch) => {
  return (boolean) => {
    dispatch({ type: "set_loading", payload: boolean });
  };
};

const add_favourite = (dispatch) => {
  return (favourite) => {
    dispatch({ type: "add_favorite", payload: { favourite } });
  };
};

const update_logged = (dispatch) => {
  return () => {
    dispatch({ type: "update_logged" });
  };
}

const users = JSON.parse(localStorage.getItem("Data") || "[]");

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, error_message, set_loading, add_favourite, authentication, update_logged },
  { users, error: "", loading: false, logged: {} }
);
