//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";

const InputBox = () => {
    const [newMessage, setNewMessage] = useState('');
    const onSend = () => {
        console.warn('Sending...', newMessage);
        setNewMessage('');
    }

    return (
        <View className="flex-row items-center bg-white px-3 py-2 pb-7">
            <TouchableOpacity activeOpacity={0.7}>
                <AntDesign name="plus" size={24} color="#0090ff" />
            </TouchableOpacity>
            <View className="flex-1 flex-row items-center border border-gray-300 rounded-full mx-3 px-3 py-[5px]">
                <TextInput value={newMessage} onChangeText={(text) => setNewMessage(text)} placeholder={'Type your message here.'} className="flex-1" />
                <TouchableOpacity activeOpacity={0.7} className="">
                    <Ionicons name="document-attach" size={19} color="#0090ff" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => onSend()} activeOpacity={0.7} className="bg-[#0090ff] w-9 items-center justify-center rounded-full overflow-hidden h-9">
                <Ionicons name="ios-send-sharp" size={20} style={{marginLeft: 3}} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default InputBox;
