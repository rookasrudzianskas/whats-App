import {FlatList, View} from 'react-native';
import chats from '../../../assets/data/chats.json';
import ContactListItem from '../../components/ContactListItem';

const ContactsScreen = () => {
    return (
        <View className="pt-5 bg-white">
            <FlatList
                data={chats}
                renderItem={({ item }) => <ContactListItem user={item.user} />}
                style={{ backgroundColor: 'white' }}
            />
        </View>
    );
};

export default ContactsScreen;
