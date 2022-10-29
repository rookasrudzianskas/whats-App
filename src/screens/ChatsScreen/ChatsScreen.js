//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import ChatListItem from "../../components/ChatListItem";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listChatRooms} from "./queries";
import LoadingIndicator from "../../components/LoadingIndicator";

const ChatsScreen = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [loadingOne, setLoadingOne] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchChatsRooms = async () => {
        setLoading(true);
        // fetch chats
        const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const response = await API.graphql(graphqlOperation(listChatRooms, { id: authUser.attributes.sub }));

        const rooms = response?.data?.getUser?.ChatRooms?.items?.filter((item) => !item._deleted) || [];
        const sortedRooms = rooms.sort((room1, room2) => new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt));

        setChatRooms(sortedRooms);
        setLoadingOne(false);
        setLoading(false);
    }

    useEffect(() => {
        fetchChatsRooms();
    }, []);

    if(loadingOne) return <LoadingIndicator />;


    return (
        <View className="pt-5 flex-1 bg-white">
            <FlatList
                data={chatRooms}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={fetchChatsRooms}
                renderItem={({item}) => (
                    <ChatListItem chat={item.chatRoom} />
                )} />
        </View>
    );
};

export default ChatsScreen;
