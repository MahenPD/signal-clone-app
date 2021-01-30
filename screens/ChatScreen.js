import React, { Fragment, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "../firebase";
import * as firebase from "../firebase";

const ChatScreen = (props) => {
  const { navigation, route } = props;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  fire

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
          <View style={{
              flexDirection="row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
          }}>
              <TouchableOpacity>
                  <FontAwesome name="video-camera" size={24} color="white"/>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Ionicons name="call" size={24} color="white" />
              </TouchableOpacity>
          </View>
      )
    });
  }, [navigation]);

  const sendMessage = () => {
      Keyboard.dismiss();

      db.collection('chats').doc(route.params.id).collection('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimeStamp(),
          message: input,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL
      })
  }

  useLayoutEffect(() => {
      const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
          snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          }))
      ))

      return unsubscribe;
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="lights"/>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
        >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <>
                <ScrollView>
                    {messages.map(({ id, data}) => (
                        data.email === auth.currentUser.email ? 
                        ( <View>
                            <Avatar />
                            <Text style={styles.recieverText}> {data.message}</Text>
                        </View> ) : (
                            <View>
                                                            <Avatar />
                            <Text style={styles.recieverText}> {data.message}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput placeholder="Signal Message" value={input} onSubmitEditing={sendMessage} onChangeText={(text) => setInput(text)} />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color = "#2868E" />
                    </TouchableOpacity>
                </View>
            </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        padding: 15,
    },
    TextInput: {
        bottom: 0,
        height: 40, 
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    }
});
