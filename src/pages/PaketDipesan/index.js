import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ms from '../../utils/ms'
import { IconBack } from '../../assets/icon';
import { colors } from '../../utils';
import { windowWidth } from '../../utils/constants';
import { ButtonL } from '../../components';
import IconDone from '../../assets/icon/done.png'

const PaketDipesan = ({navigation, onPress}) => {
 
  return (
    <View style={[ms.containerPage]}>
        <View style={[ms.row, ms.pdV(14)]}>
            <View style={[ms.width(windowWidth)]}>
            <View style={[ms.aiJc]}>
                <TouchableOpacity 
                    onPress={() => {navigation.goBack()}} 
                    style={[ms.post(), ms.l(16)]}>
                    <Image 
                    source={IconBack} 
                    style={[ms.wh(35,35)]}
                    />
                </TouchableOpacity>
            </View>  
            </View>
        </View>
        <View>
            <View style={[ms.width(windowWidth), ms.aiJc(), ms.t(100)]}>
                <View>
                    <Image source={IconDone} style={[ms.wh(130,160)]}/>
                </View>
                <View style={[ms.pdV(10)]}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={[ms.fzBC(12, '700', colors.dark)]}>Selamat, paket kamu telah berhasil dipesan!</Text>
                    </View>
                    <View style={[ms.pdH(16), ms.t(6)]}>
                        <Text style={[ms.txA('center'), ms.fzBC(10, '400', colors.dark)]}>Pesanan akan diteruskan ke Mitra. Silahkan cek status tracking pesananmu di My Order</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={{top: 110}}>
            <View style={[ ms.width(windowWidth), ms.aiJc()]}>
                <View style={[ms.width('100%'), ms.aiJc()]}>
                    <ButtonL onPress={() => {navigation.navigate("Home")}} width={"90%"} height={44} label="Pesan Lagi" fontSize={14} color={colors.white} borderColor={colors.primary} borderWidth={2} backgroundColor={colors.primary} position='absolute' borderRadius={8}/>
                </View>
            </View>
            <View style={[ms.width('100%'), ms.aiJc()]}>
                <ButtonL onPress={() => {navigation.navigate("Diorder")}} width={"90%"} height={44} label="Lihat My Order" fontSize={14} color={colors.primary} borderColor={colors.primary} borderWidth={2} borderRadius={8} />
            </View>
        </View>
    </View>
  )
}

export default PaketDipesan

const styles = StyleSheet.create({
  
})