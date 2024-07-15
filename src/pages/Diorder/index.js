import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback} from 'react';
import ms from '../../utils/ms';
import Feather from 'react-native-vector-icons/Feather';
import {Order} from '../../components';
import {
  IconBaju,
  IconBell,
  IconCart,
  IconWaiting,
  IconDouble,
  IconDress,
  IconLaundry,
} from '../../assets/icon';
import {colors, getData} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {windowWidth} from '../../utils/constants';
import {getMyOrderList, getMyOrderStatusCount } from '../../redux/action/myorders';

const DiOrder = ({navigation}) => {
  const {myorders, count} = useSelector(state => state.myorderReeducer);
  console.log('Global : -----',myorders);
  console.log('count : -----',count);
  const dispatch = useDispatch();

  // variabel status pembayaran
  const [payment_status, setPaymentStatus] = useState('Belum Dibayar');

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = useState(false);

  const [param, setParam] = useState({
    page: 0,
    limit: 10,
  });

  // const findStatus = () => {
  //   myorders.filter(
  //     p => p?.Status?.deskripsi == payment_status,
  //   );
  //   if(findStatus){
  //     myorders
  //   }
  // }

  const init = async () => {
    getData('authUser').then(resAuthUser => {
      if (resAuthUser?._id) {
        dispatch(getMyOrderList(param, resAuthUser?._id, myorders));
        dispatch(getMyOrderStatusCount("62e776eb7fea0747c890b624", resAuthUser?._id))
      }
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
    setRefreshing(false)
    init()
    });
  }, []);

  useEffect(() => {
    if (navigation.isFocused()) {
      init();
    }
  }, [navigation]);

  return (
    <View style={[ms.containerPage, ms.pd(16)]}>
      <ScrollView 
      // refreshControl={
      //     <RefreshControl
      //       refreshing={refreshing}
      //       onRefresh={onRefresh}
      //     />
      //   }
        >
        <View style={[ms.row]}>
          <View style={[ms.width('72%')]}>
            <Text style={[ms.fzBC(24, '700', '#222222'), ms.pdR(135)]}>
              My Order
            </Text>
          </View>
          <View style={[ms.width('12%'), ms.mgR(7)]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LaundryBag');
              }}>
              <Image source={IconCart} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
          <View style={[ms.width('12%')]}>
            <TouchableOpacity>
              <Image source={IconBell} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={ms.mgT(36)}>
        
          <TouchableOpacity 
            style={[ms.bdW(1),ms.bdC('#E7E7E7'),ms.bdR(10),ms.row,ms.height(57)]}
            myorder={myorders}
            onPress={() => {
              // onPaymentItem("Belum Dibayar")
              navigation.navigate("MenungguPembayaran")}}
            >
            <View style={[ms.width((windowWidth * 8) / 100)]}>
              <Image
                style={[ms.width(29), ms.height(32), ms.l(16), ms.t(12)]}
                source={IconWaiting}
              />
            </View>
            <View style={[ms.width((windowWidth * 15) / 100)]}>
              <Text
                style={[
                  ms.fzBCLh(14, '700', '#FFAA00', 17),
                  ms.l(25),
                  ms.t(19),
                  ms.pdR(6),
                ]}>
                {count?.count} Paket
              </Text>
            </View>
            <View style={[ms.width((windowWidth * 36) / 100)]}>
              <Text
                style={[
                  ms.fzBCLh(12, '700', colors.black, 14),
                  ms.l(20),
                  ms.t(21),
                ]}>
                Menunggu Pembayaran
              </Text>
            </View>
            <View style={[ms.width((windowWidth * 50) / 100)]}>
              <Feather
                style={[ms.fzBC(22, 1.5, '#9DA8B1'), ms.l(80), ms.t(18)]}
                name="chevron-right"
              />
            </View>
          </TouchableOpacity>
          
        </View>

        <View style={[ms.pdV(10), ms.pdB(100)]}>
          {myorders.map((myorder, index) => {
            return (
              <Order
                key={index}
                myorders={myorder}
                onPress={() => {
                  dispatch({type: 'SET_ORDER', value: myorder});
                  navigation.navigate('DetailOrder');
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default DiOrder;

const styles = StyleSheet.create({});
