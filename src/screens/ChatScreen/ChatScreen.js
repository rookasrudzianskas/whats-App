//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, ImageBackground, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import bg from '../../../assets/images/BG.png';
import messagesData from '../../../assets/data/messages.json';
import Message from "../../components/Message";
import InputBox from "../../components/InputBox";
import {useNavigation, useRoute} from "@react-navigation/native";

const ChatScreen = () => {
    const route = useRoute();
    const { id, name } = route?.params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || 'Unknown man.',
        })
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.bg}
        >
            <ImageBackground source={bg} className="h-full">
                <FlatList
                    data={messagesData}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    inverted={true}
                    renderItem={({item}) => (
                    <Message message={item} />
                )} />
                <InputBox />
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
   }
});
