//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {useNavigation} from "@react-navigation/native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {getChatRoom} from "../../graphql/queries";
import {onUpdateChatRoom} from "../../graphql/subscriptions";
dayjs.extend(relativeTime);

const ChatListItem = ({chat}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState(chat);

    useEffect(() => {
        (async () => {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userItem = chatRoom.users.items.find((item) => item.user.id !== authUser.attributes.sub);
            setUser(userItem?.user);
        })();
    }, []);

    // Fetch chat room data
    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, { filter: { id: chat.id }})).subscribe({
            next: ({ value }) => {
                setChatRoom(cr => ({...(cr || {}), ...value.data.onUpdateChatRoom}));
            },
            error: (error) => {
                // console.log(error);
            }
        });

        return () => subscription.unsubscribe();
    }, [chat.id]);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {id: chatRoom?.id, name: user?.name})} activeOpacity={0.7} className="flex-row items-start mx-4 mb-6">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: user?.image || 'https://i.pravatar.cc/300' }} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold truncate">{user?.name.slice(0, 18) || "Loading..."}</Text>
                    {chatRoom?.LastMessage && (<Text className="text-gray-500 text-[15px]">{dayjs(chatRoom?.LastMessage?.createdAt ).fromNow()|| 'Loading...'}</Text>)}
                </View>
                    <View className="space-x-1 flex-row items-center">
                {/*{chatRoom?.LastMessage && (*/}
                {/*        // <EvilIcons name="check" size={16} color="green" />*/}
                        <Text numberOfLines={2} className="text-gray-500 text-[15px]">
                            {chatRoom?.LastMessage?.text || "👋 Say hello!"}
                        </Text>
                {/*)}*/}
                    </View>
                <View className=" border-b border-gray-300 mt-4"/>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
