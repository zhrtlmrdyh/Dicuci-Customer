import {View, Text, Image} from 'react-native';
import React from 'react';
import ms from '../../../utils/ms';
import {IconTopMitra, IconLineBoldGrey, IconRedLocation} from '../../../assets/icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';

const MitraHeader = ({onPress}) => {
  const {paket} = useSelector(state => state.homeReducer);
  return (
    <View style={[ms.containerPage]}>
      <View style={[ms.mgB(33)]}>
        <Text style={[ms.fzBC(20, '700', '#000000'), ms.mgB(16)]}>
          {paket?.Mitra?.name}, {paket?.Mitra?.alamat_lengkap}
        </Text>
        <Image style={[ms.wh(109, 24)]} source={IconTopMitra} />
      </View>

      <View style={[ms.row]}>
        <View style={[ms.row, ms.ai('center')]}>
          <View style={[ms.pdR(25)]}>
            <Text style={[ms.txA('center'), ms.fzBC(14, '800', '#000000')]}>
              <Icon name="star" solid color={colors.yellow} /> {paket?.rating}
            </Text>
            <Text style={[ms.txA('center'), ms.fzBC(10, '400', '#41A3F0')]}>
              Lihat Ulasan
            </Text>
          </View>
          <Image source={IconLineBoldGrey} />
        </View>

        <View style={[ms.row, ms.ai('center')]}>
          <View style={[ms.mgR(27), ms.mgL(27)]}>
            <Text style={[ms.txA('center'), ms.fzBC(14, '800', '#000000'), ]}>
              <Image source={IconRedLocation} /> {paket?.jarak} m
            </Text>
            <Text style={[ms.txA('center'), ms.fzBC(10, '400', '#9DA8B1')]}>
              Jarak
            </Text>
          </View>
          <Image source={IconLineBoldGrey} />
        </View>

        <View style={[ms.row, ms.ai('center')]}>
          <View style={[ms.mgR(15), ms.mgL(15)]}>
            <Text style={[ms.txA('center'), ms.fzBC(14, '800', '#000000'), ]}>
              {paket?.jam_operasional}
            </Text>
            <Text style={[ms.txA('center'), ms.fzBC(10, '400', '#9DA8B1')]}>
              Jam Operasional
            </Text>
          </View>
          <Image source={IconLineBoldGrey} />
        </View>

      </View>
    </View>
  );
};

export default MitraHeader;
