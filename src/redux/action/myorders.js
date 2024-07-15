import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import ApiHeader from '../../config/ApiHeader';
import {
  getData,
  showMessage,
  showToast,
  showToasty,
  storeData,
} from '../../utils';
import {setLoading, setLoadingScreen} from './global';
// import ApiConfig from '../../config/ApiConfig';

export const getMyOrderList = (params, user, myorders = [], onCallback = res => {}, onError = err => {}) => dispatch => {
    console.log('user', user);

    dispatch(setLoadingScreen(true));
    const paramList = [
      {
        fk_status:{nin:['62e776eb7fea0747c890b624']},
        fk_customer: user, // tayaka laundry
      },
    ];
    axios
      .get(
        `${ApiConfig}/api/Orders`,
        {
          params: {
            filter: {
              where: {and:paramList},
              include: ['Customer', 'Mitra', 'Status', 'MetodePengiriman'],
              order: 'updated_at desc',
              offset: params?.page * params?.limit,
              limit: params?.limit,
            },
          },
        },
        {header: ApiHeader},
      )
      .then(res => {
        console.log('res', res);
        if (params?.page == 0) {
          dispatch({type: 'SET_ORDER_PAYMENT_LIST', value: res.data});
          dispatch({
            type: 'SET_ORDER_LIST',
            value: res.data,
          });
        } else {
          dispatch({
            type: 'SET_ORDER_LIST',
            value: [...myorders, ...res.data],
          });
        }
        onCallback(res.data);
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
        //showMessage(`Error Sign Up !!! ${err}`);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

  export const getMyOrderPayment = (params, user, myorderPayment = [], onCallback = res => {}, onError = err => {}) => dispatch => {
    console.log('user', user);
    

    dispatch(setLoadingScreen(true));
    const paramList = [
      {
        fk_customer: user, // tayaka laundry
        fk_status: "62e776eb7fea0747c890b624"
      },
    ];
    axios
      .get(
        `${ApiConfig}/api/Orders`,
        {
          params: {
            filter: {
              where: {and: paramList},
              include: ['Customer', 'Mitra', 'Status', 'MetodePengiriman'],
              order: 'updated_at desc',
              offset: params?.page * params?.limit,
              limit: params?.limit,
            },
          },
        },
        {header: ApiHeader},
      )
      .then(res => {
        console.log('res', res);
        if (params?.page == 0) {
          dispatch({type: 'SET_ORDER_PAYMENT_LIST', value: res.data});
        } else {
          dispatch({
            type: 'SET_ORDER_PAYMENT_LIST', value: [...myorderPayment, ...res.data],
          });
        }
        onCallback(res.data);
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
        //showMessage(`Error Sign Up !!! ${err}`);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

  export const UpdateMyOrder = (id, formData, myorders = [], onCallback=(res)=>{},onError=(err)=>{}) => (dispatch) => {
    // console.log('d params', params);
  
    dispatch(setLoadingScreen(true));
    const setApiHeader = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      
  };
    axios.patch(`${ApiConfig}/api/Orders/${id}`, formData, { header: setApiHeader })
      .then((res) => {
        console.log('update myorder', res);
          dispatch({ type: 'SET_ORDER_LIST', value: [...myorders, ...res.data]});
          onCallback(res.data)
      })
      .catch((err) => {
        console.log('error', err);
        onError(err)
        //showMessage(`Error Sign Up !!! ${err}`);
        
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };

  export const getMyOrderStatusCount = (status, user, onCallback = res => {}, onError = err => {}) => dispatch => {
    console.log('fk_status', status);
    console.log('user', user);


    dispatch(setLoadingScreen(true));
    const paramList = [
      {
        fk_status: status,
        fk_customer: user
      },
    ];
    axios
      .get(
        `${ApiConfig}/api/Orders/count`,
        {
          params: {
              where: {and: paramList},

          },
        },
        {header: ApiHeader},
      )
      .then(res => {
        console.log('res order count', res);
        dispatch({type: 'SET_ORDER_COUNT', value: res.data});
        onCallback(res.data);
      })
      .catch(err => {
        console.log('error', err);
        onError(err);
        //showMessage(`Error Sign Up !!! ${err}`);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
  };