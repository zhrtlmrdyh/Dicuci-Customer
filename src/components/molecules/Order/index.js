import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {IconBaju, IconLaundry, IconVerifikasi} from '../../../assets/icon';
import {colors} from '../../../utils';
import {windowWidth} from '../../../utils/constants';
import ms from '../../../utils/ms';
import Number from '../Number';

// import Icon from 'react-native-vector-icons/FontAwesome5';
const Order = ({myorders, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[ms.cardOrder, ms.pdH(16)]}>
        <View
          style={[
            ms.row,
            ms.ai('center'),
            ms.bdBw(1),
            ms.bdC('#E7E7E7'),
            ms.pdB(10),
            ms.mgB(16),
          ]}>
          <View style={[ms.pdR(12)]}>
            <View style={[ms.width((windowWidth * 5) / 100)]}>
              <Image
                source={IconLaundry}
                style={[ms.wh(28, 28)]}
              />
            </View>
          </View>
          <View style={[ms.width((windowWidth * 20) / 100)]}>
            <Text style={[ms.fzBCLh(10, '700', '#000000', 12)]}>
              Paket Cuci
            </Text>
            <Text style={[ms.fzBCLh(10, '400', '#000000', 12)]}>
              {moment(myorders?.tgl_pesanan).format("DD MMMM YYYY")}
            </Text>
          </View>
          <View style={[ms.mgL(120)]}>
            <View style={[ms.width((windowWidth * 28) / 100), ms.aiJc('center')]}>
              <Text
                style={[
                  ms.fzBC(10, '900', '#41A3F0'),
                  ms.cardBlue,
                  ms.txA('center'),
                  ms.pdV(3),
                  ms.pdH(16),
                ]}>
                {myorders?.Status?.deskripsi}
              </Text>
            </View>
          </View>
        </View>
        <View style={[ms.row]}>
          <Image style={[ms.wh(68, 54.25)]} source={{uri : myorders?.list_paket[0]?.image_url1}} />
          <View style={[ms.pdL(10)]}>
            <Text style={[ms.fzBCLh(12, '700', '#000000', 14)]}>
            {myorders?.list_paket[0]?.name}
            </Text>
            <Text style={[ms.fzBCLh(10, '400', '#000000', 12)]}>
              {myorders?.list_paket.length} Paket
            </Text>
          </View>
        </View>
        <View style={[ms.row, ms.mgT(16), ms.pdB(12)]}>
          <View>
            <Text style={[ms.fzBC(10, '400', '#000000'), ms.mgB(8)]}>
              Total Bayar
            </Text>
            <Text
              style={[
                ms.fzBCLh(10, '700', '#41A3F0', 12),
                ms.cardBlue,
                ms.pdV(3),
                ms.pdH(9),
              ]}>
              <Number number={myorders?.total_biaya} />,-
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Order;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({});
