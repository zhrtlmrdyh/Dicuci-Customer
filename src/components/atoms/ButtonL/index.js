import React from 'react';
import { TouchableOpacity, View,Text } from 'react-native';
import { colors } from '../../../utils';
import ms from '../../../utils/ms';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ButtonL = ({ 
  label="",
  width=100, 
  height=20,
  iconStartFAName, 
  iconStartFAColor=colors.silver, 
  iconStartFASolid=false,
  backgroundColor=colors.white, 
  fontSize=12, 
  fontWeight="400" ,
  color='#222222',
  margin=5,
  borderColor='#222222',
  borderRadius=12,
  borderWidth=0.5,
  ...props
}) => {
  return (
  <TouchableOpacity  style={[ms.wh(width, height),ms.mg(margin), ms.bc(backgroundColor), ms.bdW(borderWidth), ms.bdC('#222222'), ms.bdR(borderRadius), ms.aiJc(), ms.bdC(borderColor)]} {...props}>
    <Text style={[ms.fzBC(fontSize, fontWeight,color)]}>{iconStartFAName && (<Icon name={iconStartFAName} size={fontSize} color={iconStartFAColor} solid={iconStartFASolid}/>)} {label}</Text>
  </TouchableOpacity>)
  ;
};

export default ButtonL;
