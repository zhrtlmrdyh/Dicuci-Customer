import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import ApiHeader from '../../config/ApiHeader';
import { getData, showMessage, showToast, showToasty, storeData } from '../../utils';
import { setLoading, setLoadingScreen } from './global';
// import ApiConfig from '../../config/ApiConfig';



export const getPaketList = (params, paketList=[], onCallback=(res)=>{},onError=(err)=>{}) => (dispatch) => {
  // console.log('d params', params);

  dispatch(setLoadingScreen(true));
  const paramList = [{}]
  axios.get(`${ApiConfig}/api/Pakets`, {
    params: {
      filter: {
        where : 
          {and : paramList
        },
        include: ['Mitra','TypeDurasi'],
        order: 'updated_at Desc',
        offset: (params?.page * params?.limit),
        limit: params?.limit
      }
    },
  }, { header: ApiHeader })
    .then((res) => {
      // console.log('res', res);
        if(params?.page == 0){
          dispatch({ type: 'SET_PAKET_LIST', value: res.data });
        }else{
          dispatch({ type: 'SET_PAKET_LIST', value: [...paketList, ...res.data ]});
        }
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

export const getFavoriteList = (params, paketList=[], onCallback=(res)=>{},onError=(err)=>{}) => (dispatch) => {
  // console.log('d params', params);
  getData('AuthUser').then((resAuth) => {
    const id = resAuth._id;
    getData('token').then((resAuthToken) =>{
      const token = resAuthToken.value
    })
  })

  dispatch(setLoadingScreen(true));
  const paramList = [{}]
  axios.get(`${ApiConfig}/api/Pakets/favorite/${id}`, {
    params: {
      filter: {
        where : 
          {and : paramList
        },
        include: ['Mitra','TypeDurasi'],
        order: 'updated_at Desc',
        offset: (params?.page * params?.limit),
        limit: params?.limit
      }
    },
  }, { header: ApiHeader })
    .then((res) => {
      // console.log('res', res);
        if(params?.page == 0){
          dispatch({ type: 'SET_FAVORITE_LIST', value: res.data });
        }else{
          dispatch({ type: 'SET_FAVORITE_LISTT', value: [...favoriteList, ...res.data ]});
        }
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




