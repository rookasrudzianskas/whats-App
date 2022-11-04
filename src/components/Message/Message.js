//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {Auth} from "aws-amplify";
import { S3Image } from "aws-amplify-react-native/dist/Storage";

dayjs.extend(relativeTime);


const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);
    const [imageSources, setImageSources] = useState([]);

    useEffect(() => {
        (async () => {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setIsMe(message.userID === authUser.attributes.sub);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (message.images) {
                const imageUrls = await Promise.all(message.images.map(Storage.get));
                setImageSources(imageUrls.map((uri) => ({ uri })));
            }
        })();
    }, [message.images]);

    return (
        <View className="shadow-sm" style={[styles.container, {
            backgroundColor: isMe ? '#DCF8C5' : 'white',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
        }]}>
            {message?.images?.length > 0 && (
                <S3Image imgKey={message.images[0]} style={styles.image} />
            )}
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
    },
    image: {
        width: 200,
        height: 100,
        borderColor: "#F4F6F7",
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 8,
    },
});
