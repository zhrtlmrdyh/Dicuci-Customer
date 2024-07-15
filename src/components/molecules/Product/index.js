import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { IconBack, IconCar1 } from '../../../assets/icon';
import { windowHeight, windowWidth } from '../../../utils/constants';
import ms from '../../../utils/ms';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../utils';
import Number from '../Number';
import { Gap } from '../../atoms';
const Product = ({
  height = 10 / 100 * windowHeight,
  product,
  onPress,
  onPressMinus,
  onPressPlus,
  isSelected = false,
  qtyCheckout,
  ...props
}) => {

  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[ms.pdH(5), ms.pdV(20), ms.wh(windowWidth - 15, height)]}>
        <View style={[ms.row, ms.cardA(5, 0, 4), ms.height(65)]}>
          <View style={[ms.width(25 / 100 * windowWidth), ms.aiJc(), ms.pd(5)]}>
            <Image source={product?.image ? product?.image : IconCar1} style={[ms.wh(15 / 100 * windowWidth, 10 / 100 * windowWidth)]} />
          </View>
          <View style={[ms.width(75 / 100 * windowWidth), ms.jc()]}>
            <View style={[ms.pdV(5)]}>
              <Text style={[ms.fzBCLh(12, '700', '#000000', 14)]}>{product?.name}</Text>
            </View>
            <View style={[ms.row, ms.pdV(5)]}>
              <View style={[ms.width('55%')]}>
                <View>
                  <Text style={[ms.fzBCLh(10, '700', '#FFAA00', 12)]}><Number number={product?.harga_jual} /></Text>
                </View>
              </View>
              <View style={[ms.width('35%')]}>
                {
                  isSelected && (
                    <View style={[ms.row]}>
                      <TouchableOpacity onPress={onPressMinus} style={[ms.width('30%'), ms.aiJc()]}>
                        <Icon name="minus" size={12} color={'#000000'} />
                      </TouchableOpacity>
                      <View style={[ms.width('30%'), ms.aiJc()]}>
                        <Text style={[ms.fzBCLh(10, '400', '#000000', 10)]}>{qtyCheckout}</Text>
                      </View>
                      <TouchableOpacity  onPress={onPressPlus} style={[ms.width('30%'), ms.aiJc()]}>
                        <Icon name="plus" size={12} color={'#000000'} />
                      </TouchableOpacity>
                    </View>
                  )
                }

              </View>
            </View>
          </View>
        </View>

      </TouchableOpacity>
      <Gap height={3} />
    </View>

  );
};

export default Product;

//const styles = StyleSheet.create({});
