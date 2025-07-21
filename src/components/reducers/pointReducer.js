const initialState = {
  pointsByUser: {},
};

const pointReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POINTS_FOR_USER":
      return {
        ...state,
        pointsByUser: {
          ...state.pointsByUser,
          [action.userId]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default pointReducer;
