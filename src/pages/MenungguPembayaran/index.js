import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native"
import React from "react";
import { useState, useEffect } from "react";
import ms from "../../utils/ms";
import { windowWidth } from "../../utils/constants";
import { 
    IconBack, 
    IconBell, 
    IconBaju, 
    IconCart,
    IconWaiting,
    IconDouble,
    IconDress,
    IconLaundry,
} from "../../assets/icon";
import { colors } from "../../utils";
import { Order, Pembayaran } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { getMyOrderPayment } from "../../redux/action/myorders";
import { getData } from "../../utils";

const MenungguPembayaran = ({navigation, onPress}) => {
    const {myorder, myorderPaymentList} = useSelector(state => state.myorderReeducer);
    const dispatch = useDispatch();
    console.log('order', myorderPaymentList)
    const [param, setParam] = useState({
      page: 0,
      limit: 10,
    });
  
    const init = async () => {
      getData('authUser').then((resAuthUser)=>{
        if(resAuthUser?._id){
          dispatch(getMyOrderPayment(param, resAuthUser?._id, myorderPaymentList));
        }
      })
    };
  
    useEffect(() => {
      if (navigation.isFocused()) {
        init();
      }
    }, [navigation]);
    
    return (
        <SafeAreaView style={[ms.containerPage]}>
            <View style={[ms.row, ms.pdV(16), ms.pdH(18), ms.width(windowWidth)]}>
                <View style={[ms.row, ms.width('90%')]}>
                    <View style={[ms.aiJc]}>
                        <TouchableOpacity 
                            onPress={() => {navigation.goBack()}}>
                            <Image
                            source={IconBack}
                            style={[ms.wh(35,35)]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[ms.mg(5), ms.mgL(16)]}>
                        <View style={[ms.aiJc]}>
                            <Text style={[ms.fzBC(16, '600', colors.dark)]}>Menunggu Pembayaran</Text>
                        </View>
                    </View>
                </View>

                <View style={[ms.row, ms.width('10%')]}>
                    <Image
                    source={IconBell}
                    style={[ms.wh(42, 42)]}
                    />
                </View>
          </View>

          <ScrollView>
            <View style={[ms.pdV(10), ms.pdB(100), ms.pdH(18)]}>
              {myorderPaymentList.map((myorder, index) => {
                  return (
                  <Pembayaran
                    key={index}
                    myorder={myorder}
                    onPress={() => {
                      dispatch({type: 'SET_ORDER', value: myorder});
                      navigation.navigate('DetailOrder');
                    }}
                    Press={() => {
                      dispatch({type: 'SET_ORDER', value: myorder});
                      navigation.navigate('MetodePembayaran');
                    }}
                    onPaymentItem={myorder?.Status?.deskripsi}
                  />
                  );
                })}
            </View>
          </ScrollView>

        </SafeAreaView>
    )
}

export default MenungguPembayaran;