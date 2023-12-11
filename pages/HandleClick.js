import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

const HandleClick=({navigation}) =>{
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
  
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');
  
    // Handle login
    function onAuthStateChanged(user) {
      console.log(user,'username');
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    // Handle the button press
    const  signInWithPhoneNumber=async() =>{
      const confirmation = await auth().signInWithPhoneNumber("+923002500510");
      setConfirm(confirmation);
    }
  
    const confirmCode= async () =>{
      try {
        await confirm.confirm(code);
        Alert.alert('OTP verified.');
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  
    if (!confirm) {
      return (
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+923002500510")}
        />
      );
    }
  
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
    }
  export default HandleClick;