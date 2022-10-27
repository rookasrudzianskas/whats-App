import { StatusBar } from 'expo-status-bar';
import ChatScreen from "./src/screens/ChatScreen";
import {NavigationContainer} from "@react-navigation/native";

const App = () => {
    return (
        <>
            <NavigationContainer>
                <ChatScreen />
                <StatusBar style="auto" />
            </NavigationContainer>
        </>
    );
}

export default App;
