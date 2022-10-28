//@ts-nocheck
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import chatsData from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem";
import {Auth} from "aws-amplify";

const ChatsScreen = () => {

    useEffect(() => {
        const fetchChats = async () => {
            // fetch chats
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            // console.log(authUser.attributes.sub);
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
