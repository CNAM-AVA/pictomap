import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { pictureService } from '../../services'

export default function ImagePreview({route, navigation}:any) {
    const [state, setState] = useState<any>({});

    const myPhoto = route.params.photo;

    console.log(myPhoto);

    console.log("test: " + pictureService.getUser());

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: myPhoto.uri}}
                style={{height: '100%'}}
                resizeMode='contain'
            />
            <Icon
                reverse
                name='send'
                type='font-awesome'
                color='#27466A'
                underlayColor='transparent'
                size={40}
                onPress={() => navigation.navigate('Home')}
                containerStyle={styles.send_icon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    send_icon: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
});
