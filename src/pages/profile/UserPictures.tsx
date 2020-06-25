import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image, Text, Dimensions } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import { pictureService, userService } from '../../services';

import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UserPictures({ navigation }: any) {
    const [userPictures, setUserPictures] = useState<any>([{'uuid':'0'}]);
    const [loaded, setLoaded] = useState<any>(true)

    useEffect(() => {
        getUserPictures();
    }, [userPictures[0].uuid, loaded]);

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            setLoaded(true);
        });
        return focus;
    }, [navigation]);

    useEffect(() => {
        const blur = navigation.addListener('blur', () => {
            setLoaded(false);
        });
        return blur;
    }, [navigation]);
    
    function getUserPictures(){
        let userId = userService.getUser().uuid;
        pictureService.getUserPictures(userId)
        .then((res:any) => {
            setUserPictures(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    function fakeList() {
        if(userPictures[0].uuid === '0')
            return (<Text style={styles.empty}>Aucune photo</Text>);
        return userPictures.map((picture:any, key:any) => 
            (<TouchableOpacity
                key={key}
                onPress={() => {
                    navigation.navigate('ImagePreview', {photo: JSON.stringify(picture), send: false});
                }}
            >
                <Image 
                source={{uri: picture.uri}}
                style={styles.element_grid}
                />
            </TouchableOpacity>)
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={<Icon
                    name='arrow-left'
                    type='font-awesome'
                    color='white'
                    underlayColor='transparent'
                    size={40}
                    onPress={() => navigation.goBack()}

                />}
                centerComponent={{ text: 'Mes photos', style: { color: '#fff' } }}
                // rightComponent={<Icon
                //     name='plus'
                //     type='font-awesome'
                //     color='white'
                //     underlayColor='transparent'
                //     size={40}
                //     onPress={() => navigation.navigate('AddFriends')}

                // />}
                containerStyle={{
                    backgroundColor: '#27466A',
                    height: 70,
                    paddingBottom: 25
                }}
            />

            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {userPictures[0].uuid === '0' ?
                    (<Text style={styles.empty}>Aucune photo</Text>)
                    :(<View style={styles.grid}>{fakeList()}</View>)}
                    
                </ScrollView>
            </SafeAreaView>
            {/* <Icon
                name='camera'
                type='font-awesome'
                color='#27466A'
                underlayColor='transparent'
                size={60}
                onPress={() => navigation.navigate('Photo')}
                containerStyle={styles.add_icon}
            />
            <Icon
                name='globe'
                type='font-awesome'
                color='#27466A'
                underlayColor='transparent'
                size={80}
                onPress={() => console.log('click on map button')}
                containerStyle={styles.map_icon}
            /> */}
        </View>
    )
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    add_icon: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    map_icon: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    container: {
        flex: 1,
    },
    scrollView: {
    },
    grid: {
        // flex: 1,
        // flexWrap: 'wrap',
        // marginBottom: 8,
        // flexDirection: "column"
        marginBottom: 8,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: "row"
    },
    row_grid: {
        
    },
    element_grid_right: {
        flex: 1,
        height: 300,
        marginLeft: 4,
        marginRight: 8,
        backgroundColor: "#599688",
        borderRadius: 8,
    },
    element_grid_left: {
        flex: 1,
        height: 300,
        marginLeft: 8,
        marginRight: 4,
        backgroundColor: "#599688",
        borderRadius: 8,
    },
    element_grid: {
        height: 300,
        width: (winWidth/2)-12,
        marginLeft: 8,
        marginTop: 8,
        backgroundColor: "#599688",
        borderRadius: 8,
    },
    empty: {
        fontSize: 20,
        marginTop: 10,
        alignSelf: 'center'
    },
});
