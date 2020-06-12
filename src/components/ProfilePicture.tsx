import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function ProfilePicture(props: any) {
    let size = props.size || "normal";
    let customStyle = props.customStyle || {};
    let uri = props.uri;
    let title = props.title;
    if(!title)
        uri = 'https://firebasestorage.googleapis.com/v0/b/pictomap-9aad7.appspot.com/o/MJ.jpg?alt=media&token=657c33f3-af50-4f7f-be8c-1141a5e22b6f';
    if(uri){
        return (
            <Avatar
                size="xlarge"
                rounded
                containerStyle={[styles.round_image, styles[size], customStyle]}
                source={{ uri: uri }}
                title={title}
                onPress={props.actionOnPress}
            />
        )
    }
    else {
        return (
            <Avatar
                size="xlarge"
                rounded
                containerStyle={[styles.round_image, styles[size], customStyle]}
                title={title}
                onPress={props.actionOnPress}
            />
        )
    }
    
}

const styles:any = StyleSheet.create({
    round_image: {
        // flex: 1,
        backgroundColor: '#27466A',
        margin: 4,
    },
    small: {
        height: 15,
        width: 15,
        borderRadius: 10,
    },
    normal: {
        height: 50,
        width: 50,
        borderRadius: 40,
    },
    big: {
        height: 100,
        width: 100,
        borderRadius: 90,
    },
    beeg: {
        height: 150,
        width: 150,
        borderRadius: 140,
    }
});
