import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ms from '../../utils/ms';
import {
  IconBack,
  IconBaju,
  IconDouble,
  IconLaundry,
  IconLocation,
  IconVerifikasi,
} from '../../assets/icon';
import {Gap, Number} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth} from '../../utils/constants';
import moment from 'moment';

const DetailOrder = ({navigation}) => {
  const {myorder} = useSelector(state => state.myorderReeducer);
  const dispatch = useDispatch();
  // const [myorders, setMyOrders] = useState([
  //   // {
  //   //   tgl_pesanan: new Date(),
  //   //   tgl_selesai: new Date(),
  //   //   Pakets: [
  //   //     {
  //   //       title: 'Paket Cuci',
  //   //       date: '24 Juni 2022',
  //   //       icon: IconLaundry,
  //   //       img: IconBaju,
  //   //       name: 'Kiloan Promo Reguler 3 Hari',
  //   //       qty: '1 paket',
  //   //       totalText: 'Total Bayar',
  //   //       totalPrice: 'Rp. 11.000,-',
  //   //       status: 'Washing',
  //   //     },
  //   //     {
  //   //       title: 'Paket Cuci',
  //   //       date: '22 Juni 2022',
  //   //       icon: IconLaundry,
  //   //       img: IconDouble,
  //   //       name: 'Kiloan Promo Reguler 3 Hari',
  //   //       qty: '1 paket',
  //   //       totalText: 'Total Bayar',
  //   //       totalPrice: 'Rp. 39.000,-',
  //   //       status: 'Selesai',
  //   //     },
  //   //   ],
  //   //   metode_pengiriman : 'Diantar',
  //   //   alamat : 'Jl Bkm no 4 ....',
  //   //   biaya_cuci : 15000,
  //   //   satuan_cuci : 25000,
  //   //   ongkos_kirim : 4000,
  //   // },
  //   // {
  //   //   title: 'Paket Cuci',
  //   //   date: '24 Juni 2022',
  //   //   icon: IconLaundry,
  //   //   img: IconBaju,
  //   //   name: 'Kiloan Promo Reguler 3 Hari',
  //   //   qty: '1 paket',
  //   //   totalText: 'Total Bayar',
  //   //   totalPrice: 'Rp. 11.000,-',
  //   //   status: 'Washing',
  //   // },
  //   // {
  //   //   title: 'Paket Cuci',
  //   //   date: '22 Juni 2022',
  //   //   icon: IconLaundry,
  //   //   img: IconDouble,
  //   //   name: 'Kiloan Promo Reguler 3 Hari',
  //   //   qty: '1 paket',
  //   //   totalText: 'Total Bayar',
  //   //   totalPrice: 'Rp. 39.000,-',
  //   //   status: 'Selesai',
  //   // },
  // ]);
  return (
    <View style={[ms.containerPage, ms.pdV(16)]}>
      <ScrollView>
        <View style={[ms.containerPage]}>
          <View style={[ms.row, ms.ai('center'), ms.mgB(18), ms.pdH(18)]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={IconBack} style={[ms.wh(28, 28), ms.mgR(16)]} />
            </TouchableOpacity>

            <Text style={[ms.fzBCLh(16, '700', '#222222', 29), ms.pdR(135)]}>
              Detail Pesanan
            </Text>
          </View>

          <Gap height={3} backgroundColor={'#F5F5F5'} style={[ms.pdT(18)]} />

          <View
            style={[ms.row, ms.pdH(18), ms.jc('space-between'), ms.mgT(16)]}>
            <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Diproses</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TracingOrder');
              }}>
              <Text style={[ms.fzBCLh(14, '700', '#41A3F0', 17)]}>
                Lihat Detail
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[ms.pdH(18), ms.pdV(16)]}>
            <Gap height={1} backgroundColor={'#F5F5F5'} />
          </View>

          <View>
            <View style={[ms.row, ms.pdH(18), ms.jc('space-between')]}>
              <Text style={[ms.fzBCLh(12, '500', '#222222', 17)]}>
                Tanggal Pesan
              </Text>
              <Text style={[ms.fzBCLh(12, '500', '#222222', 17)]}>
                {moment(myorder?.tgl_pesanan).format('DD MMMM YYYY. HH:mm')} WIB
              </Text>
            </View>

            <View style={[ms.row, ms.pdH(18), ms.jc('space-between')]}>
              <Text style={[ms.fzBCLh(12, '500', '#222222', 17)]}>
                Pesanan akan selesai
              </Text>
              <Text style={[ms.fzBCLh(12, '500', '#222222', 17)]}>
                {moment(myorder?.tgl_pesanan_akhir).format('DD MMMM YYYY. HH:mm')} WIB
              </Text>
            </View>
          </View>

          <View style={[ms.pdV(16)]}>
            <Gap height={4} backgroundColor={'#F5F5F5'} />
          </View>

          <View style={[ms.pdH(18)]}>
            <View style={[ms.row]}>
              <View style={[ms.width('28%')]}>
                <Text style={[ms.fzBC(16, '700', '#222222')]}>
                  Detail Paket
                </Text>
              </View>

              <View style={[ms.row, ms.width('35%')]}>
                <View style={[]}>
                  <Image
                    style={[ms.wh(9.5, 12.5), ms.mgL(100), ms.mgR(9), ms.t(4)]}
                    source={IconVerifikasi}
                  />
                </View>
                <TouchableOpacity
                  style={[ms.row, ms.ai('center')]}
                  onPress={() => {
                    navigation.navigate('MitraCuci');
                  }}>
                  <Text style={[ms.fzBC(14, '700', '#222222')]}>
                    {myorder?.Mitra?.name}
                  </Text>

                  <Feather
                    style={[ms.fzBC(16, 1.5, '#9DA8B1'), ms.l(3), ms.t(0)]}
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[ms.cardOrder, ms.mgH(18)]}>
            {myorder.list_paket.map((mr, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[ms.pd(8)]}
                  onPress={() => {
                    dispatch({type: 'SET_ORDER_DETAIL', value: myorder});
                    navigation.navigate('TracingOrder');
                  }}>
                  <View>
                    <View
                      style={[
                        ms.row,
                        ms.bdBw(1),
                        ms.bdC('#E7E7E7'),
                        ms.pdB(10),
                      ]}>
                      <View style={[ms.width('25%')]}>
                        <Image style={[ms.wh(68, 54.25)]} source={{uri: mr?.image_url1}} />
                      </View>

                      <View style={[ms.width('87%')]}>
                        <Text style={[ms.fzBCLh(12, '700', '#000000', 14)]}>
                          {mr?.name}
                        </Text>
                        <Text style={[ms.fzBCLh(10, '400', '#000000', 12)]}>
                          {mr?.qty} Paket
                        </Text>
                        <View style={[ms.row, ms.mgT(6)]}>
                          <Text
                            style={[
                              ms.fzBC(10, '700', '#000000'),
                              ms.width('60%'),
                            ]}>
                            Status
                          </Text>
                          <Text
                            style={[
                              ms.fzBC(10, '900', '#41A3F0'),
                              ms.cardBlue,
                              ms.pdH(8),
                              ms.pdV(3),
                              ms.width('25%'),
                              ms.txA('center'),
                            ]}>
                            {myorder?.Status?.deskripsi}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[ms.row, ms.mgT(8), ms.pdB(12)]}>
                      <View>
                        <Text
                          style={[
                            ms.fzBCLh(10, '400', '#000000', 12),
                            ms.mgB(8),
                          ]}>
                          Total Bayar
                        </Text>
                        <Text
                          style={[
                            ms.fzBCLh(10, '700', '#41A3F0', 12),
                            ms.cardBlue,
                            ms.pdV(3),
                            ms.pdH(9),
                          ]}>
                          <Number number={mr?.biaya_satuan} />,-
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
               );
            })} 
          </View>
          <View style={[ms.pdV(16)]}>
            <Gap height={4} backgroundColor={'#F5F5F5'} />
          </View>

          <View style={[ms.pdH(18)]}>
            <Text style={[ms.fzBC(14, '700', '#222222'), ms.pdB(16)]}>
              Info Pengiriman
            </Text>
            <View style={[ms.row, ms.jc('space-between')]}>
              <View style={[ms.pdR(32)]}>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.pdB(12)]}>
                  Metode Pengiriman
                </Text>
                <Text style={[ms.fzBC(12, '500', '#222222')]}>Alamat</Text>
              </View>

              <View>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.pdB(12)]}>
                  {myorder?.MetodePengiriman?.deskripsi}
                </Text>
                <Text
                  style={[
                    ms.fzBC(12, '500', '#222222'),
                    ms.wh(180),
                    ms.height(42),
                  ]}>
                  {myorder?.alamat}
                </Text>
              </View>
            </View>
          </View>

          <View style={[ms.pdB(16)]}>
            <Gap height={4} backgroundColor={'#F5F5F5'} />
          </View>

          <View style={[ms.pdH(18)]}>
            <Text style={[ms.fzBC(14, '700', '#222222'), ms.pdB(16)]}>
              Rincian Pembayaran
            </Text>
            {myorder.list_paket.map((mr, index) => {
            return (
            <View key={index} style={[ms.row, ms.jc('space-between')]}>
              <View>
                <Text style={[ms.fzBC(12, '500', '#222222')]}>Paket {mr?.name}</Text>
              </View>
              <View>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.txA('right')]}>
                  <Number number={mr?.biaya} />
                  ,-
                </Text>
              </View>
            </View>
            );
          })}
          <View style={[ms.row, ms.jc('space-between')]}>
              <View>
                <Text style={[ms.fzBC(12, '500', '#222222')]}>
                  Sub Total
                </Text>
                <Text style={[ms.fzBC(12, '500', '#222222')]}>
                  Ongkos Kirim
                </Text>
                <Text style={[ms.fzBC(12, '500', '#222222')]}>
                  Discount Voucher
                </Text>
              </View>
              <View>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.txA('right')]}>
                  <Number number={myorder?.sub_total} />
                  ,-
                </Text>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.txA('right')]}>
                  <Number number={myorder?.ongkos_kirim} />
                  ,-
                </Text>
                <Text style={[ms.fzBC(12, '500', '#222222'), ms.txA('right')]}>
                  - <Number number={myorder?.diskon} />
                  ,-
                </Text>
              </View>
            </View>
          </View>

          <View style={[ms.pdH(18), ms.pdV(16)]}>
            <Gap height={1} backgroundColor={'#F5F5F5'} />
          </View>

          <View style={[ms.pdH(18), ms.mgB(70)]}>
            <View style={[ms.row, ms.jc('space-between')]}>
              <Text style={[ms.fzBC(12, '700', '#222222')]}>Total Bayar</Text>
              <Text style={[ms.fzBC(12, '700', '#222222')]}>
                <Number number={myorder.total_biaya} />
                ,-
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailOrder;
