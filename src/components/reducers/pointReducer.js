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
          [action.payload.userId]: action.payload.points,
        },
        lastUpdate: action.payload.timestamp,
      };
    default:
      return state;
  }
};

export default pointReducer;
