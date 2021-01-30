import { StatusBar } from "expo-status-bar";
import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C68ED' },
  headerTitleStyle: {color: 'white'},
  headerTintColor: "white",
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.screen name="Login" component={LoginScreen} />
        <Stack.screen name="Register" component={RegisterScreen} />
        <Stack.screen name="Home" component={HomeScreen} />
        <Stack.screen name="AddChat" component={AddChatScreen} />
        <Stack.screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
