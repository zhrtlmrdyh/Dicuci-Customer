import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors,getData } from '../../../utils';
import TabItem from '../TabItem';
const ButtonNavigator = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  // const isFocused = state.index === index;
  // const [isFocused, setIsFocused] = useState(false);
  // const [indexPage, setIndexPage] = useState(0);
  // const onPress = async (route, index) => {
  //   //  const isFocused = state.index === index;
  //   const event = await navigation.emit({
  //     type: 'tabPress',
  //     target: route.key,
  //     canPreventDefault: true,
  //   });
  //   if (!event?.defaultPrevented) {
  //     console.log('route, [index]', route, index)
  //     // if (!isFocused) {
  //     // alert(1)
  //   //  navigation.navigate(route?.name);
  //   //  return await navigation.push(route?.name);
  //    return await navigation.navigate(route?.name);
  //   //  return await navigation.reset({index: 0, routes: [{name: route?.name}]});

  //  }
  // };
  return (
    <View style={styles.container}>
      {state.routes?.map((route, index) => {
        // console.log('route', route)
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const refTabItem = useRef();
        refTabItem.current = {
          index : index
        }
        const onPress = async () => {
          // console.log(`refTabItem [${index}]`, refTabItem)
          const event = await navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event?.defaultPrevented) {
            // console.log('route, [index]', route, index)
            // if (!isFocused) {
            // alert(1)
          //  navigation.navigate(route?.name);
          //  return await navigation.push(route?.name);
          
              return  navigation.navigate(route?.name);

          // return await navigation.reset({index: 0, routes: [{name: route?.name}]});

         }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            innerRef={refTabItem}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default ButtonNavigator;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderTopWidth: 0.5,
    borderTopColor: colors.silverNormal,
    borderTopLeftRadius : 42,
    borderTopRightRadius : 42,
    marginTop: -40,
    justifyContent: 'center',
    // paddingVertical: 5,
    // paddingBottom: 4,
    backgroundColor: 'white',
    // borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
