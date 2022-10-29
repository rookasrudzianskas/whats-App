import React, { useState, useEffect } from "react";
import {FlatList, View, TextInput, StyleSheet, Button, Alert} from "react-native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import ContactListItem from "../../components/ContactListItem";
import {listUsers} from "../../graphql/queries";
import {getCommonChatRoomWithUser} from "../../services/chatRoomService";
import {createChatRoom, createUserChatRoom} from "../../graphql/mutations";

const ContactsScreen = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result) => {
            setUsers(result.data?.listUsers?.items);
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Create" disabled={!name || selectedUserIds.length < 1} onPress={onCreateGroupPress} />
            ),
        });
    }, [name, selectedUserIds]);

    const onCreateGroupPress = async () => {
        // create a new chatRoom
        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: { name }}));
        if(!newChatRoomData.data?.createChatRoom) {
            Alert.alert("Whoops, error occurred", "Please try again later");
            return;
        }
        const newChatRoom = newChatRoomData.data?.createChatRoom;

        // Add people to the chatRoom // UPDATING 🚀
        // it will wait for all the promises to resolve to all users to be added to the chat room
        await Promise.all(selectedUserIds.map((userID) => API.graphql(
            graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID},
            })
        )));

        // Add authenticated user to the chat room
        const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        await API.graphql(graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID: authUser?.attributes?.sub}}));
        setSelectedUserIds([]);
        setName("");
        // Navigate to the chatRoom
        navigation.navigate("Chat", { id: newChatRoom.id });
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
            <TextInput
                placeholder="Group name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <FlatList
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

export default ContactsScreen;
