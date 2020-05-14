import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import {Header} from 'react-native-elements';

export default function HomeView() {

    function fakeList() {
        let fakeList:Array<any> = []
        for (let i = 0; i < 10; i++) {
            fakeList.push(
            <View key={i} style={styles.row_grid}>
                <View style={styles.element_grid_left}/>
                <View style={styles.element_grid_right}/>
            </View>);
        }

        return fakeList;
        
    }

    return(
        <View style={{flex: 1}}>
            <Header
                leftComponent={{ text: 'Profil', style: { color: '#fff' } }}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                rightComponent={{ text: 'Search', style: { color: '#fff' } }}
            />
            <Text style={styles.text}>This is the home page</Text>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.grid}>
                        {fakeList()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
		justifyContent: 'center',
        color: 'white'
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
    }
});
