import { useEffect, useState } from "react";
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    Alert, TouchableOpacity,
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";

import { API, graphqlOperation } from "aws-amplify";
import {onUpdateChatRoom} from "../../graphql/subscriptions";
import ContactListItem from "../../components/ContactListItem";
import {deleteUserChatRoom} from "../../graphql/mutations";

const ChatRoomInfo = () => {
    const [chatRoom, setChatRoom] = useState(null);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();

    const chatroomID = route.params.id;

    const fetchChatRoom = async () => {
        setLoading(true);
        const result = await API.graphql(graphqlOperation(getChatRoom, { id: chatroomID }))
        setChatRoom(result.data?.getChatRoom);
        setLoading(false);
    }

    useEffect(() => {
        fetchChatRoom();
        // Subscribe to onUpdateChatRoom
        const subscription = API.graphql(
            graphqlOperation(onUpdateChatRoom, {
                filter: { id: { eq: chatroomID } },
            })
        ).subscribe({
            next: ({ value }) => {
                setChatRoom((cr) => ({
                    ...(cr || {}),
                    ...value.data.onUpdateChatRoom,
                }));
            },
            error: (error) => console.warn(error),
        });

        // Stop receiving data updates from the subscription
        return () => subscription.unsubscribe();
    }, [chatroomID]);

    const removeChatRoomUser = async (chatRoomUser) => {
        const response = await API.graphql(graphqlOperation(deleteUserChatRoom, { input: {
                _version: chatRoomUser._version,
                id: chatRoomUser.id,
            }}));
    }

    const onContactPress = (chatRoomUser) => {
        Alert.alert("Removing the user", `Are you sure you want to remove ${chatRoomUser.user.name} from the group?`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => removeChatRoomUser(chatRoomUser),
            }
        ])
    }

    if (!chatRoom) {
        return <ActivityIndicator />;
    }

    // We filter it out, because AWS saves the DB user and other docs for 30 days with the _deleted tag and TTL (30 days).
    const users = chatRoom.users.items.filter((item) => !item._deleted);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{chatRoom?.name || '👋 Story starts here'}</Text>

            <Text style={styles.sectionTitle}>
                {users?.length} Participants
            </Text>
            <View style={styles.section}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onRefresh={fetchChatRoom}
                    refreshing={loading}
                    data={users}
                    renderItem={({ item }) => (
                        <ContactListItem
                            onPress={() => onContactPress(item)}
                            user={item.user}
                        />
                    )}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Add Contacts', { chatRoom })} activeOpacity={0.7} className="absolute bottom-10 right-8 bg-blue-500 rounded-md py-2 px-5">
                <Text className="font-semibold text-white">Invite Friends</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20,
    },
    section: {
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 10,
    },
});

export const getChatRoom = /* GraphQL */ `
    query GetChatRoom($id: ID!) {
        getChatRoom(id: $id) {
            id
            updatedAt
            name
            users {
                items {
                    id
                    chatRoomID
                    userID
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                    user {
                        id
                        name
                        status
                        image
                    }
                }
                nextToken
                startedAt
            }
            createdAt
            _version
            _deleted
            _lastChangedAt
            chatRoomLastMessageId
        }
    }
`;

export default ChatRoomInfo;
