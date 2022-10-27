import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatListItem from "./src/components/ChatListItem";
import chatsData from './assets/data/chats.json';

const App = () => {
    return (
        <View className="">
            <ChatListItem chat={chatsData[0]} />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
