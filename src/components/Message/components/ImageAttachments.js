import {Pressable, Image, StyleSheet, TouchableOpacity} from "react-native";
import { useState } from "react";
import ImageView from "react-native-image-viewing";

const ImageAttachments = ({ attachments }) => {
    const [imageViewerVisible, setImageViewerVisible] = useState(false);

    return (
        <>
            {attachments.map((attachment) => (
                <TouchableOpacity
                    style={[
                        styles.imageContainer,
                        attachments.length === 1 && { flex: 1 },
                    ]}
                    key={attachment.id} activeOpacity={0.7} onPress={() => setImageViewerVisible(true)}>
                    <Image source={{ uri: attachment.uri }} style={styles.image} />
                </TouchableOpacity>
            ))}

            <ImageView
                images={attachments.map(({ uri }) => ({ uri }))}
                imageIndex={0}
                visible={imageViewerVisible}
                onRequestClose={() => setImageViewerVisible(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
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

export default ImageAttachments;
