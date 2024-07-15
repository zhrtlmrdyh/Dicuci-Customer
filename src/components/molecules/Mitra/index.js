import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IconBaju, IconMitra, IconVerifikasi } from '../../../assets/icon';
import { colors } from '../../../utils';
import { windowWidth } from '../../../utils/constants';
import ms from '../../../utils/ms';
import { ButtonL, Gap } from '../../atoms';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Mitra = ({ mitra = {}, onPress, Press, width = windowWidth, height = 60, navigation}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[ms.wh(width, height)]} >
      <View style={[ms.row]}>
        <View style={[ms.width('20%'), ms.aiJc()]}>
          <Image source={IconMitra} resizeMethod="resize" style={[ms.wh(40, 40)]} />
        </View>
        <View>
          <View>
            <View style={[ms.row, ms.ai()]}>
              <View style={[ms.width('45%')]}>
                <View style={[ms.pdV(5)]}>
                  <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}><Image source={IconVerifikasi} style={[ms.wh(12, 12)]} />  {mitra?.name}</Text>
                </View>
                <View style={[ms.width('50%')]}>
                  <Text style={[ms.fzBCLh(12, '500', '#222222', 15)]}><Icon name="star" /> {mitra?.rating} rating mitra</Text>
                </View>
              </View>
              <View style={[ms.width('55%'), ms.mgT(8)]}>
                <ButtonL onPress={Press} label="Lihat Mitra" fontSize={12} color="#41A3F0" borderColor="#41A3F0" borderRadius={5}/>
              </View>
            </View>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default Mitra;

const styles = StyleSheet.create({

});
