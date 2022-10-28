//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createMessage, updateChatRoom} from "../../graphql/mutations";

const InputBox = ({chatRoom}) => {
    const [text, setText] = useState('');

    const onSend = async () => {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

        const newMessage = {
            chatroomID: chatRoom.id,
            text,
            userID: authUser.attributes.sub,
        };

        const newMessageData = await API.graphql(
            graphqlOperation(createMessage, { input: newMessage })
        );

        setText("");

        API.graphql(graphqlOperation(updateChatRoom, {
            input: {
                _version: chatRoom._version,
                chatRoomLastMessageId: newMessageData.data.createMessage.id,
                id: chatRoom.id,
            }
        }));
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
           <View className="flex-row items-center px-3 bg-white">
               <TouchableOpacity activeOpacity={0.7} className="py-3">
                   <AntDesign name="plus" size={24} color="#0090ff" />
               </TouchableOpacity>
               <View className="flex-1 flex-row items-center border border-gray-300 rounded-full mx-3 px-3 py-[5px]">
                   <TextInput value={text} onChangeText={(text) => setText(text)} placeholder={'Type your message here.'} className="flex-1" />
                   <TouchableOpacity activeOpacity={0.7} className="">
                       <Ionicons name="document-attach" size={19} color="#0090ff" />
                   </TouchableOpacity>
               </View>
               <TouchableOpacity onPress={() => onSend()} activeOpacity={0.7} className="bg-[#0090ff] w-9 items-center justify-center rounded-full overflow-hidden h-9">
                   <Ionicons name="ios-send-sharp" size={20} style={{marginLeft: 3}} color="white" />
               </TouchableOpacity>
           </View>
        </SafeAreaView>
    );
};

export default InputBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
});
