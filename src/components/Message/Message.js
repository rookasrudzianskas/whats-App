//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {Auth, Storage} from "aws-amplify";
import ImageView from "react-native-image-viewing";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import {Video} from "expo-av";
import ImageAttachments from "./components/ImageAttachments";
import VideoAttachments from "./components/VideoAttachments";

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
        console.log("Should we download or not?")
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

    const imageAttachments = downloadAttachments.filter(attachment => attachment.type === 'IMAGE');
    const videoAttachments = downloadAttachments.filter(attachment => attachment.type === 'VIDEO');

    console.log("Image attachments", JSON.stringify(imageAttachments));

    return (
        <View className="shadow-sm" style={[styles.container, {
            backgroundColor: isMe ? '#DCF8C5' : 'white',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
        }]}>
            {downloadAttachments.length > 0 && (
                <View style={[{ width: imageContainerWidth }, styles.images]}>
                    <ImageAttachments attachments={imageAttachments} />

                    <VideoAttachments
                        attachments={videoAttachments}
                        width={imageContainerWidth}
                    />
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
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",

        // Shadows
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    time: {
        color: "gray",
        alignSelf: "flex-end",
    },
    images: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imageContainer: {
        width: "50%",
        aspectRatio: 1,
        padding: 3,
    },
    image: {
        flex: 1,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
});
