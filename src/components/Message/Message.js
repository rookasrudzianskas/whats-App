//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Message = ({message}) => {
    return (
        <View>
            <Text>{message?.text}</Text>
        </View>
    );
};

export default Message;
