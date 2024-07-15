import {View, Text, Image} from 'react-native';
import React from 'react';
import ms from '../../../utils/ms';
import {
  IconCircleBlue,
  IconCircleGrey,
  IconLineGrey,
  IconLineOmbre,
  IconSLineGrey,
} from '../../../assets/icon';
import {Gap} from '../../atoms';
import {windowWidth} from '../../../utils/constants';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TrackingStatus = ({myorder}) => {
  const {myorder_detail} = useSelector(state => state.myorderReeducer);
  return (
    <View>
      <View>
        <View style={[ms.mgT(25), ms.pdH(18)]}>
          <Text style={[ms.fzBC(16, '700', '#222222')]}>Detail Paket</Text>
        </View>

        <View style={[ms.pdH(18), ms.pdV(16)]}>
          <Gap height={1} backgroundColor={'#E7E7E7'} />
        </View>
        {/* sort((a, b) => a.date - b.date). */}

        {myorder?.list_paket?.map((tracking, index) => {
          return (
            <View key={index} style={[ms.pdH(18)]}>
              {tracking.tracking_status.map((status, index) => {
                return (
                  <View key={index}>
                    <View style={[ms.row]}>
                      {status?.name != 'sistem' && (
                        <View>
                          <Image source={IconCircleGrey} />
                          <Image
                            style={[ms.l(5), ms.t(0)]}
                            source={IconSLineGrey}
                          />
                        </View>
                      )}

                      {status?.name == 'sistem' && (
                        <View>
                          <Image source={IconCircleBlue} />
                          <Image
                            style={[ms.l(5), ms.t(0)]}
                            source={IconLineOmbre}
                          />
                        </View>
                      )}

                      <View
                        style={[
                          ms.width((windowWidth * 73) / 100),
                          ms.mgL(16),
                        ]}>
                        <Text style={[ms.fzBC(12, '400', '#000000')]}>
                          {status?.name} -{' '}
                          {moment(status?.tanggal).format(
                            'DD MMMM YYYY',
                          )}
                        </Text>
                        <Text style={[ms.fzBC(12, '400', '#000000')]}>
                          {status?.catatan}
                        </Text>
                      </View>
                      <Text style={[ms.fzBC(12, '400', '#000000')]}>
                        {moment(status?.tanggal).format(
                          'HH:mm',
                        )}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TrackingStatus;
