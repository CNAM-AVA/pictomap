import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function RoundImage(props: any) {

    return(
        <Image 
            style={styles.round_image}
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/pictomap-9aad7.appspot.com/o/MJ.jpg?alt=media&token=657c33f3-af50-4f7f-be8c-1141a5e22b6f'}}
        />
    )
}

const styles = StyleSheet.create({
	round_image: {
		// flex: 1,
        backgroundColor: '#27466A',
        height: 50,
        width: 50,
        borderRadius: 40,
        margin: 4,
    }
});
