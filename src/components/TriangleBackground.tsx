import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TriangleBackground(props: any) {

    return(
        <View style={[props.style, styles.container]}>
            {
                props.children
            }
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#27466A',
    }
});
