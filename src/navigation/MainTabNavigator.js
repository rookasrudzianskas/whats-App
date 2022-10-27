import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "../screens/ChatsScreen";
import NotImplementedScreen from "../screens/NotImplementedScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Status" component={NotImplementedScreen} />
            <Tab.Screen name="Calls" component={NotImplementedScreen} />
            <Tab.Screen name="Camera" component={NotImplementedScreen} />
            <Tab.Screen name="Chats" component={ChatsScreen} />
            <Tab.Screen name="Settings" component={NotImplementedScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
