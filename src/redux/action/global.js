import axios from 'axios';
// import { useSelector } from 'react-redux';
import ApiConfig from '../../config/ApiConfig';
// import ApiHeader from '../../config/ApiHeader';
import { getData, showMessage, showToast, showToasty, storeData } from '../../utils';

// import { getAllUserLB } from './auth';
// import moment from 'moment';
// import SweetAlert from 'react-native-sweet-alert';
// import Geolocation from 'react-native-geolocation-service';

// import { setUserLocationLB } from './auth';

export const setLoading = (value) => {
  return {
    type: 'SET_LOADING',
    value,
  };
}
export const setLoadingScreen = (value) => {
  return {
    type: 'SET_LOADING_SCREEN',
    value,
  };
}

export const setGlobal = (value) => {
  return {
    type: 'SET_GLOBAL',
    value,
  };
}
export const setError = (value) => {
  return {
    type: 'SET_ERROR',
    value,
  };
}

export const setLoadingValue = (value) => {
  return {
    type: 'SET_LOADING_VALUE',
    value,
  };
}
export const getMasterParamGlobal = (navigation,onCallback=()=>{},onError=()=>{}) => async (dispatch) => {
  dispatch(setLoadingScreen(true));
 
  await axios
    .get(`${ApiConfig}/api/Master_Params`
      , {
        params: {
          filter: {
            where : 
              and [
                {
                  status: 'Active'
                }
              ]
          }
        },
      }
    )
    .then((resMasterParam) => {
      // console.log('res global lb', resMasterParam);
      dispatch({ type: 'SET_MASTER_PARAM', value: resMasterParam.data });
      storeData('masterParamList', { value: resMasterParam.data });
      onCallback()
    })
    .catch((err) => {
      console.log('err get master param',err)
      onError()

      // err.isError = true
      // return dispatch(setError(err));
    })
    .finally(async () => {
      dispatch(setLoadingScreen(false));

    });
};
export const getMasterData = (navigation) => async (dispatch) => {
  //console.log('params global1', params);
  dispatch({ type: 'SET_LOADING_VALUE', value: 0.25 });
  // setCekKeterangan('memeriksa master data...')
  dispatch({ type: 'SET_CEK_KETERANGAN', value: 'memeriksa master data...' });

  await axios
    .get(`${ApiConfig}/api/Master_Params`
    , {
      params: {
        filter: {
          where : 
            and [
              {
                status: 'Active'
              }
            ]
        }
      },
    }
    )
    .then((resMasterParam) => {
      dispatch({ type: 'SET_LOADING_VALUE', value: 0.45 });
      // console.log('res global lb', resMasterParam);
      dispatch({ type: 'SET_MASTER_PARAM', value: resMasterParam.data });
      storeData('masterParamList', { value: resMasterParam.data });
    })
    .catch((err) => {
      err.isError = true
      return dispatch(setError(err));
    })
    
   

   
    .then(async () => {
      setLoadingValue(0.89);
      dispatch(setGlobal(true));
     
      dispatch({ type: 'SET_LOADING_VALUE', value: 0.91 });
      getData('authUser').then(async (res) => {

        if (res) {
          getData('akunList').then(async (resAkunList) => {
            if (resAkunList) {
                await dispatch({type: 'SET_AKUN_LIST', value: resAkunList?.value});
              }
            })
          getData('token').then(async (resToken) => {
            if (resToken) {
            
             
              await dispatch({ type: 'SET_AUTH_USER', value: res });
              if (authUser?.fk_detail) {
                await dispatch({ type: 'SET_AUTH_DETAIL', value: authUser?.Detail });
              }
              dispatch({ type: 'SET_TOKEN', value: resToken.value });
              
              dispatch({ type: 'SET_LOADING_VALUE', value: 0.95 });
              
              return navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });

            } else {
              return navigation.replace('Login');
            }
          })
        } else {
          getData('intro').then((res) => {
           
              return navigation.reset({
                index: 0, routes: [{
                  name: 'MainApp',
                  state: {
                    routes: [
                      {
                        name: "Home",
                      }
                    ]
                  }
                }]
              });
          })
        }
      });
    })
    .catch((err) => {
      console.log('err', JSON.stringify(err));
      showToasty(`Koneksi Internet tidak ada !!! (${err.message})`, 'show')

      err.isError = true;
      return dispatch(setError(err));
     
    })
    .finally(async () => {
      dispatch(setLoading(false));

    });
};

