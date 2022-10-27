import {ActivityIndicator, FlatList, View} from 'react-native';
import chats from '../../../assets/data/chats.json';
import ContactListItem from '../../components/ContactListItem';
import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {listUsers} from "../../graphql/queries";

const ContactsScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((res) => {
            setUsers(res?.data?.listUsers?.items);
            // console.log(res.data.listUsers.items);
        });

    }, []);

    if(users.length === 0){
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>

        )
    }

    return (
        <View className="pt-5 bg-white flex-1">
            <FlatList
                data={users}
                renderItem={({ item }) => <ContactListItem user={item} />}
                style={{ backgroundColor: 'white' }}
            />
        </View>
    );
};

export default ContactsScreen;
