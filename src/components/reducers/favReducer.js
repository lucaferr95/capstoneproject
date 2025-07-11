const username = localStorage.getItem("username");

const initialState = {
  list: JSON.parse(localStorage.getItem(`favourites_${username}`)) || [],
};

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      if (state.list.some((fav) => fav.id === action.payload.id)) {
        return state;
      } //Così controllO se hO già quel brano nei preferiti in base all’id

      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "RESET_FAVOURITES":
      return {
        ...state,
        list: action.payload,
      };

    case "REMOVE_FROM_FAVOURITE":
      return {
        ...state,
        list: state.list.filter((fav) => fav.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default favReducer;
