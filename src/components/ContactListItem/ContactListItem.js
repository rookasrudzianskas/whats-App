//@ts-nocheck
import React from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createChatRoom, createUserChatRoom} from "../../graphql/mutations";
import {useNavigation} from "@react-navigation/native";

const ContactListItem = ({user}) => {
    const navigation = useNavigation();

    const onPress = async () => {
        // check if we already have a chat room with the selected user
        // if we do, navigate to the chat room
        // create a new chatRoom
        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {}}));
        if(!newChatRoomData.data?.createChatRoom) {
            Alert.alert("Whoops, error occurred", "Please try again later");
            return;
        }
        const newChatRoom = newChatRoomData.data?.createChatRoom;
        // Add people to the chatRoom
        // Add the clicked user to the chat room
        await API.graphql(graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID: user.id}}));
        // Add authenticated user to the chat room
        const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        await API.graphql(graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID: authUser?.attributes?.sub}}));
        // Navigate to the chatRoom
        navigation.navigate("Chat", { id: newChatRoom.id });
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="flex-row items-center mx-4 mb-6">
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
