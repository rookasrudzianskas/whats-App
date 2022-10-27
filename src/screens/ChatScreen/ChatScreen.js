//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, ImageBackground, FlatList} from 'react-native';
import bg from '../../../assets/images/BG.png';
import messagesData from '../../../assets/data/messages.json';
import Message from "../../components/Message";

const ChatScreen = () => {
    return (
        <ImageBackground source={bg} className="h-full">
            <FlatList
                data={messagesData}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                inverted={true}
                renderItem={({item}) => (
                <Message message={item} />
            )} />
        </ImageBackground>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
   list: {
       padding: 10,
   }
});
