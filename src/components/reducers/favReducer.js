const initialState = {
  list: [],
};

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      if (state.list.includes(action.payload)) {
        return state; // Se è già nei preferiti, non fare nulla
      }
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "REMOVE_FROM_FAVOURITE":
      return {
        ...state,
        list: state.list.filter((fav) => fav !== action.payload),
      };
    default:
      return state;
  }
};

export default favReducer;
