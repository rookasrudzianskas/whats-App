//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import chatsData from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem";

const ChatsScreen = () => {
    return (
        <View className="">
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
