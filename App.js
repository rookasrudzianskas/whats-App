import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatListItem from "./src/components/ChatListItem";

const App = () => {
    return (
        <View className="">
            <ChatListItem />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
