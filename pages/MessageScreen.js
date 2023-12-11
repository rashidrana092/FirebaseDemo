import { View, Text } from 'react-native'
import React ,{useState,useEffect}from 'react'
import { GiftedChat,Bubble } from 'react-native-gifted-chat'
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';


const MessageScreen = ({navigation,route}) => {

  const { selectedItem } = route.params;
  const [messages, setMessages] = useState([]);
  const { loggedInUser } = route.params;
    
  const getAllMsg=async  ()=>{
    const docId=selectedItem.uid > loggedInUser.uid ? loggedInUser.uid+"-"+selectedItem.uid : selectedItem.uid+"-"+ loggedInUser.uid    
    const querySnap= await firestore().collection('chats')
    .doc(docId)
    .collection('messages')
    .orderBy('createdAt',"desc")
    .get()
    const allmsg= querySnap.docs.map(docSnap=>{
      return{
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate()
      }
     })

     setMessages(allmsg);
  }
  useEffect(() => {
    const docId=selectedItem.uid > loggedInUser.uid ? loggedInUser.uid+"-"+selectedItem.uid : selectedItem.uid+"-"+ loggedInUser.uid    
    const messageRef=firestore().collection('chats')
    .doc(docId)
    .collection('messages')
    .orderBy('createdAt',"desc")
    
    messageRef.onSnapshot((querySnap) =>{ // onsnapshot will listen every change in messages
      const allmsg= querySnap.docs.map(docSnap=>{
      const data=docSnap.data();
      if(data.createdAt){
        return{
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate()
        }
      }
       else{


        return{
          ...docSnap.data(),
          createdAt: new Date()
        }
      }
       })
  
       setMessages(allmsg);

    })       


    //getAllMsg()
  }, [])

  const onSend = (messageArray) => {

    const msg=messageArray[0];
    const mymsg={
      ...msg,
      sendBy: loggedInUser.uid,
      sendTo: selectedItem.uid,
      createdAt: new Date(),

    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docId=selectedItem.uid > loggedInUser.uid ? loggedInUser.uid+"-"+selectedItem.uid : selectedItem.uid+"-"+ loggedInUser.uid    
    
    firestore().collection('chats')
    .doc(docId)
    .collection('messages')
    .add({...mymsg,createdAt: firestore.FieldValue.serverTimestamp()})

    
  }

  return (


    <View style={{flex: 1}}>

     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: loggedInUser.uid,
      }}
    

    renderBubble={(props)=>{
        return <Bubble 
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "lightgrey"
          },
          right: {
           backgroundColor: '#307ecc' 
          }
        }}
   /> 
  }
}
/>
  
    </View>
  )
}

export default MessageScreen