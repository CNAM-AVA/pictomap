import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Text } from 'react-native';
import { Icon, Overlay,  } from 'react-native-elements';
import { pictureService, userService } from '../../services';

export default function ImagePreview({route, navigation}:any) {
    const [state, setState] = useState<any>({});
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const myPhoto = route.params.photo;
    const send = route.params.send;

    function savePicture(){
        toggleOverlay();
        let userId = userService.getUser().uuid;
        pictureService.savePicture(myPhoto, userId)
        .then((res) => {
            console.log(res);
            toggleOverlay();
            navigation.navigate('Home');
        });
    }

    return (
        <View style={styles.container}>
            <Overlay
                overlayStyle={styles.overlay}
                isVisible={visible}
                fullScreen={true}
            >
                <View>
                    <ActivityIndicator size={70} color="#0000ff" />
                    <Text style={{color: 'white'}}>Transfert de l'image en cours...</Text>
                </View>
            </Overlay>
            <Image 
                source={{uri: myPhoto.uri}}
                style={{height: '100%'}}
                resizeMode='contain'
            />
            { send ?
            (<Icon
                reverse
                name='send'
                type='font-awesome'
                color='#27466A'
                underlayColor='transparent'
                size={40}
                onPress={() => savePicture()}
                containerStyle={styles.send_icon}
            />)
            : <View/> }
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
    overlay: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});
