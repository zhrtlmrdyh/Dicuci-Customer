

const initStateCashier = {
  product: {
    harga_beli: 0,
    is_stock : true,
    stock_jumlah: 0,
    stock_minimum: 0,
  },
  productList: [],
  checkout: {
    total_pembayaran : 0,
  },
  invoice: {},
  productCheckout: {},
  invoiceList: [],
};

export const cashierReducer = (state = initStateCashier, action) => {
  if (action.type === 'SET_CASHIER_PRODUCT') {
    return {
      ...state,
      product: action.value,
    };
  }else if (action.type === 'SET_CASHIER_PRODUCT_LIST') {
    return {
      ...state,
      productList: action.value,
    };
  }else if (action.type === 'SET_CASHIER_CHECKOUT') {
    return {
      ...state,
      checkout: action.value,
    };
  }else if (action.type === 'SET_CASHIER_INVOICE') {
    return {
      ...state,
      invoice: action.value,
    };
  }
  else if (action.type === 'SET_CASHIER_CHECKOUT_PRODUCT_ID') {
    return {
      ...state,
      productCheckout: action.value,
    };
  }else if (action.type === 'SET_CASHIER_INVOICE_LIST') {
    return {
      ...state,
      invoiceList: action.value,
    };
  }
  return state;
};
