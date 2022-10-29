import {ActivityIndicator, Alert, FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import ContactListItem from '../../components/ContactListItem';
import {useEffect, useState} from "react";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listUsers} from "../../graphql/queries";
import LoadingIndicator from "../../components/LoadingIndicator";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {getCommonChatRoomWithUser} from "../../services/chatRoomService";
import {createChatRoom, createUserChatRoom} from "../../graphql/mutations";

const ContactsScreen = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((res) => {
            setUsers(res?.data?.listUsers?.items);
            // console.log(res.data.listUsers.items);
        });

    }, []);

    const createAChatRoomWithTheUser = async (user) => {
        // check if we already have a chat room with the selected user
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);
        if(existingChatRoom) {
            navigation.navigate('Chat', {id: existingChatRoom.chatRoom.id });
            return;
        }
        // if we do, navigate to the chat room
        // create a new chatRoom
        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {}}));
        if(!newChatRoomData.data?.createChatRoom) {
            Alert.alert("Whoops, error occurred", "Please try again later");
            return;
        }
        const newChatRoom = newChatRoomData.data?.createChatRoom;
        // Add people to the chatRoom
        // Add the clicked user to the chat room
        await API.graphql(graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID: user.id}}));
        // Add authenticated user to the chat room
        const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        await API.graphql(graphqlOperation(createUserChatRoom, { input: { chatRoomID: newChatRoom.id, userID: authUser?.attributes?.sub}}));
        // Navigate to the chatRoom
        navigation.navigate("Chat", { id: newChatRoom.id });
    }

    if(users.length === 0) return <LoadingIndicator />;

    return (
        <View className="pt-5 bg-white flex-1">
            <FlatList
                data={users}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ContactListItem onPress={() => createAChatRoomWithTheUser(item)} user={item} />}
                style={{ backgroundColor: 'white' }}
                ListHeaderComponent={() => (
                    <TouchableOpacity className="border rounded border-gray-300 mx-3 py-2 px-3 mb-4" activeOpacity={0.7}
                        onPress={() => navigation.navigate('New Group')}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <MaterialIcons
                            name="group"
                            size={24}
                            color="royalblue"
                            style={{
                                marginRight: 20,
                                backgroundColor: "gainsboro",
                                padding: 7,
                                borderRadius: 20,
                                overflow: "hidden",
                            }}
                        />
                        <Text className="font-semibold text-blue-500" style={{ fontSize: 16 }}>New Group</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ContactsScreen;
