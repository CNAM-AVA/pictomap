import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Text } from 'react-native';
import { Icon, Overlay, Button,  } from 'react-native-elements';
import { pictureService, userService } from '../../services';

export default function ImagePreview({route, navigation}:any) {
    const [state, setState] = useState<any>({confirmDelete: false, showInfos: false});
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    
    const send = route.params.send;
    let myPhoto:any;
    if(send){
        myPhoto = route.params.photo;
    } else {
        const tmpPhoto = route.params.photo;
        myPhoto = JSON.parse(tmpPhoto);
    }
        
    let pictureUUID = myPhoto.uuid || null;

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

    function deletePicture(confirm: boolean|null){
        if(confirm && pictureUUID){
            // setState({confirmDelete: true});
            // let picture_uuid = myPhoto.uuid;
            pictureService.deletePicture(pictureUUID)
            .then((res) => {
                console.log(res);
                navigation.navigate('UserPictures');
            });
        }
        else if(confirm === false){
            setState({...state, confirmDelete: false});
        }
        else if(confirm === null){
            setState({...state, confirmDelete: true});
        }    
    }

    function getInfosPicture(){
        setState({...state, showInfos: !state.showInfos});
        console.log('get infos');
    }

    function stringDate(timestamp:any){
        let date = new Date(timestamp.seconds*1000);
        let year = date.getFullYear();
        let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        return `${day}/${month}/${year}`;
    }

    return (
        <View style={styles.container}>
            <Overlay
                overlayStyle={styles.infos}
                isVisible={state.showInfos}
                onBackdropPress={() => getInfosPicture()}
            >
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Infos sur la photo</Text>
                    <Text style={{fontSize: 16}}>Rue : {myPhoto.address?.street}</Text>
                    <Text style={{fontSize: 16}}>Ville : {myPhoto.address?.city}</Text>
                    <Text style={{fontSize: 16}}>Pays : {myPhoto.address?.country}</Text>
                    {myPhoto.created_at ? (<Text style={{fontSize: 16}}>Prise le : {stringDate(myPhoto?.created_at)}</Text>) : null}
                </View>
            </Overlay>
            <Overlay
                overlayStyle={styles.confirm}
                isVisible={state.confirmDelete}
            >
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Text style={{color: 'black', textAlign: 'center', fontSize: 16}}>Etes-vous sûr de vouloir supprimer cette photo ?</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button 
                        containerStyle={{width: 90}} 
                        buttonStyle={{borderColor: 'grey'}} 
                        titleStyle={{color: 'grey'}} 
                        type='outline' 
                        title='NON'
                        onPress={() => {deletePicture(false)}}/>
                        <Button 
                        containerStyle={{width: 90}} 
                        buttonStyle={{backgroundColor: 'grey'}} 
                        type='solid' 
                        title='OUI'
                        onPress={() => {deletePicture(true)}}/>
                    </View>
                </View>
            </Overlay>
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
            <Icon
            name='info'
            type='font-awesome'
            underlayColor='transparent'
            color='white'
            size={30}
            onPress={() => getInfosPicture()}
            containerStyle={styles.info_icon}
            iconStyle={{padding: 10}}
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
            : <Icon
                name='trash'
                type='font-awesome'
                color='white'
                underlayColor='transparent'
                size={30}
                onPress={() => deletePicture(null)}
                iconStyle={{padding: 10}}
                containerStyle={styles.delete_icon}
            /> }
        </View>
    );
}

const styles = StyleSheet.create({
    delete_icon: {
        position: 'absolute',
        bottom: 20,
        right: 30,
    },
    info_icon: {
        position: 'absolute',
        bottom: 20,
        left: 30,
    },
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
    },
    confirm: {
        height: 200,
        width: 250,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 25,
    },
    infos: {
        height: 200,
        width: 280,
        alignItems: 'center',
        borderRadius: 25,
    }
});
