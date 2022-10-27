//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import bg from '../../../assets/images/BG.png';
const ChatScreen = () => {
    return (
        <ImageBackground source={bg} className="h-full">
            <Text>
                byrookas 🚀
            </Text>
        </ImageBackground>
    );
};

export default ChatScreen;
