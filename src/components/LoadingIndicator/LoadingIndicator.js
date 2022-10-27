//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingIndicator = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
        </View>
    );
};

export default LoadingIndicator;
