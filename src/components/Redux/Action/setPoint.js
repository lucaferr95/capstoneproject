export const setPointsForUser = (userId, points) => ({
  type: "SET_POINTS_FOR_USER",
  userId,
  payload: { userId, points, timestamp: Date.now() },
});

export const addPoints = (amount) => ({
  type: "ADD_POINTS",
  userId,
  payload: amount,
});
