import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ms from '../../utils/ms';
import {
  IconBack,
  IconWashing,
  IconBag,
  IconOjol,
  IconTshirt,
  IconCheck,
  IconOjolGrey,
  IconBagGrey,
  IconLine,
  IconCircleBlue,
  IconCircleGrey,
  IconLineGrey,
  IconSLineGrey,
  IconLineOmbre,
} from '../../assets/icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Gap, TrackingStatus} from '../../components';
import {windowWidth} from '../../utils/constants';
import {useSelector} from 'react-redux';

const TracingOrder = ({navigation}) => {
  const {myorder_detail} = useSelector(state => state.myorderReeducer);
  return (
    <View style={[ms.containerPage, ms.pdT(16)]}>
      <ScrollView>
        <View style={[ms.containerPage]}>
          <View style={[ms.row, ms.ai('center'), ms.mgB(34), ms.pdH(18)]}>
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

          <View>
            {/* Status = 5 */}
            {myorder_detail?.fk_status == "62e765ce99b8110730e94466" &&(
              <View>
                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(28), ms.mgB(27)]}>
                    <View style={[ms.row, ms.jc('space-between')]}>
                      <Image source={IconWashing} />
                      <Image source={IconTshirt} />
                      <Image source={IconBag} />
                      <Image source={IconOjol} />
                    </View>
                  </View>
                </View>

                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(50), ms.mgB(20)]}>
                    <View style={[ms.row, ms.ai('center')]}>
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                    </View>
                  </View>
                </View>

                <Text style={[ms.fzBC(12, '400', '#000000'), ms.txA('center')]}>
                  Cucianmu sudah selesai, Terima kasih sudah menunggu
                </Text>

                <View>
                  <TrackingStatus myorder={myorder_detail}/>
                </View>
              </View>
            )}
            {/* Status = 4 */}
            {myorder_detail?.fk_status == "62e765b799b8110730e94465" &&(
              <View>
                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(28), ms.mgB(27)]}>
                    <View style={[ms.row, ms.jc('space-between')]}>
                      <Image source={IconWashing} />
                      <Image source={IconTshirt} />
                      <Image source={IconBag} />
                      <Image source={IconOjol} />
                    </View>
                  </View>
                </View>

                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(50), ms.mgB(20)]}>
                    <View style={[ms.row, ms.ai('center')]}>
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                      <Image source={IconLine} />
                      <Image source={IconCheck} />
                    </View>
                  </View>
                </View>

                <Text style={[ms.fzBC(12, '400', '#000000'), ms.txA('center')]}>
                  Cucianmu sudah selesai, waktunya dikirim
                </Text>

                <View>
                  <TrackingStatus myorder={myorder_detail}/>
                </View>
              </View>
            )}

            {/* Status = 3 */}
            {myorder_detail?.fk_status == "62e765a299b8110730e94464" && (
              <View>
                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(28), ms.mgB(27)]}>
                    <View style={[ms.row, ms.jc('space-between')]}>
                      <Image source={IconWashing} />
                      <Image source={IconTshirt} />
                      <Image source={IconBag} />
                      <Image source={IconOjolGrey} />
                    </View>
                  </View>
                </View>

                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(50), ms.mgB(20)]}>
                    <View style={[ms.row, ms.ai('center')]}>
                      <Image source={IconCheck} />
                      <Image source={IconLine} />

                      <Image source={IconCheck} />
                      <Image source={IconLine} />

                      <Image source={IconCheck} />
                      <Image source={IconLineGrey} />
                      <Image source={IconCircleGrey} />
                    </View>
                  </View>
                </View>

                <Text style={[ms.fzBC(12, '400', '#000000'), ms.txA('center')]}>
                  Cucianmu sedang dipacking
                </Text>

                <View>
                  <TrackingStatus myorder={myorder_detail}/>
                </View>
              </View>
            )}

            {/* Status = 2 */}
            {myorder_detail?.fk_status == "62e7655f99b8110730e94463" && (
              <View>
                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(28), ms.mgB(27)]}>
                    <View style={[ms.row, ms.jc('space-between')]}>
                      <Image source={IconWashing} />
                      <Image source={IconTshirt} />
                      <Image source={IconBagGrey} />
                      <Image source={IconOjolGrey} />
                    </View>
                  </View>
                </View>

                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(50), ms.mgB(20)]}>
                    <View style={[ms.row, ms.ai('center')]}>
                      <Image source={IconCheck} />
                      <Image source={IconLine} />

                      <Image source={IconCheck} />
                      <Image source={IconLineGrey} />

                      <Image source={IconCircleGrey} />
                      <Image source={IconLineGrey} />
                      <Image source={IconCircleGrey} />
                    </View>
                  </View>
                </View>

                <Text style={[ms.fzBC(12, '400', '#000000'), ms.txA('center')]}>
                  Cucianmu sedang dikeringkan
                </Text>

                <View>
                  <TrackingStatus myorder={myorder_detail}/>
                </View>
              </View>
            )}

            {/* Status = 1 */}
            {myorder_detail?.fk_status == "62e764d599b8110730e94462" && (
              <View>
                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(28), ms.mgB(27)]}>
                    <View style={[ms.row, ms.jc('space-between')]}>
                      <Image source={IconWashing} />
                      <Image source={IconTshirt} />
                      <Image source={IconBagGrey} />
                      <Image source={IconOjolGrey} />
                    </View>
                  </View>
                </View>

                <View style={[ms.width(windowWidth)]}>
                  <View style={[ms.pdH(50), ms.mgB(20)]}>
                    <View style={[ms.row, ms.ai('center')]}>
                      <Image source={IconCheck} />
                      <Image source={IconLineGrey} />

                      <Image source={IconCircleGrey} />
                      <Image source={IconLineGrey} />

                      <Image source={IconCircleGrey} />
                      <Image source={IconLineGrey} />
                      <Image source={IconCircleGrey} />
                    </View>
                  </View>
                </View>

                <Text style={[ms.fzBC(12, '400', '#000000'), ms.txA('center')]}>
                  Cucianmu sedang dicuci
                </Text>

                <View>
                  <TrackingStatus myorder={myorder_detail}/>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TracingOrder;
