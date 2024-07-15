const initStateMyOrder = {
    myorder: {},
    myorders: [],
    myorder_detail:{},
    myorderGlobal: [],
    myorderPaymentList: [],
    count: [],
  };
  
  export const myorderReeducer = (state = initStateMyOrder, action) => {
    if (action.type === 'SET_ORDER') {
      return {
        ...state,
        myorder: action.value,
      };
    }
    if (action.type === 'SET_ORDER_LIST') {
      return {
        ...state,
        myorders: action.value,
      };
    }
    if (action.type === 'SET_ORDER_DETAIL') {
      return {
        ...state,
        myorder_detail: action.value,
      };
    }
    if (action.type === 'SET_ORDER_GLOBAL') {
      return {
        ...state,
        myorderGlobal: action.value,
      };
    }
    if (action.type === 'SET_ORDER_PAYMENT_LIST') {
      return {
        ...state,
        myorderPaymentList: action.value,
      };
    }
    if (action.type === 'SET_ORDER_COUNT') {
      return {
        ...state,
        count: action.value,
      };
    }
    return state;
  };
  