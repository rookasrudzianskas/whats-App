import {ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import ContactListItem from '../../components/ContactListItem';
import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {listUsers} from "../../graphql/queries";
import LoadingIndicator from "../../components/LoadingIndicator";
import {MaterialIcons} from "@expo/vector-icons";

const ContactsScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((res) => {
            setUsers(res?.data?.listUsers?.items);
            // console.log(res.data.listUsers.items);
        });

    }, []);

    if(users.length === 0) return <LoadingIndicator />;

    return (
        <View className="pt-5 bg-white flex-1">
            <FlatList
                data={users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                style={{ backgroundColor: 'white' }}
                ListHeaderComponent={() => (
                    <TouchableOpacity className="border rounded border-gray-300 mx-3 py-2 px-3 mb-4" activeOpacity={0.7}
                        onPress={() => {}}
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
