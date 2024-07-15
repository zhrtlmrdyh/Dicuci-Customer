import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ms from '../../../utils/ms';
import { colors } from '../../../utils';
import { IconVerifikasi } from '../../../assets/icon';
import { windowWidth } from '../../../utils/constants';

const PaketDipilih = ({paket, onPress}) => {
    console.log('paket', paket)
  return (
    <View>
        <TouchableOpacity onPress={onPress}>
            <View style={[ms.row, ms.wh(windowWidth, 80), ms.pd(16), ms.pdB(5)]}>
                <View style={[ms.width('20%')]}>
                    <Image 
                    source={{uri : paket?.image_url1}}
                    style={[ms.wh(68, 55)]}
                    />
                </View>
                <View>
                    <View>
                        <Text style={[ms.fzBC(14, '500', colors.dark)]}>{paket?.name}</Text>
                    </View>
                    <View style={[ms.row, ms.t(4)]}>
                        <Text style={[ms.fzBC(10, '400', colors.dark)]}>Parfum:</Text>
                        <View style={styles.labelP}>
                            <Text style={[ms.fzBC(10, '400', colors.primary), ms.txA('center')]}>{paket?.parfum}</Text>
                        </View>
                    </View>
                    <View style={[ms.t(6), ms.labelPr]}>
                        <Text style={[ms.fzBC(12, '800', colors.dark)]}>Rp.{paket?.biaya}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        <View style={[ms.wh(windowWidth, 70), ms.aiJc(), ms.pd(16)]}>
             <View style={styles.cardTx}>
                <TextInput placeholder='Misal, Jeans luntur warna biru' style={styles.TxI}/>
                <View style={{ position : 'absolute', top: 0, left: 20, marginTop: -10, backgroundColor: 'white', paddingHorizontal: 5}}>
                    <Text style={[ms.fzBC(10, '400', '#9DA8B1')]}>Catatan untuk paket ini</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default PaketDipilih;

const styles = StyleSheet.create({
    labelP : {
        width: 74, 
        height: 17, 
        justifyContent: 'center', 
        alignContent:'center', 
        backgroundColor:'#41A3F033', 
        borderRadius:12, 
        left: 4, 
        borderColor: colors.primary, 
        borderWidth: 1
    },
    cardTx : { 
        width: '100%', 
        height: 40,  
        borderColor:'#9DA8B1', 
        borderWidth: 1, 
        borderRadius: 4,
    },
    TxI : {
        fontWeight: '400', 
        fontSize:12, 
        lineHeight: 24,  
        alignItems: 'center', 
        letterSpacing: 0.5, 
        color: '#9DA8B1', 
        paddingVertical: 8, 
        left: 16,
    },
})