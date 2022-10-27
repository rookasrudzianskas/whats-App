import { StatusBar } from 'expo-status-bar';
import ChatScreen from "./src/screens/ChatScreen";
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports';
// import withAuthenticator
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    }
});

const App = () => {
    return (
        <>
            <Navigation />
            <StatusBar style="auto" />
        </>
    );
}

export default withAuthenticator(App);
