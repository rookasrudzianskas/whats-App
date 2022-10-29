//@ts-nocheck
import React from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {AntDesign, FontAwesome} from "@expo/vector-icons";

const ContactListItem = ({user, onPress = () => {}, selectable = false, isSelected = false}) => {
    const navigation = useNavigation();



    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="flex-row items-center mx-4 mb-6">
            <View className="">
                <Image className="w-[55px] h-[55px] rounded-full" source={{ uri: user?.image || 'https://i.pravatar.cc/300' }} />
            </View>
            <View className="flex-1 justify-center ml-3">
                <View className="flex-row justify-between items-center">
                    <Text numberOfLines={1} className="text-lg font-semibold">{user?.name.slice(0, 17) || "Loading..."}</Text>
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
            {selectable &&
                (isSelected ? (
                    <AntDesign name="checkcircle" size={20} color="royalblue" />
                ) : (
                    <FontAwesome name="circle-thin" size={20} color="lightgray" />
                ))}
        </TouchableOpacity>
    );
};

export default ContactListItem;
