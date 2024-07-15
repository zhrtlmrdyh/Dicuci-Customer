import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IconBaju, IconVerifikasi } from '../../../assets/icon';
import { colors } from '../../../utils';
import ms from '../../../utils/ms';
import { Gap } from '../../atoms';
import Number from '../Number';
// import Icon from 'react-native-vector-icons/FontAwesome5';
const Paket = ({paket,onPress}) => {
   return (
      <TouchableOpacity onPress={onPress} >
        <View style={[ms.row, ms.card]}>
            <View style={[[ms.width('20%')]]}>
                <Image source={{
                  uri : paket?.image_url1
                }} style={[ms.wh('90%', 52)]}/>
            </View>
            <View style={[[ms.width('80%'), ms.pdV(10)]]}>
                <View style={[ms.pdV(5)]}>
                    <Text style={[ms.fzBCLh(11,'700','#000000',14)]}>{paket?.name}</Text>
                </View>
                <View style={[ms.row]}>
                    <View style={[ms.width('40%')]}>
                      <Text style={[ms.fzBCLh(10,'400','#000000',12)]}><Image source={IconVerifikasi} style={[ms.wh(11,11)]}/> {paket?.Mitra?.name}</Text>
                    </View>
                    <View style={[ms.width('60%')]}>
                      <Text style={[ms.fzBCLh(10,'400','#000000',12)]}>{paket?.jarak}</Text>
                    </View>
                </View>
                <Gap height={15}/>
                <View style={[ms.row]}>
                    <View style={[ms.width('50%')]}>
                      <Text style={[ms.fzBCLh(10,'700','#FFAA00',12)]}> <Number number={paket?.biaya} /></Text>
                    </View>
                    <View style={[ms.width('25%')]}>
                      <TouchableOpacity style={[ms.bdW(1), ms.bdC('#41A3F0'), ms.bdR(12), ms.pd(2), ms.aiJc()]}>
                        <Text  style={[ms.fzBCLh(8,'400','#41A3F0',10)]}>Gratis Ongkir</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[ms.width('25%')]}>
                    <TouchableOpacity style={[ms.bdW(1), ms.bdC('#41A3F0'), ms.bdR(12), ms.pd(2), ms.aiJc()]}>
                        <Text  style={[ms.fzBCLh(8,'400','#41A3F0',10)]}>Diskon 30%</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
              
      </TouchableOpacity>
  );
};

export default Paket;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
 
});
