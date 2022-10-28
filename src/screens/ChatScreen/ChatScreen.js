//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, ImageBackground, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import bg from '../../../assets/images/BG.png';
import messagesData from '../../../assets/data/messages.json';
import Message from "../../components/Message";
import InputBox from "../../components/InputBox";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import LoadingIndicator from "../../components/LoadingIndicator";
import {API, graphqlOperation} from "aws-amplify";
import {getChatRoom} from "../../graphql/queries";

const ChatScreen = () => {
    const route = useRoute();
    const [chatRoom, setChatRoom] = useState(null);
    const { id, name } = route?.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const chatRoomID = route.params.id;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || 'Unknown man.',
        });
    }, []);

    useEffect(() => {
        (async () => {
            API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID })).then((result) => setChatRoom(result.data?.getChatRoom));
        })();
    }, []);

    console.log(chatRoom);

    if(!chatRoomID) return <LoadingIndicator />

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.bg}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
        >
            <ImageBackground source={bg} className="h-full">
                <FlatList
                    // style={{backgroundColor: 'white'}}
                    data={chatRoom?.Messages.items}
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
