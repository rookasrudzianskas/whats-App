import { StatusBar } from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ChatListItem from "./src/components/ChatListItem";
import chatsData from './assets/data/chats.json';
import ChatsScreen from "./src/screens/ChatsScreen";

const App = () => {
    return (
        <View className="py-16">
            <ChatsScreen />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
