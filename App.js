import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ChatListItem from "./src/components/ChatListItem";
import chatsData from './assets/data/chats.json';
import ChatsScreen from "./src/screens/ChatsScreen";
import ChatScreen from "./src/screens/ChatScreen";

const App = () => {
    return (
        <View className="py-0">
            <ChatScreen />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
