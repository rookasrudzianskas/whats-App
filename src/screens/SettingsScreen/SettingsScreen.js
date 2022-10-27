//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Auth} from "aws-amplify";

const SettingsScreen = () => {
    return (
        <View className="h-screen items-center justify-center">
            <TouchableOpacity onPress={() => Auth.signOut()} activeOpacity={0.7} className="bg-blue-500 rounded-md px-10 py-3">
                <Text className="text-white font-bold">
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;
