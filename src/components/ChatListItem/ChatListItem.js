//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons, MaterialIcons} from "@expo/vector-icons";

const ChatListItem = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7} className="flex-row mt-20 items-start mx-4">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg'}} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold">Rokas</Text>
                    <Text className="text-gray-500 text-[15px]">07:30</Text>
                </View>
                <View className="space-x-1 flex-row items-center">
                    {/*<EvilIcons name="check" size={16} color="green" />*/}
                    <Text numberOfLines={2} className="text-gray-500 text-[15px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at consequatur dolores error ex ipsa maxime numquam officiis possimus quis.
                    </Text>
                </View>
                <View className=" border-b border-gray-300 mt-3"/>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
