//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons, MaterialIcons} from "@expo/vector-icons";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {useNavigation} from "@react-navigation/native";
dayjs.extend(relativeTime);


const ChatListItem = ({chat}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {id: chat?.id })} activeOpacity={0.7} className="flex-row items-start mx-4 mb-6">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: chat?.user?.image || 'https://i.pravatar.cc/300' }} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold">{chat?.user?.name || "Loading..."}</Text>
                    <Text className="text-gray-500 text-[15px]">{dayjs(chat?.lastMessage?.createdAt ).fromNow()|| 'Loading...'}</Text>
                </View>
                <View className="space-x-1 flex-row items-center">
                    {/*<EvilIcons name="check" size={16} color="green" />*/}
                    <Text numberOfLines={2} className="text-gray-500 text-[15px]">
                        {chat?.lastMessage?.text || "Loading..."}
                    </Text>
                </View>
                <View className=" border-b border-gray-300 mt-4"/>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
