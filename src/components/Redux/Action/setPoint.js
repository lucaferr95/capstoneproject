export const setPointsForUser = (userId, points) => ({
  type: "SET_POINTS_FOR_USER",
  userId,
  payload: points,
});

export const addPoints = (amount) => ({
  type: "ADD_POINTS",
  payload: amount,
});
