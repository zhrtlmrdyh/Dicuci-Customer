import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { IconBack } from '../../../assets/icon';
import { windowHeight, windowWidth } from '../../../utils/constants';
import ms from '../../../utils/ms';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../utils';
const MetodePembayaran = ({
  height = 60,
  width= windowWidth - 40,
  metodePembayaran,
  isSelected=false,
  ...props
}) => {

  return (
    <View style={[ms.pd(5)]}>
      <TouchableOpacity {...props} style={[ms.row,ms.wh(width, height), ms.bdW(1), ms.bdR(8), ms.bdC('#E7E7E7'), ms.bc(isSelected ? 'rgba(65, 163, 240, 0.1)': colors.white)]}>
       <View style={[ms.width('80%'), ms.jc(), ms.pdH(20), ms.pdV(16)]}>
          <Text style={[ms.fzBCLh(16,'600','#000000',20)]}>{metodePembayaran?.name}</Text>
       </View>
       <View style={[ms.width('20%'), ms.pd(10), ms.aiJc()]}>
          <Image source={metodePembayaran?.icon} style={[ms.wh('60%', 30)]}/>
       </View>
      </TouchableOpacity>
    </View>
  );
};

export default MetodePembayaran;

//const styles = StyleSheet.create({});
