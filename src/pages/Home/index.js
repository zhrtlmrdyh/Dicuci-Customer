import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import ms from '../../utils/ms'
import { windowWidth } from '../../utils/constants'
import { IconAll, IconBaju, IconBarnner, IconBell, IconCar, IconCart, IconDelivery, IconDicuci, IconDress, IconFastDelivery, IconFreeDelivery, IconLocation, IconPromo, IconReport, IconSepatu, IconStarMitra, IconUser } from '../../assets/icon'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../utils'
import { Gap, Loading, MainFeature, Paket } from '../../components'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
// import Realm from "realm";
import { getPaketList } from '../../redux/action/home'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../utils'
import { getUsers, updateUser } from '../../redux/action'
import { getLaundryBagList } from '../../redux/action/laundry'
import { useCallback } from 'react'
import Geolocation from 'react-native-geolocation-service';

// const TaskSchema = {
//   name: "Task",
//   properties: {
//     _id: "int",
//     name: "string",
//     status: "string?",
//   },
//   primaryKey: "_id",
// };
// (async () =>{
//   const realm = await Realm.open({
//     path: "myrealm",
//     schema: [TaskSchema],
//   });

//   // realm.write(() => {
//   // const  task1 = realm.create("Task", {
//   //     _id: 5,
//   //     name: "go grocery shopping",
//   //     dateCreated: Date.now(),
//   //     status: "Open",
//   //   });
//   //  const task2 = realm.create("Task", {
//   //     _id: 6,
//   //     name: "go exercise",
//   //     dateCreated: Date.now(),
//   //     status: "Open",
//   //   });
//   //   // console.log(`created two tasks: ${task1?.name} & ${task2?.name}`);
//   // });

//   //#read record from database
//   const tasks = realm.objects("Task");
//   console.log('tasks', tasks)
// // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
// tasks.map((task) => {
//   console.log(task)
// })
//read one record from database
// const myTask = realm.objectForPrimaryKey("Task", 1)
// //   console.log(`created 1 tasks: ${myTask?.name} & ${myTask?.name}`);
// //#modife one data from database
// realm.write(() => {
//   let myTask = realm.objectForPrimaryKey("Task", 1)
//   console.log(`created 1 tasks: ${myTask?.name} & ${myTask?.name} & ${myTask?.status}`);
//   myTask.status = "Open"

// })

// //#delete one data from database
// try{
//   realm.write(() => {
//     let myTask = realm.objectForPrimaryKey("Task", 2);
//     console.log('mytask', myTask)
//     if(myTask){
//       console.log(`deleted 1 tasks: ${myTask?.name} & ${myTask?.name} & ${myTask?.status}`);
//       realm.delete(myTask)
//     }
   
  
//   })
// }catch(err){
//   console.log('err',err)
// }

