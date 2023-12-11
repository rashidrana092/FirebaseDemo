
import React, { useState ,useEffect} from 'react';
import { View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar,Logo, Toast, Icon, TextInput, Button, ScrollView, Wrapper, Space, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import HandleClick from './HandleClick';

const PhoneVerification = () => {
    const navigation = useNavigation()
    const [mobileNo,setMobileNo]=useState('');
    const [otpInput,setOtpInput]=useState('');
    const [confirmData,setConfirmData]=useState('');


  // Handle the button press
  const  sendOTP = async () =>{
    try{
    const response = await auth().signInWithPhoneNumber(mobileNo);
    setConfirmData(response);
    console.log(response);
    Alert.alert('OTP is sent. Kindly check your phone.');
    navigation.navigate('CodeVerification');
  }catch(err){
    console.log(err);
  }
};
   

      return (
        <View style={{flex:1,backgroundColor:"#F8F9F9",justifyContent:"center"}}>
            <View >
                <View >
                    <Text style={{fontSize:30,fontWeight:"900",color:"#383838",textAlign:"center"}}>
                        Enter your phone number{`\n`}to verify your{`\n`}account
                    </Text>
                    <View style={{flexDirection:"row",backgroundColor:"#FFF",borderColor:"#DEE1E1",borderWidth:1,borderRadius:8,paddingVertical:10,paddingHorizontal:10,margin: 10}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <TextInput
                                placeholder={"enter phone number"}
                                inputStyle={{padding:0,height:"auto",backgroundColor:"#FFF",paddingHorizontal:10}}
                                onChangeText={(value)=>setMobileNo(value)}
                            />
                        </View>
                    </View>
                    <Button
                        title ="Send Verification Code"
                        onPress={HandleClick}
                        style={{margin: 10}}
                    />
                </View>
         </View>
         </View>
    );
} 
export default PhoneVerification;
