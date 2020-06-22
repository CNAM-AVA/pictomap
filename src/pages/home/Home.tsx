import React from 'react';
import { StyleSheet, View, ScrollView,  Image, Platform } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeView({ navigation }: any) {
    function fakeList() {
        let fakeList: Array<any> = []
        for (let i = 0; i < 10; i++) {
            fakeList.push(
                <View key={i} style={styles.row_grid}>
                    <Image source={{}} style={styles.element_grid_left} />
                    <Image source={{}} style={styles.element_grid_right} />
                </View>);
        }
        return fakeList;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                leftComponent={<ProfilePicture actionOnPress={() => navigation.navigate('Profile')} />}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
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
                    <View style={styles.grid}>
                        {fakeList()}
                    </View>
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
        flex: 1,
        marginBottom: 8,
        flexDirection: "column"
    },
    row_grid: {
        marginTop: 8,
        flex: 0.5,
        flexDirection: "row"
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
});
