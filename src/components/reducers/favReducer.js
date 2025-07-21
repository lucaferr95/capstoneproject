const username = localStorage.getItem("username");
const storageKey = `favourites_${username}`;

const initialState = {
  list: JSON.parse(localStorage.getItem(storageKey)) || [],
};

const favReducer = (state = initialState, action) => {
  let updatedList;

  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      if (state.list.some((fav) => fav.id === action.payload.id)) {
        return state;
      }

      updatedList = [...state.list, action.payload];
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      return {
        ...state,
        list: updatedList,
      };

    case "REMOVE_FROM_FAVOURITE":
      updatedList = state.list.filter((fav) => fav.id !== action.payload.id);
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      return {
        ...state,
        list: updatedList,
      };

    case "RESET_FAVOURITES":
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

export default favReducer;