export const getDataApp = (navigation, isLoading) => async (dispatch) => {
  console.log('msg2 lb');
 
  await getData('masterParamList')
    .then(async (res) => {
      // console.log('res master data', res)
      if (res) {
        // alert(1)
        await dispatch({ type: 'SET_CEK_KETERANGAN', value: 'memeriksa master data...' });
        await dispatch({ type: 'SET_MASTER_PARAM', value: res?.value });
        await dispatch({ type: 'SET_LOADING_VALUE', value: 0.40 });

      } else {
        // alert(2)
        // await dispatch({type: 'SET_LOADING_VALUE', value: 0.40});
        await dispatch({ type: 'SET_CEK_KETERANGAN', value: 'memeriksa master data server...' });

        await axios
          .get(`${ApiConfig}/api/Master_Params?filter=%7B%22where%22%3A%7B%22and%22%3A%20%5B%7B%22status%22%3A%20%22Active%22%7D%5D%7D%7D`)
          .then(async (resMasterParam) => {
            await dispatch({ type: 'SET_LOADING_VALUE', value: 0.45 });
            // console.log('res global lb', resMasterParam);
            await dispatch({ type: 'SET_MASTER_PARAM', value: resMasterParam.data });
            await storeData('masterParamList', { value: resMasterParam.data });
          })
          .catch((err) => {
            err.isError = true
            dispatch(setError(err));
            showToasty(`Server sedang sibuk cobalah beberapa saat lagi ${err?.message} !!!`, 'error');

          })
      }
    })
 
 
 
  await getData('provinsiList')
    .then(async (res) => {
      if (res) {
        // alert(1)
        await dispatch({ type: 'SET_CEK_KETERANGAN', value: 'memeriksa data provinsi...' });

        await dispatch({ type: 'SET_PROVINSI', value: res.value });
        await dispatch({ type: 'SET_LOADING_VALUE', value: 0.60 });

      } else {
        // alert(2)

        dispatch({ type: 'SET_CEK_KETERANGAN', value: 'memeriksa data provinsi server...' });

        await axios.get(`${ApiConfig}/api/Provinces`)
          .then((resProvinsi) => {
            // console.log('resProvinsi',)
            dispatch({ type: 'SET_LOADING_VALUE', value: 0.65 });

            dispatch({ type: 'SET_PROVINSI', value: resProvinsi.data });
            //console.log('res resProvinsi lb', resProvinsi);
            storeData('provinsiList', { value: resProvinsi.data });
          })
          .catch((err) => {
            err.isError = true
            dispatch(setError(err));
            showToasty(`Server sedang sibuk cobalah beberapa saat lagi ${err?.message} !!!`, 'error');

          })
      }
    })
  
 
    await getData('barnerGlobalList').then(async (resBarnerList) => {
      //  storeData('barnerGlobalList', null);
      // console.log('resBarnerList',resBarnerList)
      if (resBarnerList) {
        resBarnerList?.value?.forEach((d, i) => {
          d.source = {
            uri: d.image_url,
          },
            d.title = d.judul
        })
        await dispatch({ type: 'SET_BARNER_GLOBAL', value: resBarnerList?.value });
      } else {
        await dispatch(getBarnerLB({ status: 'Active' }));
      }
    })
  // dispatch({type: 'SET_GLOBAL', value: true});
  await getData('authUser')
    .then(async (res) => {

      if (res) {
        getData('akunList').then(async (resAkunList) => {
          if (resAkunList) {
              await dispatch({type: 'SET_AKUN_LIST', value: resAkunList?.value});
            }
          })
        getData('token').then(async (resToken) => {
          if (resToken) {

          
          
           
          }
        })
       

        await dispatch({ type: 'SET_LOADING_VALUE', value: 0.96 });
        await dispatch({ type: 'SET_AUTH_USER', value: res });
        console.log('res',res)

        if (res?.fk_detail) {
          await dispatch({ type: 'SET_AUTH_DETAIL', value: res?.Detail });
        }
       
        
          return navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    
      } else {
        
            return navigation.replace('Intro');
         

      }
    })
    .finally(async () => {
      dispatch(setLoading(false));


    });
};

export const getFavoriteList = (params, paketList = [], onCallback = (res) => {}, onError = (err) => {}) => (dispatch) => {
  dispatch(setLoadingScreen(true));
  getData('authUser')
    .then((resAuth) => {
      if (!resAuth) {
        throw new Error('Authentication data not found');
      }
    const id = resAuth._id;
    getData('token').then((resAuthToken) =>{
      const token = resAuthToken.value;
      axios.get(`${ApiConfig}/api/Pakets/favorite/${id}`, {
        params: {
          filter: {
            include: ['Mitra', 'TypeDurasi'],
            order: 'updated_at Desc',
            offset: params?.page * params?.limit,
            limit: params?.limit,
          },
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("test", res.data)
        if (params?.page === 0) {
          dispatch({ type: 'SET_FAVORITE_LIST', favoriteList: res.data }); 
        } else {
          dispatch({ type: 'SET_FAVORITE_LIST', favoriteList: [...paketList, ...res.data] }); 
        }
        onCallback(res.data);
      })
      .catch((err) => {
        console.log('error', err);
        onError(err);
      })
      .finally(() => {
        dispatch(setLoadingScreen(false));
      });
    })
    .catch((err) => {
      console.log('error', err);
      onError(err);
    });
  })
  .catch((err) => {
    console.log('error', err);
    onError(err);
  });
};




