//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);


const Message = ({message}) => {
    return (
        <View style={styles.container}>
            <Text>{message?.text}</Text>
            <Text className="mt-2" style={styles.time}>{dayjs(message?.createdAt).fromNow() || 'Loading...'}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 10,
        alignSelf: 'flex-start',
        margin: 5,
        borderRadius: 10,
        maxWidth: '80%',

    },
    time: {
        color: 'grey',
        alignSelf: 'flex-end',
    }
});
