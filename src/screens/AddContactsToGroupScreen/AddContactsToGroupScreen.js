import React, { useState, useEffect } from "react";
import {FlatList, View, TextInput, StyleSheet, Button, Alert} from "react-native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {useNavigation, useRoute} from "@react-navigation/native";
import ContactListItem from "../../components/ContactListItem";
import {listUsers} from "../../graphql/queries";
import {createChatRoom, createUserChatRoom} from "../../graphql/mutations";

const AddContactsToGroupScreen = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const navigation = useNavigation();
    // get a route
    const route = useRoute();
    const chatRoom = route.params.chatRoom;

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result) => {
            // console.log("RESULT>>", JSON.stringify(result.users.items, null, 2));
            // console.log("ChatRoom>>", JSON.stringify(chatRoom.users.items, null, 2));
            setUsers(
                result.data?.listUsers?.items.filter(
                    (item) =>
                        !chatRoom.users.items.some(
                            (chatRoomUser) => !chatRoomUser._deleted && item.id === chatRoomUser.userID
                        )
                )
            );
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Add to group" disabled={selectedUserIds.length < 1} onPress={onAddToGroupPress} />
            ),
        });
    }, [selectedUserIds]);

    const onAddToGroupPress = async () => {
        // Add people to the chatRoom // UPDATING 🚀
        // it will wait for all the promises to resolve to all users to be added to the chat room
        await Promise.all(selectedUserIds.map((userID) => API.graphql(
            graphqlOperation(createUserChatRoom, { input: { chatRoomID: chatRoom.id, userID},
            })
        )));

        setSelectedUserIds([]);
        // Navigate to the chatRoom
        navigation.goBack();
    }

    const onContactPress = (id) => {
        setSelectedUserIds((userIds) => {
            if (userIds.includes(id)) {
                // remove id from array
                return [...userIds].filter((uid) => uid !== id);
            } else {
                return [...userIds, id];
            }
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ marginTop: 20}}
                data={users}
                renderItem={({ item }) => (
                    <ContactListItem
                        user={item}
                        selectable={true}
                        onPress={() => onContactPress(item.id)}
                        isSelected={selectedUserIds.includes(item.id)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white" },
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
        padding: 10,
        margin: 10,
    },
});

export default AddContactsToGroupScreen;
