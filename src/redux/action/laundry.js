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

export const getLaundryBagList = (params, laundryBagList = [], onCallback = res => {}, onError = err => {}) =>
  dispatch => {
    console.log('d params', params);

    dispatch(setLoadingScreen(true));
    const paramList = [{
      // fk_user: '62e770dbc9d16b28e00edbca', // john
    }];
    axios
      .get(
        `${ApiConfig}/api/LaundryBags`,
        {
          params: {
            filter: {
              where: {and: paramList},
              include: [
                'Mitra',
                'User',
              ],
              order: 'updated_at Desc',
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
          dispatch({type: 'SET_LAUNDRY_BAG_LIST', value: res.data});
        } else {
          dispatch({
            type: 'SET_LAUNDRY_BAG_LIST',
            value: [...laundryBagList, ...res.data],
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

  export const PostLaundryBag = (formData, laundryBagList=[], onCallback=(res)=>{},onError=(err)=>{}) => (dispatch) => {
    console.log('laundry', laundryBagList);
    dispatch(setLoadingScreen(true));
    const setApiHeader = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
    };
    axios.post(`${ApiConfig}/api/LaundryBags`, formData, { header: setApiHeader })
      .then((res) => {
        console.log('Post Laundry Bag Berhasil', res);
          onCallback(res.data)
          // dispatch({type: 'SET_LAUNDRY_BAG_LIST', value: [...laundryBagList, ...res.data]});
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

export const deleteLaundryBag = (id, laundryBagList=[], onCallback=(res)=>{}, onError=(err)=>{}) => (dispatch) => {
  dispatch(setLoadingScreen(true));
  const setApiHeader = {
    'Content-Type': 'application/json',
    'Accept': 'appliccation/json',
  };

  axios.delete(`${ApiConfig}/api/LaundryBags/${id}`, {header: setApiHeader})
    .then((res) => {
      console.log('res delete laundrybag', res);

      dispatch({type: 'SET_LAUNDRY_BAG_LIST', value: [...laundryBagList, ...res.data]});
      onCallback(res.data)
    })
    .catch((err) => {
      console.log('error', err);
      onError(err)
    })
    .finally(() => {
      dispatch(setLoadingScreen(false));
    })
}

export const UpdateLaundryBag = (id, formData, laundryBagList=[], onCallback=(res)=>{},onError=(err)=>{}) => (dispatch) => {
  console.log('laundry', laundryBagList);

  dispatch(setLoadingScreen(true));
  const setApiHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
};
  axios.patch(`${ApiConfig}/api/LaundryBags/${id}`, formData, { header: setApiHeader })
    .then((res) => {
      console.log('mypakets find', res);
        // dispatch({ type: 'SET_LAUNDRY_BAG_LIST', value: [res.data]});
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
