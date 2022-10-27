import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "../screens/ChatsScreen";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={'Chats'}
            screenOptions={{
              tabBarStyle: { backgroundColor: 'whitesmoke' },
              headerStyle: { backgroundColor: 'whitesmoke' },
            }}
        >
            <Tab.Screen
                name="Status"
                component={NotImplementedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="logo-whatsapp" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calls"
                component={NotImplementedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="call-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Camera"
                component={NotImplementedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chats"
                component={ChatsScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <Entypo
                            onPress={() => navigation.navigate('Contacts')}
                            name="new-message"
                            size={18}
                            color={'royalblue'}
                            style={{ marginRight: 15 }}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Settings"
                component={NotImplementedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
