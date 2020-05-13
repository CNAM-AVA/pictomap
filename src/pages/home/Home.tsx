import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import {Header} from 'react-native-elements'
import TriangleBackground from '../../components/TriangleBackground';

export default function HomeView() {

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
                        <View style={styles.row_grid}>
                            <View style={styles.element_grid}/>
                            <View style={styles.element_grid}/>
                        </View>
                        <View style={styles.row_grid}>
                            <View style={styles.element_grid}/>
                            <View style={styles.element_grid}/>
                        </View>
                        <View style={styles.row_grid}>
                            <View style={styles.element_grid}/>
                            <View style={styles.element_grid}/>
                        </View>
                        <View style={styles.row_grid}>
                            <View style={styles.element_grid}/>
                            <View style={styles.element_grid}/>
                        </View>
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
        flexDirection: "column"
    },
    row_grid: {
        flex: 0.5,
        flexDirection: "row"
    },
    element_grid: {
        flex: 1,
        height: 300,
        margin: 5,
        backgroundColor: "#599688"
    }

});
