//@ts-nocheck
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

const ContactListItem = ({user}) => {

    return (
        <TouchableOpacity className="flex-row items-center mx-4 mb-6">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: user?.image || 'https://i.pravatar.cc/300' }} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold">{user?.name || "Loading..."}</Text>
                </View>
                {user?.status && (
                    <View className="space-x-1 flex-row items-center">
                        {/*<EvilIcons name="check" size={16} color="green" />*/}
                        <Text numberOfLines={1} className="text-blue-500 font-bold text-[13px]">
                            {user?.status.substring(0, 10) || "Loading..."}...
                        </Text>
                    </View>
                )}

            </View>
        </TouchableOpacity>
    );
};

export default ContactListItem;
