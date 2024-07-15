const initGlobalState = {
  isError: false,
  message: 'Error',
  isLoading: false,
  isLoadingScreen: false,
  error: 'error',
  global: false,
  masterParamList: [],
  provinsiListGlobal: [],
  kabkotaListGlobal: [],
  kelurahanListGlobal: [],
  kecamatanListGlobal: [],
  provinsiList: [],
  kabkotaList: [],
  kelurahanList: [],
  kecamatanList: [],
  loadingValue : 0.1,
  cekKeterangan : '',
  isVisibleModal: false,
  favoriteList: [],
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      isError: action.value.isError,
      message: action.value.message,
      error: action.value.error,
    };
  }
  else if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  else if (action.type === 'SET_LOADING_SCREEN') {
    return {
      ...state,
      isLoadingScreen: action.value,
    };
  }
  else if (action.type === 'SET_LOADING_SCREEN_BARNER') {
    return {
      ...state,
      isLoadingScreenBarner: action.value,
    };
  }
 
  
  else if (action.type === 'SET_MASTER_PARAM') {
    return {
      ...state,
      masterParamList: action.value,
    };
  }
  else if (action.type === 'SET_PROVINSI_GLOBAL') {
    return {
      ...state,
      provinsiListGlobal: action.value,
    };
  }
  else if (action.type === 'SET_KABKOTA_GLOBAL') {
    return {
      ...state,
      kabkotaListGlobal: action.value,
    };
  }
  else if (action.type === 'SET_KECAMATAN_GLOBAL') {
    return {
      ...state,
      kecamatanListGlobal: action.value,
    };
  }
  else if (action.type === 'SET_KELURAHAN_GLOBAL') {
    return {
      ...state,
      kelurahanListGlobal: action.value,
    };
  }
  else if (action.type === 'SET_PROVINSI') {
    return {
      ...state,
      provinsiList: action.value,
    };
  }
  else if (action.type === 'SET_KABKOTA') {
    return {
      ...state,
      kabkotaList: action.value,
    };
  }
  
  else if (action.type === 'SET_GLOBAL') {
    return {
      ...state,
      global: action.value,
    };
  }
  else if (action.type === 'SET_LOADING_VALUE') {
    return {
      ...state,
      loadingValue: action.value,
    };
  }
  else if (action.type === 'SET_TOKEN_MESSAGE') {
    return {
      ...state,
      tokenMessage: action.value,
    };
  }
  
  else if (action.type === 'SET_CEK_KETERANGAN') {
    return {
      ...state,
      cekKeterangan: action.value,
    };
  }
  else if (action.type === 'SET_IS_VISIBLE_MODAL') {
    return {
      ...state,
      isVisibleModal: action.value,
    };
  }
  else if (action.type === 'SET_FAVORITE_LIST') {
    return {
      ...state,
      favoriteList: action.favoriteList,
    };
  }
  return state;
};

