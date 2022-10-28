//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, ImageBackground, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import bg from '../../../assets/images/BG.png';
import messagesData from '../../../assets/data/messages.json';
import Message from "../../components/Message";
import InputBox from "../../components/InputBox";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ChatScreen = () => {
    const route = useRoute();
    const { id, name } = route?.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const chatRoomID = route.params.id;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || 'Unknown man.',
        });
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.bg}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
        >
            <ImageBackground source={bg} className="h-full">
                <FlatList
                    // style={{backgroundColor: 'white'}}
                    data={messagesData}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    inverted={true}
                    renderItem={({item}) => (
                    <Message message={item} />
                )} />
                <InputBox chatRoomID={chatRoomID} />
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    bg: {

    },
   list: {
       padding: 10,
       // backgroundColor: 'white',
   }
});
