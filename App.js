import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import PhoneVerification from "./pages/phoneVerification";
import CodeVerification from "./pages/codeVerification";
import HandleClick from "./pages/HandleClick";
import MessageScreen from "./pages/MessageScreen";
import ChatHeader from "./pages/ChatHeader";


const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", 
          headerStyle: {
            backgroundColor: "#307ecc", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerification}
        options={{
          title: "Phone Verification", 
          headerStyle: {
            backgroundColor: "#307ecc", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
      <Stack.Screen
        name="CodeVerification"
        component={CodeVerification}
        options={{
          title: "Code Verification", 
          headerStyle: {
            backgroundColor: "#307ecc", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home Screen", 
          headerStyle: {
            backgroundColor: "#307ecc", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
      <Stack.Screen
        name="HandleClick"
        component={HandleClick}
        options={{
          title: "HandleClick", 
          headerStyle: {
            backgroundColor: "#307ecc", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = (props) => {
  return (

    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
       screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#307ecc",
        },
        headerTintColor: "#fff"}}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home", 
            headerStyle: {
              backgroundColor: "#307ecc", 
            },
            headerTintColor: "#fff", 
            headerTitleStyle: {
              fontWeight: "bold", 
            },
          }}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={({ route})=>({title: route.params.selectedItem.name, loggedInUser:route.params.loggedInUser})}

          // followig line is passing props to  MessageScreen
          //{props => <MessageScreen {...props} user={route.params.selectedItem.name} />}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;