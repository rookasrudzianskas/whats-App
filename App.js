import { StatusBar } from 'expo-status-bar';
import ChatScreen from "./src/screens/ChatScreen";
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./src/navigation";
// import { Amplify } from 'aws-amplify'
// import awsconfig from './src/aws-exports'
//
// Amplify.configure(awsconfig)

const App = () => {
    return (
        <>
            <Navigation />
            <StatusBar style="auto" />
        </>
    );
}

export default App;
