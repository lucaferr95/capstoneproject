export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";

export const addToFavouriteAction = (song) => {
  return {
    type: ADD_TO_FAVOURITE,
    payload: song, // la canzone che aggiungi ai preferiti
  };
};

export const removeFromFavouriteAction = (song) => {
  return {
    type: REMOVE_FROM_FAVOURITE,
    payload: song, // la canzone che rimuovi dai preferiti
  };
};
