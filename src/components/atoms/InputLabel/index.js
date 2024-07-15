import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '../../../utils';
import ms from '../../../utils/ms';

import CurrencyInput from 'react-native-currency-input';
const InputLabel = ({
  label,
  required,
  height,
  isCurrency = false,
  onChangeText,
  ...props
}) => {
  return (
    <View>
      {
        label && (
          <View style={[ms.pdV(16)]}>
            <Text style={[ms.fzBCLh(14, '700', '#000000', 17)]}>{label} {required && (<Text style={[ms.fzBC(16, '700', colors.red)]}>*</Text>)}</Text>
          </View>
        )
      }
      <View>
        {
          !isCurrency && (
            <TextInput onChangeText={onChangeText} {...props} style={[ms.bdW(1), ms.bdC('#9DA8B1'),ms.fzBCLh(14,'400','#222222',16), ms.bdR(5), ms.height(56), ms.pdH(15)]} />
          )
        }
        {
          isCurrency && (
            <CurrencyInput
              onChangeValue={onChangeText}
              prefix="Rp "
              delimiter="."
              separator=","
              precision={0}
              borderWidth={0.5}
              borderRadius={5}
              paddingHorizontal={5}
              style={[ms.bdW(1), ms.bdC('#9DA8B1'), ms.bdR(5),ms.fzBCLh(14,'400','#222222',16), ms.height(56), ms.pdH(15)]}
              {...props}
            />)
        }

      </View>
    </View>
  );
};

export default InputLabel;
