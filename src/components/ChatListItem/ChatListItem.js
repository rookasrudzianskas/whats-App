//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons, MaterialIcons} from "@expo/vector-icons";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
dayjs.extend(relativeTime);


const ChatListItem = ({chat}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userItem = chat.users.items.find((item) => item.user.id !== authUser.attributes.sub);
            setUser(userItem?.user);
        })();
    }, []);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {id: chat?.id, name: user?.name})} activeOpacity={0.7} className="flex-row items-start mx-4 mb-6">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: user?.image || 'https://i.pravatar.cc/300' }} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold">{user?.name || "Loading..."}</Text>
                    <Text className="text-gray-500 text-[15px]">{dayjs(chat?.LastMessage?.createdAt ).fromNow()|| 'Loading...'}</Text>
                </View>
                <View className="space-x-1 flex-row items-center">
                    {/*<EvilIcons name="check" size={16} color="green" />*/}
                    <Text numberOfLines={2} className="text-gray-500 text-[15px]">
                        {chat?.LastMessage?.text || "Loading..."}
                    </Text>
                </View>
                <View className=" border-b border-gray-300 mt-4"/>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
