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
            <Text style={styles.time}>{dayjs(message?.createdAt).fromNow() || 'Loading...'}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    container: {

    },
    time: {
        color: 'grey',
        alignSelf: 'flex-end',
    }
});
