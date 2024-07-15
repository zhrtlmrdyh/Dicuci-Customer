import React from "react";
import { Text, View } from "react-native";
import ms from "../../../utils/ms";
import Number from '../Number';

const PaketDibayar = ({myorder}) => {
    return (
        <View style={[ms.row, ms.pdH(16), ms.pdT(16)]}>
            <View style={[ms.width('50%')]}>
                <Text style={[ms.fzBC(12, '400', '#222222')]}>{myorder?.name}</Text>
                <Text style={[ms.fzBC(12, '400', '#222222')]}>x{myorder?.qty} paket</Text>
            </View>
            <View style={[ms.width('50%')]}>
                <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}><Number number={myorder?.biaya_satuan} />,-</Text>
            </View>
        </View>
    )
}

export default PaketDibayar;