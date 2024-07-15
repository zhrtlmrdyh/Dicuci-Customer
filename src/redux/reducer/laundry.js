const initStateLaundryBag = {
    laundryBag: {
      
    },
    laundryBagList: [],
    // checkout: {
    //   total_biaya: 0,
    // },
    laundryCheckout: {},
    checkoutPaket: {
      // user:{},
      // paket:{
      //   qty: 0,
      //   parfum: "",
      //   biaya_satuan: 0,
      //   berat: 0,
      // },
      // mitra:{},
    },
    checkoutList: [],
    mitradicuci: {},
    selected: false,
  };
  
  export const laundryBagReducer = (state = initStateLaundryBag, action) => {
    if (action.type === 'SET_LAUNDRYBAG') {
      return {
        ...state,
        laundryBag: action.value,
      };
    }
    if (action.type === 'SET_LAUNDRY_BAG_LIST') {
      return {
        ...state,
        laundryBagList: action.value,
      };
    }
    if (action.type === 'SET_LAUNDRY_CHECKOUT') {
      return {
        ...state,
        checkout: action.value,
      };
    }
    if (action.type === 'SET_LAUNDRY_CHECKOUT_PAKET') {
      return {
        ...state,
        laundryCheckout: action.value,
      };
    }
    if (action.type === 'SET_CHECKOUT_PAKET') {
      return {
        ...state,
        checkoutPaket: action.value,
      };
    }
    if (action.type === 'SET_CHECKOUT_LIST') {
      return {
        ...state,
        checkoutList: action.value,
      };
    }
    if (action.type === 'SET_MITRA') {
      return {
        ...state,
        mitradicuci: action.value,
      };
    }
    if (action.type === 'SET_SELECT') {
      return {
        ...state,
        selected: action.value,
      };
    }
    return state;
  };