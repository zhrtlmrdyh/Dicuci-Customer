import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {IconBaju, IconVerifikasi, IconLaundry} from '../../../assets/icon';
import {colors} from '../../../utils';
import {windowWidth} from '../../../utils/constants';
import ms from '../../../utils/ms';
import { ButtonL } from '../../atoms';
import moment from 'moment';
import Number from '../Number';

const Pembayaran = ({myorder, onPress, Press, navigation}) => {
    return (
        <TouchableOpacity onPress={onPress}>
          <View style={[ms.cardOrder]}>
            <View
              style={[
                ms.row,
                ms.bdBw(1),
                ms.bdC('#E7E7E7'),
                ms.pdB(10),
                ms.mgB(16),
              ]}>
              <View style={[ms.pdR(12)]}>
                <View style={[ms.width((windowWidth * 7) / 100)]}>
                  <Image
                    source={IconLaundry}
                    style={[ms.wh(28, 28)]}
                  />
                </View> 
              </View>
              <View style={[ms.width((windowWidth * 18) / 100)]}>
                <Text style={[ms.fzBCLh(10, '700', '#000000', 12)]}>
                  Paket Cuci
                </Text>
                <Text style={[ms.fzBCLh(10, '400', '#000000', 12)]}>
                {moment(myorder?.tgl_pesanan).format("DD MMMM YYYY")}
                </Text>
              </View>
              <View style={[ms.mgL(120)]}>
                <View style={[ms.width((windowWidth * 28) / 100), ms.aiJc('center')]}>
                  <Text
                    style={[
                      ms.fzBC(10, '900', '#FFAA00'),
                      ms.cardOren,
                      ms.pdV(3),
                      ms.pdH(16),
                    ]}>
                    {myorder?.Status?.deskripsi}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[ms.row]}>
              <Image style={[ms.wh(68, 54.25)]} source={{uri: myorder?.list_paket[0]?.image_url1}} />
              <View style={[ms.pdL(10)]}>
                <Text style={[ms.fzBCLh(12, '700', '#000000', 14)]}>
                  {myorder?.list_paket[0]?.name}
                </Text>
                <Text style={[ms.fzBCLh(10, '400', '#000000', 12)]}>
                  {/* {myorder?.list_paket[0]?.name} */} {myorder?.list_paket.length} Paket
                </Text>
              </View>
            </View>
            <View style={[ms.row, ms.mgT(16), ms.pdB(12)]}>
                <View style={[ms.wh('70%', '100%')]}>
                    <Text style={[ms.fzBCLh(10, '400', '#000000', 12), ms.mgB(8)]}>
                    Total Bayar
                    </Text>
                    <Text
                    style={[
                        ms.fzBCLh(10, '700', '#41A3F0', 12),
                        ms.cardBlue,
                        ms.pdV(3),
                        ms.pdH(9),
                        ms.width(72)
                    ]}>
                    <Number number={myorder.total_biaya} />,-
                    </Text>
                </View>
                <View style={[ms.width('30%'), , ms.aiJc()]}>
                    <ButtonL
                        onPress={Press} 
                            width={101} 
                            height={26} 
                            label="Bayar Sekarang" 
                            fontSize={12} 
                            color={colors.white} 
                            borderColor={colors.primary} 
                            backgroundColor={colors.primary} 
                            borderRadius={6}/>
                </View>
            </View>
          </View>
        </TouchableOpacity>
      );
}

export default Pembayaran;