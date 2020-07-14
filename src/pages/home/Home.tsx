import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Platform, Dimensions } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userService, pictureService } from '../../services';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeView({ navigation }: any) {
    const user = userService.getUser();

    const [userFindings, setUserFindings] = useState<any>([]);

    function fakeList() {
        let i = 0;
        return userFindings.map(function (picture: any, key: any) {
            return (<TouchableOpacity
                key={key}
                style={styles.row_grid}
                onPress={() => {
                    navigation.navigate('ImagePreview', { photo: JSON.stringify(picture), send: false });
                }}
            >
                <Image
                    source={{ uri: picture.uri }}
                    style={styles.element_grid}
                />
            </TouchableOpacity>)
        }
        );
    }

    function loadFindings() {
        pictureService.getUserFindings(user.uuid)
            .then((res: any) => {
                setUserFindings(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadFindings()
    });

    // function fakeList() {
    //     let fakeList: Array<any> = []
    //     userFindings.forEach((e, i) => {
    //         if (i % 2 == 0) {
    //             fakeList.push(
    //                 <View key={i} style={styles.row_grid}>
    //                     <Image source={{}} style={i++ % 2 ? styles.element_grid_left : styles.element_grid_right} />
    //                     <Image source={{}} style={i++ % 2 ? styles.element_grid_left : styles.element_grid_right} />
    //                 </View>);
    //         }
    //     });
    //     return fakeList;
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                leftComponent={
                    <ProfilePicture
                        title={user?.name[0]?.toUpperCase()}
                        uri={user.profile_picture}
                        actionOnPress={() => navigation.navigate('Profile')}
                        size='medium'
                    />}
                centerComponent={{ text: 'PictoMap', style: { color: '#fff' } }}
                rightComponent={<Icon
                    name='plus'
                    type='font-awesome'
                    color='white'
                    underlayColor='transparent'
                    size={40}
                    onPress={() => navigation.navigate('AddFriends')}

                />}
                containerStyle={{
                    backgroundColor: '#27466A',
                    height: Platform.OS === 'ios' ? 120 : 70,
                    paddingBottom: 25
                }}
            />

            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {userFindings.length == 0 ?
                        (<Text style={styles.empty}>Aucune photo</Text>)
                        : (<View style={styles.grid}>{fakeList()}</View>)}

                </ScrollView>
            </SafeAreaView>
            <Icon
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
                onPress={() => navigation.navigate('Map')}
                containerStyle={styles.map_icon}
            />
        </SafeAreaView>
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
        width: (winWidth / 2) - 12,
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
