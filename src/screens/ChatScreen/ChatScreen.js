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
import {getChatRoom, listMessagesByChatRoom} from "../../graphql/queries";
import {onCreateMessage} from "../../graphql/subscriptions";

const ChatScreen = () => {
    const route = useRoute();
    const [chatRoom, setChatRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const { id, name } = route?.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const chatRoomID = route.params.id;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || 'Chat 👋',
        });
    }, []);

    // Fetch chat room data
    useEffect(() => {
        (async () => {
            API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID })).then((result) => {
                setChatRoom(result.data?.getChatRoom);
            });
        })();
    }, [chatRoomID]);

    // Fetches messages
    useEffect(( ) => {
        API.graphql(graphqlOperation(listMessagesByChatRoom, { chatroomID: chatRoomID, sortDirection: "DESC" })).then((result) => {
            // console.log(result);
            setMessages(result.data?.listMessagesByChatRoom.items);
        });

        // Subscribe to new messages
        // @TODO is it chatroomID or chatRoomID?
        const subscription = API.graphql(graphqlOperation(onCreateMessage,  { filter: { chatroomID: { "eq": chatRoomID}}})).subscribe({
            next: ({value}) => {
                // console.log(value);
                setMessages((m) => [value.data.onCreateMessage, ...m]);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return () => subscription.unsubscribe();
    }, [chatRoomID]);

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
                    data={messages}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    inverted={true}
                    renderItem={({item}) => (
                    <Message message={item} />
                )} />
                <InputBox chatRoom={chatRoom} />
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
