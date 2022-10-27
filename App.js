import { StatusBar } from 'expo-status-bar';
import Navigation from "./src/navigation";
import {Amplify, Auth} from 'aws-amplify'
import awsconfig from './src/aws-exports';
import {withAuthenticator} from "aws-amplify-react-native/src/Auth";
import {useEffect, useState} from "react";
import LoadingIndicator from "./src/components/LoadingIndicator";

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    }
});

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // get Auth user
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            // query the database using the Auth user ID
            // if there is no users in db, create one
        })();
    }, []);

    if(loading) return <LoadingIndicator />;

    return (
        <>
            <Navigation />
            <StatusBar style="auto" />
        </>
    );
}

export default withAuthenticator(App);
