

const initStateHome = {
  paket: {},
  paketList: [],
  favoriteList: [],
  paketMitra: []
};

export const homeReducer = (state = initStateHome, action) => {
  if (action.type === 'SET_PAKET') {
    return {
      ...state,
      paket: action.value,
    };
  }
  if (action.type === 'SET_PAKET_LIST') {
    return {
      ...state,
      paketList: action.value,
    };
  }
  if (action.type === 'SET_FAVORITE_LIST') {
    return {
      ...state,
      favoriteList: action.value,
    };
  }
  if (action.type === 'SET_PAKET_MITRA') {
    return {
      ...state,
      paketMitra: action.value,
    };
  }
  return state;
};
