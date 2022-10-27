//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ChatListItem = () => {
    return (
        <TouchableOpacity activeOpacity={0.7} className="flex-row mt-20 items-center mx-4">
            <View className="">
                <Image className="w-[55px]  h-[55px] rounded-full" source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg'}} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">Rokas</Text>
                    <Text className="text-gray-500 text-[15px]">07:30</Text>
                </View>
                <Text className="text-gray-500 text-[15px]">
                    Oke
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;
