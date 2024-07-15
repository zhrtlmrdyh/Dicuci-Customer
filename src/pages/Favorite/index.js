import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import ms from '../../utils/ms'
import { windowWidth } from '../../utils/constants'
import { colors } from '../../utils'
import { IconBaju, IconBell, IconCart, IconDress, IconSepatu} from '../../assets/icon'
import { Paket } from '../../components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoriteList } from '../../redux/action'
import { useEffect } from 'react'


const Favorite = ({ navigation }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(state => state.globalReducer.favoriteList || []);


  const [param, setParam] = useState({
    page: 0,
    limit: 10,
  });


  useEffect(() => {
    dispatch(getFavoriteList(param));
  }, [param]);  

  return (
    <View style={[ms.containerPage, ms.pd(16)]}>
      <ScrollView>
        <View style={[ms.row]}>
          <View style={[ms.width('72%')]}>
            <Text style={[ms.fzBC(24, '700', '#222222'), ms.pdR(135)]}>Favorite</Text>
          </View>
          <View style={[ms.width('12%'), ms.mgR(7)]}>
            <TouchableOpacity onPress={() => navigation.navigate('LaundryBag')}>
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
          <View style={[ms.pdV(10), ms.pdB(100)]}>
            {favoriteList.map((paket, index) => (
              <Paket
                key={index}
                paket={paket}
                onPress={() => {
                  dispatch({ type: 'SET_PAKET', value: paket });
                  navigation.navigate('DetailPaket');
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  wrapperMainFeature: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 0,
    flexWrap: 'wrap',
  },
});