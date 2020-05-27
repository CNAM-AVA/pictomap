import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import TriangleBackground from '../../components/TriangleBackground';
import { Card, Icon, Input, ListItem, Divider } from 'react-native-elements';

export default function ShowFriend({navigation}:any) {
    const [state, setState] = React.useState();

    return(
        <TriangleBackground style={styles.container}>
            <Text>Vue Ami</Text>
        </TriangleBackground>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        // flexDirection: 'column',
    },
    searchBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    searchContainer:{
        // paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 0.95,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    searchInput:{
        height: 40,
        paddingLeft: 10,
        color: 'grey',
    },
    searchIcon: {
    },
    backButton: {
        flex: 0.10,
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    text: {
        color: 'white',
        borderRadius: 30,
    },
    cardContainer: {
        borderRadius: 30,
        flex: 1,
        marginBottom: 20,
        marginTop: 0,
    },
    user: {

    },
    image: {

    },
    name: {

    },
});
