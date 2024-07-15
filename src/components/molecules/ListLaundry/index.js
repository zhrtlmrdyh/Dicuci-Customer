import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useRef} from 'react';
import {Checkbox} from 'react-native-paper';
import ms from '../../../utils/ms';
import {IconVerify, IconTrash} from '../../../assets/icon';
import Number from '../Number';
import {Gap} from '../../atoms';
import {windowHeight, windowWidth} from '../../../utils/constants';
import {colors} from '../../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';

const ListLaundry = ({lb={}, onPress}) => {
    const [checked2, setChecked2] = useState(false);
  return (
    <View>
      {/* laundry bag */}
      <View style={[ms.pdH(16)]}>
        <View style={[ms.pdB(14), ms.row, ms.ai('center')]}>
          <View style={[ms.mgR(16)]}>
            <Checkbox
              status={checked2? 'checked' : 'unchecked'}
              color="#222222"
              uncheckedColor="#222222"
              onPress={() => {
                setChecked2(!checked2);
                refSheet.current.open();
              }}
              style={[ms.wh(16, 16)]}
            />
          </View>

          <TouchableOpacity style={[ms.row]} onPress={onPress}>
            <Image
              source={{
                uri: lb?.Paket?.image_url1,
              }}
              style={[ms.width((windowWidth * 20) / 100), ms.height(65)]}
            />

            <View style={[ms.pdL(14)]}>
              <Text style={[ms.fzBC(12, '700', '#000000')]}>
                {lb?.Paket?.name}
              </Text>
              <View style={[ms.row, ms.ai('center')]}>
                <Text style={[ms.fzBC(12, '400', '#9DA8B1')]}>Parfum :</Text>
                <View style={[ms.cardParfum]}>
                  <Text
                    style={[
                      ms.fzBC(10, '400', colors.primary),
                      ms.txA('center'),
                    ]}>
                    {/* {lb?.Paket?.Mitra?.parfum?.name} */}
                  </Text>
                </View>
              </View>
              <View style={[ms.pdT(14), ms.width((windowWidth * 13) / 100)]}>
                <Text style={[ms.fzBC(10, '700', '#FFAA00')]}>
                  <Number number={lb?.Paket?.biaya} />
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={[
              ms.row,
              // ms.aiJc('center', 'space-between'),
              ms.mgT(40),
              ms.l(-15),
              ms.width((windowWidth * 0) / 100),
            ]}>
            <View
              style={[
                ms.row,
                ms.aiJc('center'),
                // ms.pdL(58),
              ]}>
              <TouchableOpacity style={[ms.mgR(8), ms.width((windowWidth * 5) / 100)]}>
                <Image source={IconTrash} />
              </TouchableOpacity>

              <View
                style={[
                  ms.aiJc('center', 'space-between'),
                  ms.row,
                  ms.bdW(1),
                  ms.bdR(4),
                  ms.bdC('#222222'),
                  ms.wh(69, 16),
                  ms.pdH(8),
                  // ms.mgT(45),
                ]}>
                <TouchableOpacity
                  onPress={() => {}}>
                  <Feather name='minus' style={[ms.textNormalBold(12)]} />
                </TouchableOpacity>
                <View>
                  <Text
                    style={[ms.txA('center'), ms.fzBC(10, '400', '#000000')]}>
                    1
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {}}>
                  <Feather name='plus' style={[ms.textNormalBold(12)]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={[ms.pdL(8)]} onPress={()=> refSheet.current.open()}>
          <Text style={[ms.fzBC(12, '400', '#41A3F0')]}>Tulis Catatan</Text>
        </TouchableOpacity>
      </View>

      <View style={[ms.pdV(14)]}>
        <Gap height={1} backgroundColor={'#F5F5F5'} />
      </View>
    </View>
  )
}

export default ListLaundry;