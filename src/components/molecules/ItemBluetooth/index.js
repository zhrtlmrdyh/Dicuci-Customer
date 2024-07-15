import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IconBaju, IconMitra, IconVerifikasi } from '../../../assets/icon';
import { colors } from '../../../utils';
import { windowWidth } from '../../../utils/constants';
import ms from '../../../utils/ms';
import { ButtonL, Gap } from '../../atoms';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ItemBluetooth = ({ label, value, onPress, connected, actionText, color = '#00BCD4' }) => {
  return (
    <View style={styles.containerItem}>
        <View>
          <Text style={styles.label}>{label || 'UNKNOWN'}</Text>
          <Text>{value}</Text>
        </View>
        {connected && <Text style={styles.connected}>Terhubung</Text>}
        {!connected && (
          <TouchableOpacity onPress={onPress} style={styles.button(color)}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
  );
};

export default ItemBluetooth;

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
  },
  label: { fontWeight: 'bold' },
  connected: { fontWeight: 'bold', color: colors.red },
  button: color => ({
    backgroundColor: color,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  }),
  actionText: { color: 'white' },
  
});
