//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {Auth, Storage} from "aws-amplify";
import ImageView from "react-native-image-viewing";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

dayjs.extend(relativeTime);


const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const { width } = useWindowDimensions();
    const [downloadAttachments, setDownloadedAttachments] = useState([]);
    const imageContainerWidth = width * 0.8 - 30;

    useEffect(() => {
        (async () => {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setIsMe(message.userID === authUser.attributes.sub);
        })();
    }, []);

    useEffect(() => {
        const downloadAttachments = async () => {
            if (message.Attachments.items) {
                const downloadedAttachments = await Promise.all(
                    message.Attachments.items.map((attachment) =>
                        Storage.get(attachment.storageKey).then((uri) => ({
                            ...attachment,
                            uri,
                        }))
                    )
                );

                setDownloadedAttachments(downloadedAttachments);
            }
        };
        downloadAttachments();
    }, [message.Attachments.items]);

    return (
        <View className="shadow-sm" style={[styles.container, {
            backgroundColor: isMe ? '#DCF8C5' : 'white',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
        }]}>
            {downloadAttachments?.length > 0 && (
                <View style={{ width: imageContainerWidth }}>
                    <View style={styles.images}>
                        {downloadAttachments.map((imageSource, index) => (
                            <>
                                <TouchableOpacity
                                    style={[
                                        styles.imageContainer,
                                        downloadAttachments.length === 1 && { flex: 1 },
                                    ]}
                                    key={imageSource.uri} activeOpacity={0.7} onPress={() => setImageViewerVisible(true)}>
                                    <Image source={{ uri: imageSource.uri }} style={styles.image} />
                                </TouchableOpacity>

                                <ImageView
                                    images={downloadAttachments.map(({ uri }) => ({ uri }))}
                                    imageIndex={0}
                                    visible={imageViewerVisible}
                                    onRequestClose={() => setImageViewerVisible(false)}
                                />
                            </>
                        ))}
                    </View>
                </View>
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
        flex: 1,
        borderColor: "#F4F6F7",
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 8,
    },
    images: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imageContainer: {
        width: "45%",
        aspectRatio: 1,
        borderColor: "white",
        margin: 2,
    }
});
