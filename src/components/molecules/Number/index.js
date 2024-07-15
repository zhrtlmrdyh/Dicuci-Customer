import React from 'react';
import {Text} from 'react-native';
import NumberFormat from 'react-number-format';

const Number = ({number, type, style, prefix="Rp ",minus=false, ...props}) => {
  if(minus){
    prefix="Rp. -"
  }
  if (type === 'decimal') {
   
    return (
      <NumberFormat
        value={number}
        displayType="text"
        renderText={(value) => <Text style={style}>{value}</Text>}
        decimalSeparator="."
        decimalScale={1}
        fixedDecimalScale
        {...props}
      />
    );
  }
  return (
    <NumberFormat
      value={number}
      thousandSeparator="."
      displayType="text"
      prefix={prefix}
      renderText={(value) => <Text style={style}>{value}</Text>}
      decimalSeparator=","
      {...props}
    />
  );
};

export default Number;

//const styles = StyleSheet.create({});
