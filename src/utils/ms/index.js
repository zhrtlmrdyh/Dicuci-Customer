import React, {useState, useEffect, Component} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {fonts} from '..';
import {colors} from '../colors';

const ms = StyleSheet.create({
  containerPage: {
    //backgroundColor: '#F8F8FF',
    backgroundColor: 'white',
    flex: 1,
  },
  textDefault: (fontFamily = 'JosefinSans-SemiBold') => ({
    fontFamily: fontFamily,
  }),
  card: {
    paddingBottom: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    paddingTop:0,
  },
  cardA: (padding = 10, margin = 2, elevation = 4) => ({
    padding: padding,
    margin: margin,
    paddingBottom: 4,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    elevation: elevation,
    alignItems: 'center',
  }),
  cardM0P0: {
    paddingBottom: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  cardM0Pb10: {
    paddingBottom: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  cardOrder: {
    paddingBottom: 4,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    // shadowColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.0,
    shadowRadius: 4.0,
    elevation: 4,
    padding: 10,
    margin: 3,
  },
  cardPB:{
    paddingBottom: 4,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#E0E0E0',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.00,
    shadowRadius: 4.00,
    elevation: 4,
    padding: 10,
    margin: 3,
  },
  cardBlue: {
    backgroundColor: '#E3F4FF',
    borderRadius: 4,
  },
  cardOren: {
    backgroundColor: 'rgba(255, 170, 0, 0.1)',
    borderRadius: 4,
  },
  cardParfum: {
    width: 74,
    height: 17,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#41A3F033',
    borderRadius: 12,
    left: 4,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  cardTx : (width = 269, height=40) => ({ 
    width: width, 
    height: height,  
    borderColor:'#9DA8B1', 
    borderWidth: 1, 
    borderRadius: 4,
  }),

  containerForm: (height = 50, marginVertical = 10) => ({
    width: '100%',
    height: height,
    marginVertical: marginVertical,
  }),

  cardRegister: (width=296, height=48) => ({
    width: width,
    height: height,
    borderRadius: 10,
    borderWidth:1,
    borderColor: '#B3B3B3'
  }),
  fz: (fontSize = 11) => ({
    fontSize: fontSize,
  }),
  fzC: (fontSize = 11, color = colors.dark) => ({
    fontSize: fontSize,
    color: color,
  }),
  fzB: (fontSize = 11, fontWeight = 'bold') => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
  }),
  fzBC: (fontSize = 11, fontWeight = 'bold', color = colors?.dark) => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
  }),
  fzBCLh: (
    fontSize = 11,
    fontWeight = 'bold',
    color = colors?.dark,
    lineHeight = 14,
  ) => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
    lineHeight: lineHeight,
  }),
  ff: (fontFamily = fonts?.primary?.Normal) => ({
    fontFamily: fontFamily,
  }),
  pd: padding => ({
    padding: padding,
  }),
  pdH: paddingHorizontal => ({
    paddingHorizontal: paddingHorizontal,
  }),
  pdV: paddingVertical => ({
    paddingVertical: paddingVertical,
  }),
  pdT: paddingTop => ({
    paddingTop: paddingTop,
  }),
  pdR: paddingRight => ({
    paddingRight: paddingRight,
  }),
  pdB: paddingBottom => ({
    paddingBottom: paddingBottom,
  }),
  pdL: paddingLeft => ({
    paddingLeft: paddingLeft,
  }),
  mg: margin => ({
    margin: margin,
  }),
  mgH: marginHorizontal => ({
    marginHorizontal: marginHorizontal,
  }),
  mgV: marginVerticall => ({
    marginVerticall: marginVerticall,
  }),
  mgT: marginTop => ({
    marginTop: marginTop,
  }),
  mgR: marginRight => ({
    marginRight: marginRight,
  }),
  mgB: marginBottom => ({
    marginBottom: marginBottom,
  }),
  mgL: marginLeft => ({
    marginLeft: marginLeft,
  }),

  fz6: {
    fontSize: 6,
  },
  fz7: {
    fontSize: 7,
  },
  fz8: {
    fontSize: 8,
  },
  fz9: {
    fontSize: 9,
  },
  fz9c: {
    fontSize: 9,
    alignSelf: 'center',
  },
  fz9cw: {
    fontSize: 9,
    alignSelf: 'center',
    color: 'white',
  },
  fz9cm0: {
    fontSize: 9,
    alignSelf: 'center',
    margin: 0,
  },
  fz10: {
    fontSize: 10,
  },
  fz11: {
    fontSize: 11,
  },
  fz12Bold: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textNormal: {
    fontSize: 13,
    color: colors.silver,
  },
  textNormalBold: (fontSize = 15) => ({
    fontSize: fontSize,
    color: colors.dark,
    fontWeight: 'bold',
  }),
  txA: textAlign => ({
    textAlign: textAlign,
  }),
  txC: color => ({
    color: color,
  }),
  as: (alignSelf = 'flex-end') => ({
    alignSelf: alignSelf,
  }),
  ai: (alignItems = 'center') => ({
    alignItems: alignItems,
  }),
  jc: (justifyContent = 'center') => ({
    justifyContent: justifyContent,
  }),
  aiJc: (alignItems = 'center', justifyContent = 'center') => ({
    alignItems: alignItems,
    justifyContent: justifyContent,
  }),
  idr: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  col: (width = '100%') => ({
    width: width,
  }),
  container: (width = '100%', height = '100%') => ({
    width: width,
    height: height,
  }),
  width: (width = 20) => ({
    width: width,
  }),
  height: (height = 20) => ({
    height: height,
  }),
  wh: (width = 20, height = 20) => ({
    width: width,
    height: height,
  }),
  bdR: borderRadius => ({
    borderRadius: borderRadius,
  }),
  bdRBLR: (borderBottomLeftRadius = 0) => ({
    borderBottomLeftRadius: borderBottomLeftRadius,
  }),
  bdRBRR: (borderBottomRightRadius = 0) => ({
    borderBottomRightRadius: borderBottomRightRadius,
  }),
  bdRTLR: (borderTopLeftRadius = 0) => ({
    borderTopLeftRadius: borderTopLeftRadius,
  }),
  bdRTRR: (borderTopRightRadius = 0) => ({
    borderTopRightRadius: borderTopRightRadius,
  }),
  bdW: borderWidth => ({
    borderWidth: borderWidth,
  }),
  bdTw: (borderTopWidth = 0.5) => ({
    borderTopWidth: borderTopWidth,
  }),
  bdBw: (borderBottomWidth = 0.5) => ({
    borderBottomWidth: borderBottomWidth,
  }),
  bdLw: (borderLeftWidth = 0.5) => ({
    borderLeftWidth: borderLeftWidth,
  }),
  bdRw: (bordeRightWidth = 0.5) => ({
    bordeRightWidth: bordeRightWidth,
  }),
  bdC: borderColor => ({
    borderColor: borderColor,
  }),
  post: (position = 'absolute') => ({
    position: position,
  }),
  t: (top = 0) => ({
    top: top,
  }),
  b: (bottom = 0) => ({
    bottom: bottom,
  }),
  l: (left = 0) => ({
    left: left,
  }),
  r: (right = 0) => ({
    right: right,
  }),
  bc: (backgroundColor = colors?.white) => ({
    backgroundColor: backgroundColor,
  }),
  br: (borderRadius = 5) => ({
    borderRadius: borderRadius,
  }),
  op: (opacity = 1) => ({
    opacity: opacity,
  }),
});
export default ms;
