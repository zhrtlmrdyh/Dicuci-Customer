import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { IconBack } from '../../../assets/icon';
import { windowHeight, windowWidth } from '../../../utils/constants';
import ms from '../../../utils/ms';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../utils';
const NavigationTop = ({
  height = 10 / 100 * windowHeight,
  title = "",
  titleFontSize = 16,
  titleFontWeight = '600',
  titleColor = '#000000',
  titleLineHeight = 19,
  onPressStart,
  iconEndName = "plus",
  iconEndSize = 5 / 100 * windowWidth,
  iconEndColor = colors.primary,
  onPressEnd,
  iconEnd="plus",
  ...props
}) => {

  return (
    <View style={[ms.pd(5), ms.wh(windowWidth, height), ms.bdBw(1), ms.bdC(colors?.silverLight)]}>
      <View style={[ms.row]}>
        <TouchableOpacity onPress={onPressStart} style={[ms.width(15 / 100 * windowWidth), ms.aiJc()]}>
          <Image source={IconBack} style={[ms.wh(10 / 100 * windowWidth, 10 / 100 * windowWidth)]} />
        </TouchableOpacity>
        <View style={[ms.width(70 / 100 * windowWidth), ms.jc()]}>
          <Text style={[ms.fzBCLh(titleFontSize, titleFontWeight, titleColor, titleLineHeight)]}>{title}</Text>
        </View>
        {
          onPressEnd && (
            <TouchableOpacity onPress={onPressEnd} style={[ms.wh(10 / 100 * windowWidth,10 / 100 * windowWidth),ms.bc('#E3F4FF'), ms.bdR(15 / 100 * windowWidth), ms.aiJc()]}>
              <Icon name={iconEnd} size={iconEndSize} color={iconEndColor} />
            </TouchableOpacity>
          )
        }

      </View>
    </View>
  );
};

export default NavigationTop;

//const styles = StyleSheet.create({});
