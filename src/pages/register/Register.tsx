import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userService } from '../../services'

export default function RegisterView() {

    return(
        <View style={styles.container}>
            <Text>This is the register page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
