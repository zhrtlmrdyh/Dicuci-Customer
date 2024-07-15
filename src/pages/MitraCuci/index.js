import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import ms from '../../utils/ms';
import {
  IconCart,
  IconBell,
  IconBack,
  IconTopMitra,
  IconLineBoldGrey,
  IconRedLocation,
} from '../../assets/icon';
import {useDispatch, useSelector} from 'react-redux';
import MitraHeader from '../../components/molecules/MitraHeader';
import {PaketCard} from '../../components';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../utils';
import {getPaketMitratList} from '../../redux/action';

const MitraCuci = ({navigation}) => {
  const {myorderGlobal, myorders} = useSelector(state => state.myorderReeducer);
  const dispatch = useDispatch();
  // const [paketList, setPaketList] = useState([
  //   {
  //     name: 'Kiloan Promo Reguler 3 Hari',
  //     image: IconBaju,
  //     jarak: '0.5 km dari lokasi Anda',
  //     biaya: 5000,
  //     Mitra: {
  //       name: 'Tayaka Laundry',
  //       rating: 4.4,
  //       alamat: 'Jl. Cikutra Baru, No. 120, Cibeunying Kaler, Bandung',
  //     },
  //     Order: {
  //       parfum: 'Amber Wood',
  //     },
  //     Pengiriman: {
  //       metode: 'Diantar - Jemput Sendiri',
  //     },
  //   },
  //   {
  //     name: 'Satuan Premium Express 1 Hari',
  //     image: IconDress,
  //     jarak: '0.5 km dari lokasi Anda',
  //     biaya: 15000,
  //     Mitra: {
  //       name: 'Tayaka Laundry',
  //       rating: 4.4,
  //       alamat: 'Jl. Cikutra Baru, No. 120, Cibeunying Kaler, Bandung',
  //     },
  //     Order: {
  //       parfum: 'Amber Wood',
  //     },
  //     Pengiriman: {
  //       metode: 'Diantar - Jemput Sendiri',
  //     },
  //   },
  //   {
  //     name: 'Paket Sepatu Besok Bersih',
  //     image: IconSepatu,
  //     jarak: '0.5 km dari lokasi Anda',
  //     biaya: 25000,
  //     Mitra: {
  //       name: 'Tayaka',
  //       rating: 4.5,
  //       alamat: 'Jl. Cikutra Baru, No. 120, Cibeunying Kaler, Bandung',
  //     },
  //     Order: {
  //       parfum: 'Amber Wood',
  //     },
  //     Pengiriman: {
  //       metode: 'Diantar - Jemput Sendiri',
  //     },
  //   },
  //   {
  //     name: 'Paket Cuci Tas Gunung/Sekolah',
  //     image: IconBackpack,
  //     jarak: '0.5 km dari lokasi Anda',
  //     biaya: 35000,
  //     Mitra: {
  //       name: 'Tayaka',
  //       rating: 4.2,
  //       alamat: 'Jl. Cikutra Baru, No. 120, Cibeunying Kaler, Bandung',
  //     },
  //     Order: {
  //       parfum: 'Amber Wood',
  //     },
  //     Pengiriman: {
  //       metode: 'Diantar - Jemput Sendiri',
  //     },
  //   },
  // ]);

  const {paket, paketMitra} = useSelector(state => state.homeReducer);
  console.log('paket mitra', paketMitra)
  console.log('paket', paket)
  const [param, setParam] = useState({
    page: 0,
    limit: 10,
  });

  const init = async () => {
    await dispatch(getPaketMitratList(param, paket?.fk_mitra));
  };
  useEffect(() => {
    if (navigation.isFocused()) {
      init();
    }
  }, [navigation]);

  return (
    <View style={[ms.containerPage, ms.pdV(16), ms.pdH(18)]}>
      <ScrollView>
        <View style={[ms.row, ms.ai('center'), ms.mgB(16)]}>
          <TouchableOpacity
            style={[ms.width('73%')]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IconBack} style={[ms.wh(28, 28), ms.mgR(16)]} />
          </TouchableOpacity>
          <View style={[ms.width('12%'), ms.mgR(7)]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LaundryBag');
              }}>
              <Image source={IconCart} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
          <View style={[ms.width('12%')]}>
            <TouchableOpacity>
              <Image source={IconBell} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
              <MitraHeader paket={[paket]} />
        </View>

        <View style={[ms.pdT(30), ms.mgB(16)]}>
          <Text style={[ms.fzBC(14, '700', '#222222')]}>
            Rekomendasi Paket Cuci
          </Text>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {paketMitra?.slice(0,10).map((paket, index) => {
              return (
                <PaketCard
                  style={styles.cardMitra}
                  key={index}
                  paket={paket}
                  onPress={() => {
                    dispatch({type: 'SET_PAKET', value: paket});
                    navigation.goBack();
                    navigation.navigate('DetailPaket');
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        <View>
          <View style={[ms.pdT(30), ms.mgB(16)]}>
            <Text style={[ms.fzBC(14, '700', '#222222')]}>Paling Populer</Text>
          </View>

          <View style={[styles.list]}>
            {paketMitra?.slice(0,10).map((paket, index) => {
              return (
                <PaketCard
                  key={index}
                  paket={paket}
                  onPress={() => {
                    dispatch({type: 'SET_PAKET', value: paket});
                    navigation.goBack();
                    navigation.navigate('DetailPaket');
                  }}
                  width={'50%'}
                  height={200}
                />
              );
            })}
          </View>
        </View>

        <View style={[ms.pdT(30), ms.mgB(16)]}>
          <Text style={[ms.fzBC(14, '700', '#222222')]}>Paket Populer</Text>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {paketMitra?.slice(0,10).map((paket, index) => {
              return (
                <PaketCard
                  key={index}
                  paket={paket}
                  onPress={() => {
                    dispatch({type: 'SET_PAKET', value: paket});
                    navigation.goBack();
                    navigation.navigate('DetailPaket');
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MitraCuci;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardMitra: {
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
    padding: 50,
    margin: 5,
  },
});
