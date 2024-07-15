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

export const getPaketMitratList =
  (params, mitra, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    console.log('d params', params);
    console.log('mitra', mitra);

    dispatch(setLoadingScreen(true));
    const paramList = [
      {
        fk_mitra: mitra, // tayaka laundry
      },
    ];
    axios
      .get(
        `${ApiConfig}/api/Pakets`,
        {
          params: {
            filter: {
              where: {and: paramList},
              include: ['Mitra', 'TypeDurasi'],
              order: 'updated_at Desc',
              offset: params?.page * params?.limit,
              limit: params?.limit,
            },
          },
        },
        {header: ApiHeader},
      )
      .then(res => {
        // console.log('res', res);
        dispatch({type: 'SET_PAKET_MITRA', value: res.data});
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

export const PostOrder =
  (formData, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    dispatch(setLoadingScreen(true));
    const setApiHeader = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    axios
      .post(`${ApiConfig}/api/Orders`, formData, {header: setApiHeader})
      .then(res => {
        console.log('Post Order Berhasil', res);
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

export const getPaketMitrat =
  (params, mitra, onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    console.log('d params', params);
    console.log('mitra', mitra);

    dispatch(setLoadingScreen(true));
    const paramList = [
      {
        fk_mitra: mitra, // tayaka laundry
      },
    ];
    axios
      .get(
        `${ApiConfig}/api/Pakets/findOne`,
        {
          params: {
          
            filter: {
              where: {and: paramList},
              include: ['Mitra', 'TypeDurasi'],
              order: 'updated_at Desc',
              offset: params?.page * params?.limit,
              limit: params?.limit,
            },
          },
        },
        {header: ApiHeader},
      )
      .then(res => {
        // console.log('res', res);
        dispatch({type: 'SET_PAKET_MITRA', value: res.data});
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
