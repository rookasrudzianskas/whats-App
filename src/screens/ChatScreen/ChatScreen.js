//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from 'react-native';
import bg from '../../../assets/images/BG.png';
import messagesData from '../../../assets/data/messages.json';
import Message from "../../components/Message";
import InputBox from "../../components/InputBox";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import LoadingIndicator from "../../components/LoadingIndicator";
import {API, graphqlOperation} from "aws-amplify";
import {getChatRoom} from "../../graphql/queries";
import {onCreateAttachment, onCreateMessage, onUpdateChatRoom} from "../../graphql/subscriptions";
import {Feather} from "@expo/vector-icons";
import {listMessagesByChatRoom} from "./chatScreenQueries";

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
            title: name?.slice(0, 17) || 'Chat 👋',
            headerRight: () => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Group Info', { id: chatRoomID})}>
                    <Feather name="more-horizontal" size={24} color="gray" />
                </TouchableOpacity>
            ),
        });
    }, [route.params.name, chatRoomID]);

    // Fetch chat room data
    useEffect(() => {
        API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID })).then((result) => {
            setChatRoom(result.data?.getChatRoom);
        });

        const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chatRoomID} }})).subscribe({
            next: ({ value }) => {
                setChatRoom((cr) => ({...(cr || {}), ...value.data.onUpdateChatRoom}));
            },
            error: (error) => {
                console.log(error);
            }
        });

        return () => subscription.unsubscribe();
    }, [chatRoomID]);

    // Fetches messages
    useEffect(( ) => {
        // console.log('Fetching messages...',chatRoomID);
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

        // Subscribe to the new attachments
        const subscriptionAttachments = API.graphql(graphqlOperation(onCreateAttachment,  { filter: { chatroomID: { "eq": chatRoomID}}})).subscribe({
            next: ({value}) => {
                console.log("New attachment", value);
                const newAttachment = value.data.onCreateAttachment;
                // setMessages((m) => [value.data.onCreateMessage, ...m]);

                setMessages((existingMessages) => {
                    const index = existingMessages.findIndex((em) => em.id === newAttachment.messageID);
                    if(index === -1) return existingMessages;
                    return existingMessages.splice(index, 1, {
                        ...existingMessages[index],
                        Attachments: {
                            items: [
                                ...existingMessages[index].Attachments.items,
                                newAttachment
                            ]
                        }
                    });
                })
            },
            error: (error) => {
                console.log(error);
            }
        });

        return () => {
            subscription.unsubscribe();
            subscriptionAttachments.unsubscribe();
        };
    }, [chatRoomID]);

    if(!chatRoomID) return <LoadingIndicator />
    // console.log(JSON.stringify(chatRoom))

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.bg}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
        >
            <ImageBackground source={bg} className="h-full">
                <FlatList
                    keyExtractor={(item) => item.id}
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