// })();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoadingScreen } = useSelector((state) => state.globalReducer);
  const { paketList } = useSelector((state) => state.homeReducer);
  const { user } = useSelector((state) => state.userReducer);
  const {checkoutPaket, laundryBagList} = useSelector(state => state.laundryBagReducer);
  // console.log('laundry', laundryBagList)
  // const { user } = useSelector((state) => state.userReducer)

  const [param, setParam] = useState({
    page: 0,
    limit: 10
  })
 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);
  const getLocationUser = (status) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('p', position);
        const onSuccess = (data)=>{

        }
        const onError = (data)=>{
          
        }
        const formLocation = {
          latitude: position?.coords?.latitude,
          longitude : position?.coords?.longitude
        }
        dispatch(updateUser(formLocation,onSuccess,onError))
        // showToasty('Berhasil mendapatan lokasi', 'show');
        // Geocoder.from({
        //   lat: position?.coords?.latitude,
        //   lng: position?.coords?.longitude

        // }).then(async (res) => {
        //   console.log('res', res)
        //   setlocationNew(true)
        //   // setLocation(res?.plus_code?.compound_code)
        //   const authUserNew = {
        //     ...authUser,
        //     latitude: position?.coords?.latitude,
        //     longitude: position?.coords?.longitude,
        //     location: res?.plus_code?.compound_code,
        //     // get_space: {
        //     //   ...authUser.get_space,
        //     //   latitude: position?.coords?.latitude,
        //     //   longitude: position?.coords?.longitude,
        //     //   location: res?.plus_code?.compound_code,
        //     // }
        //   }

        //   await dispatch(setUserLocationLB({
        //     user_id: authUser?.id,
        //     latitude: position?.coords?.latitude,
        //     longitude: position?.coords?.longitude,
        //     location: res?.plus_code?.compound_code,
        //   }))
        //   await dispatch({ type: 'SET_AUTH_USER', value: authUserNew });
        //   await storeData('authUser', authUserNew);


        // })
        //   .finally(() => {
        //     dispatch({ type: 'SET_IS_GET_LOCATION', value: true });
        //     // navigation.replace('MyTravel');
        //   })
      },
      (error) => {
        // See error code charts below.
        console.log('err', error.code, error.message);
        // dispatch({ type: 'SET_IS_GET_LOCATION', value: true });
        //  return navigation.replace('MyTravel');

      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const fetchData = async () => {
      getData('authUser').then((resAuthUser)=>{
          if(resAuthUser?._id){
              getData('token').then((restToken)=> {
                dispatch( getUsers(resAuthUser?._id, restToken?.value));
              })
          }
      })
    }
    const requestPermissions = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
      }
  
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "Aplikasi membutuhkan izin kamera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } 
  const init = async () =>{
    await fetchData();
    await requestPermissions();   
    await getLocationUser();
     await dispatch(getPaketList(param,paketList))
     await dispatch(getLaundryBagList(param, laundryBagList))
    
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
    setRefreshing(false)
    init()
    });
  }, []);

  useEffect(()=>{
    if(navigation?.isFocused){
      init()
    };
    
   
  },[navigation])
  return (
    <View style={[ms.containerPage]}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            
          />
      }>
        <View style={[ms.row, ms.pdV(14)]}>
          <View style={[ms.width(windowWidth * 20 / 100)]}>
            <View style={[ms.aiJc()]}>
              <Image source={IconUser} style={[ms.wh(42, 42)]} />
            </View>
          </View>
          <View style={[ms.width(windowWidth * 50 / 100)]}>
            <View style={[ms.jc()]}>
              <Text style={[ms.fzBC(16, '500', '#222222')]}>Hello, {user[0]?.name}</Text>
            </View>
            <View style={[ms.jc()]}>
              <Text style={[ms.fzBC(12, '400', '#222222')]}><Icon name="map-marker-alt" color={colors.primary} size={14} />{user[0]?.location}</Text>
            </View>
          </View>
          <View style={[ms.width(windowWidth * 13 / 100)]}>
            <TouchableOpacity style={[ms.aiJc()]} onPress={()=>{navigation.navigate('LaundryBag')}}>
              <Image source={IconCart} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
          <View style={[ms.width(windowWidth * 13 / 100)]}>
            <TouchableOpacity 
              style={[ms.aiJc()]} 
              // onPress={()=>{navigation.navigate('Login')}}
              onPress={()=>{
                AsyncStorage.clear();
                navigation.navigate("Login")
              }}
            >
              <Image source={IconBell} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image source={IconBarnner} style={[ms.wh(windowWidth, 170)]} />
        </View>
        <View style={[ms.pdV(10)]}>
          <View style={[ms.pd(16)]}>
            <Text style={[ms.fzBC(14, '500', '#222222')]}>Kategori</Text>
          </View>
          <View style={styles.wrapperMainFeature}>
            <MainFeature title={"Star Mitra"} img={IconStarMitra} onPress={() => {
              // getDataRealm()
             }} width={"20%"} />
            <MainFeature title={"Di Sekitar"} img={IconLocation} onPress={() => { 
              // insertDataRealm()
            }} width={"20%"} />
            <MainFeature title={"Promo"} img={IconPromo} onPress={() => { }} width={"20%"} />
            <MainFeature title={"Delivery"} img={IconDelivery} onPress={() => { }} width={"20%"} />
          </View>
          <Gap height={15} />
          <View style={styles.wrapperMainFeature}>
            <MainFeature title={"Gratis Ongkir"} img={IconFreeDelivery} onPress={() => { }} width={"20%"} />
            <MainFeature title={"Laundry Kilat"} img={IconFastDelivery} onPress={() => {
              navigation.navigate("CashierReport")
             }} width={"20%"} />
            <MainFeature title={"Gratis Ongkir"} img={IconFreeDelivery} onPress={() => {
              navigation.navigate("Cashier")
             }} width={"20%"} />
            <MainFeature title={"Semua"} img={IconAll} onPress={() => { }} width={"20%"} />
          </View>
        </View>
        <Gap height={4} backgroundColor={"#F5F5F5"} />
        {/* <View style={[ms.pdV(10)]}>
          <View style={[ms.pd(16)]}>
            <Text style={[ms.fzBC(14, '500', '#222222')]}>Cashier Mode</Text>
          </View>
          
          <View style={[styles.wrapperMainFeature, {justifyContent : 'flex-start'}]}>
            
            <MainFeature title={"Carwash"} img={IconCar} onPress={() => {
              navigation.navigate("Cashier")
             }} width={"20%"} />
            <MainFeature title={"Semua"} img={IconReport} onPress={() => { 
               navigation.navigate("CashierReport")
            }} width={"20%"} />
          </View>
        </View> */}
        <View style={[ms.pdH(12)]}>
          <View style={[ms.pdV(10)]}>
            <Text style={[ms.fzBC(16, '600', '#222222')]}>Rekomendasi Paket <Image source={IconDicuci} style={[ms.wh(50, 14)]} /></Text>
          </View>
          <View style={[ms.pdV(10), ms.pdB(100)]}>
            {
              paketList.map((paket, index) => {
                return (
                  <Paket
                    key={index}
                    paket={paket}
                    onPress={() => {
                      dispatch({ type: 'SET_PAKET', value: {
                        ...paket,
                        fk_status: "62e764b899b8110730e94461",
                        Status: {
                          _id: "62e764b899b8110730e94461",
                          code: "SOOD",
                          type: "status_order",
                          deskripsi: "Order Diterima",
                          no: 1,
                        },
                        qty: 1,
                        biaya_satuan: paket?.biaya * 1,
                        berat: 1,
                        tracking_status: [],
                        parfum: "Tanpa Parfum"
                      }});
                      dispatch({
                        type: 'SET_CHECKOUT_PAKET', value: {
                          ...checkoutPaket,
                            _id: paket?._id,
                            fk_mitra: paket?.fk_mitra,
                            fk_status: "62e764b899b8110730e94461",
                            name: paket?.name,
                            image_url1: paket?.image_url1,
                            image_url2: null,
                            image_url3: null,
                            biaya: paket?.biaya,
                            min_berat: 2,
                            qty: 1,
                            biaya_satuan: paket?.biaya * 1,
                            berat: 1,
                            tracking_status: [],
                        }
                      })
                      navigation.navigate("DetailPaket")
                    }}

                  />)
              })
            }
            {
              isLoadingScreen && (
                <View style={[ms.wh('100%',100)]}>
                  <Loading />
                </View>
              )
            }
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  wrapperMainFeature: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 0,
    flexWrap: 'wrap',
  },
})