import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Axios from 'axios';
//import { API_HOST } from '../../config/API';
import ApiConfig from '../../config/ApiConfig';
import ApiHeader from '../../config/ApiHeader';
import { getData, showMessage, showToast, showToasty, storeData } from '../../utils';
import { setLoading } from './global';
// import ApiConfig from '../../config/ApiConfig';
import { getDataAppLB, setGlobal, setLoadingScreen } from '.';
import { getMyPayLB } from './myPay';


export const signUpActionLB = (dataRegister, onSuccess=()=>{},onError=()=>{}) => (dispatch) => {
  return new Promise(async (resolve,reject)=>{
    try{
      console.log('d register', dataRegister);
      dispatch(setLoading(true));
      const {data} =  Axios.post(`${ApiConfig}/api/users/pelanggan`, dataRegister, { header: ApiHeader })
      resolve(data)
      onSuccess(data)
    }catch(err){
      console.log('error', err);
      //showMessage(`Error Sign Up !!! ${err}`);
      showMessage(
        // `Error Sign Up , email / username sudah terdaftar, gunakan email atau username lain !!! ${err?.response?.data?.data?.message}`,
        `Error Sign Up , username/email sudah terdaftar, gunakan username atau email lain atau silahkan login !!! ${err}`,
        'danger',
      );
      reject(err)
      onError(err)
    }finally{
      dispatch(setLoading(false));
    }
  })
 

};

export const signInActionLB = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  showToast('Memproses...')
  console.log('formData', form)
  Axios.post(`${ApiConfig}/api/users/login`, form, { header: ApiHeader })
    .then((res) => {
      console.log('res login lb', res);
      storeData('token', { value: res.data.id });
      Axios.get(`${ApiConfig}/api/users/${res.data.userId}`, {
        params: {
          access_token: res.data.id
        }
      }, { header: ApiHeader })
        .then((resUser) => {
          console.log('user', resUser.data)
          const authUser = resUser.data;

          storeData('authUser', authUser);
          showMessage(`Success Sign In`, 'success')
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
          

        }, (err) => {
          console.log('err user', err)
          showMessage('Gagal login', 'danger')
        })
    })
    .catch((err) => {
      console.log('err', err);
      //showMessage(`Error Sign In !!! ${err?.response?.data?.data?.message}`);
      showToast(
        //`Error Sign In !!! ${ApiConfig} ${err?.response?.data?.errors}`,
        `Error Sign In (email atau password anda salah) !!! ${err}`,
        'error',
      );
    })
    .finally(() => {
      dispatch(setLoading(false));

    });

};

export const logoutActionLB = (authUser, navigation) => async (dispatch) => {
    dispatch(setGlobal(false));
    token = getData('token');
    await axios.post(`${ApiConfig}/api/users/logout?access_token=${authUser}` ); // tambahan kode untuk melakukan logout
    console.log("axios");
    console.log("Setglobalfalse");
    dispatch(setLoading(true));
    getData('token').then(async (resToken) => {
      await AsyncStorage.clear();
      try {
        dispatch({ type: 'SET_AUTH_USER', value: null });
        dispatch({ type: 'SET_AUTH_DETAIL', value: null });
        dispatch({ type: 'SET_TOKEN', value: null });
        console.log("try go")
      } catch (error) {
        console.error('err logout', error);
      }
      dispatch(setLoading(false));
      dispatch({ type: 'SET_IS_USER_ONLINE', value: false });
      console.log("Set user offline");
     
      navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
    })
};

export const getUsers = (user, token, onCallback = (res) => { }, onError = (err) => { }) => (dispatch) => {

  const users = [{
    _id: user
  }]
  // console.log('user', user)
  // console.log('token', token)
  // Axios.get(`http://hirata.id:3021/api/users?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22_id%22%3A%20%2262e770dbc9d16b28e00edbca%22%7D%5D%7D%7D&access_token=H6yajABqPhm28pkMAXBShyysftXuStqamg2udrrWONu9sLc8TLjH6DQ82JfDXHCv`,
  Axios.get(`${ApiConfig}/api/users`,
    {
      params: {
        filter: {
          where:
          {
            and: users
          },
        },
        access_token: token
      },
    },
    { header: ApiHeader }
  )
    .then((res) => {
      // console.log('res paket', res);
      dispatch({ type: 'SET_USER', value: res.data });
      onCallback(res.data)
    })
    .catch((err) => {
      console.log('error', err);
      onError(err)
      //showMessage(`Error Sign Up !!! ${err}`);

    })
}
export const updateUser = (form = {}, onSuccess = () => { }, onError=()=>{}) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('formData', form)
      dispatch(setLoading(true));
      await getData('token').then(async (resToken) => {
        await getData('authUser').then(async (resAuthUser) => {
          const settings = {
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              Authorization: resToken?.value,
            },
          };
          const authUserNew = {
            ...resAuthUser,
            ...form,
          }

          const { data } = await Axios.patch(`${ApiConfig}/api/users/${resAuthUser._id}`, authUserNew, settings)
          await storeData('authUser', authUserNew);
          await dispatch({type: 'SET_AUTH_USER', value: authUserNew});
          await showMessage(`Berhasil updata akun`, 'success')
          await resolve(data)
          await onSuccess(data)
        })
      })


    } catch (err) {
      console.log('err', err)
      showToast(
        //`Error Sign In !!! ${ApiConfig} ${err?.response?.data?.errors}`,
        `Gagal memperbarui akun ${err}`,
        'error',
      );
      reject(err)
      onError(err)
    } finally {
      dispatch(setLoading(false));

    }
  })
};
export const sendOtpEmail = (form = {}, onSuccess = () => { }, onError=()=>{}) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('formData', form)
      await dispatch(setLoading(true));
          const settings = {
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              // Authorization: resToken?.value,
            },
          };

          const { data } = await Axios.post(`${ApiConfig}/api/acls/sendEmail`, form, settings)
          // await storeData('authUser', authUserNew);
          // await dispatch({type: 'SET_AUTH_USER', value: authUserNew});
          await showMessage(`Berhasil mengirim otp ke email`, 'success')
          await resolve(data)
          await onSuccess(data)


    } catch (err) {
      console.log('err', err)
      showToast(
        //`Error Sign In !!! ${ApiConfig} ${err?.response?.data?.errors}`,
        `Gagal mengirim otp ke email ${err}`,
        'error',
      );
      reject(err)
      onError(err)
    } finally {
      await dispatch(setLoading(false));

    }
  })
};
export const validationOTP = (form = {}, onSuccess = () => { }, onError=()=>{}) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('formData', form)
      dispatch(setLoading(true));
          const settings = {
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              // Authorization: resToken?.value,
            },
          };

          const { data } = await Axios.post(`${ApiConfig}/api/acls/validationOTP`, form, settings)
          console.log('data',data)
          // await storeData('authUser', authUserNew);
          // await dispatch({type: 'SET_AUTH_USER', value: authUserNew});
          if(data.data.isValid){
            await showMessage(`Terverfikasi`, 'success')
            await resolve(data)
            await onSuccess(data)
          }else{
            await showMessage(`Kode OTP anda salah`, 'danger')
            await reject(data)
            await onError(data)
          }
       
          


    } catch (err) {
      console.log('err', err)
      showToast(
        //`Error Sign In !!! ${ApiConfig} ${err?.response?.data?.errors}`,
        `Gagal mengirim otp ke email ${err}`,
        'error',
      );
      reject(err)
      onError(err)
    } finally {
      dispatch(setLoading(false));

    }
  })
};

