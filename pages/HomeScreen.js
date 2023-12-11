import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation, route}) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let Myself = auth().currentUser;
    console.log('my ', Myself);
    firestore()
      .collection('users')
      .doc(Myself.uid)
      .get()
      .then(res => {
        console.log('my ', res.data().name);
        setLoggedInUser(res.data());
   
      });
    firestore()
      .collection('users')
      .where('uid','!=',Myself.uid)
      .get()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          const {uid,name, email} = doc.data();
          users.push({
            uid,
            name,
            email,
          });
        });
        setUsers(users);
      });
  }, []);

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure? You want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace('Auth'))
              .catch(error => {
                console.log(error);
                if (error.code === 'auth/no-current-user')
                  navigation.replace('Auth');
                else Alert.alert(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onClick = item => {
    console.log(item);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
          }}>
          {loggedInUser ? (
            <Text style={{alignSelf: 'flex-start'}}>
              Welcome{':  '}
              {loggedInUser.name? loggedInUser.name : loggedInUser.email}
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 20,
              //textAlign: "center",
              fontWeight: 'bold',
              marginTop: 16,
              marginBottom: 10,
              alignSelf: 'flex-start',
            }}>
            Users List
          </Text>

         { console.log(users)}
          <FlatList
            style={{height: '100%'}}
            data={users}
            keyExtractor={item => item.uid}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MessageScreen', {
                    selectedItem: item,
                    loggedInUser: loggedInUser
                  })
                }
                
                style={styles.container}>
                  
                <View style={styles.innerContainer}>
                  <Image
                    source={require('../Image/pic.jpg')}
                    style={styles.image}
                  />
           
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemEmail}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}>
            <Text style={styles.buttonTextStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          React Native Firebase Authentication
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    marginHorizontal: 10,
    //width: '110%'
    //    borderWidth: 1,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemEmail: {
    fontWeight: '300',
  },
  buttonStyle: {
    minWidth: 300,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  item: {
    fontSize: 16,
    margin: 4,
    //borderWidth:1,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignSelf: 'baseline',
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
  },
});
