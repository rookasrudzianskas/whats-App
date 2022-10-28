//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);


const Message = ({message}) => {

    const isMyMessage = () => {
        return message?.user?.id === 'u1';
    }

    console.log(message);

    return (
        <View className="shadow-sm" style={[styles.container, {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
        }]}>
            <Text>{message?.text}</Text>
            <Text className="mt-2" style={styles.time}>{dayjs(message?.createdAt).fromNow() || 'Loading...'}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '80%',

    },
    time: {
        color: 'grey',
        alignSelf: 'flex-end',
    }
});
