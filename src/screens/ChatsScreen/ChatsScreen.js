//@ts-nocheck
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import chatsData from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listChatRooms} from "./queries";

const ChatsScreen = () => {

    useEffect(() => {
        const fetchChats = async () => {
            // fetch chats
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            // console.log(authUser.attributes.sub);
            const response = await API.graphql(graphqlOperation(listChatRooms, { id: authUser.attributes.sub }));
            console.log(response);
        }
        fetchChats();
    }, []);


    return (
        <View className="mt-5">
            <FlatList
                data={chatsData}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <ChatListItem chat={item} />
                )} />
        </View>
    );
};

export default ChatsScreen;
