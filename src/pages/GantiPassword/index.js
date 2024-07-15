import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconBack } from '../../assets/icon'
import ms from '../../utils/ms'
import { windowWidth } from '../../utils/constants'
import { colors } from '../../utils'
import { white } from 'react-native-paper/lib/typescript/styles/colors'

const GantiPassword = ({
    navigation
}) => {
  return (
    <View style={{backgroundColor:'white', flex: 1}}>
          <View style={[ms.row, ms.pdV(14), ms.width(windowWidth),{height:56}]}>
              <View style={[ms.aiJc]}>
                  <TouchableOpacity
                      onPress={() => { navigation.goBack() }}
                      style={[ms.post(), ms.pdH(16)]}>
                      <Image
                          source={IconBack}
                          style={[ms.wh(35, 35)]}
                      />
                  </TouchableOpacity>
              </View>

              <View style={[ms.l(60), ms.t(5)]}>
                  <View style={[ms.aiJc]}>
                      <Text style={[ms.fzBC(16, '600', colors.dark)]}>Forgot Password</Text>
                  </View>
              </View>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: '#EAEAEA'}}>

          </View>
          <Text>GantiPassword</Text>
    </View>
  )
}

export default GantiPassword

const styles = StyleSheet.create({})