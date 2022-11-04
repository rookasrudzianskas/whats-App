//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {Auth, Storage} from "aws-amplify";
import ImageView from "react-native-image-viewing";

dayjs.extend(relativeTime);


const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);
    const [imageSources, setImageSources] = useState([]);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);

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
            {imageSources?.length > 0 && (
                <>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setImageViewerVisible(true)}>
                        <Image source={imageSources[0]} style={styles.image} />
                    </TouchableOpacity>

                    <ImageView
                        images={imageSources}
                        imageIndex={0}
                        visible={imageViewerVisible}
                        onRequestClose={() => setImageViewerVisible(false)}
                    />
                </>
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
