import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userService } from '../../services'
import TriangleBackground from '../../components/TriangleBackground';

export default function Register() {

    return(
        <TriangleBackground style={styles.container}>
            <Text style={styles.text}>This is the register page</Text>
        </TriangleBackground>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    },
    text: {
        color: 'white'
    }
});
