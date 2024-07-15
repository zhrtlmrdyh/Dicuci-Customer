import React, { useEffect } from "react";
import { View } from "react-native";
import ms from "../../utils/ms";
import { getData } from "../../utils";
import { useDispatch } from "react-redux";

const Splash = ({navigation}) => {
    const dispatch = useDispatch();
    const init =()=>{
        getData('authUser').then((resAuthUser)=>{
            if(resAuthUser?._id){
                return navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
            }else{
                return navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }
        })
    }
    useEffect(() => {
        if(navigation?.isFocused()){
            init()
        }
        return () => {
        
        };
    }, [navigation])

    return (
        <View style={[ms.containerPage, ms.pd(16)]}>

        </View>
    )
}

export default Splash;