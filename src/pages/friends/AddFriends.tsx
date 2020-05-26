import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import TriangleBackground from '../../components/TriangleBackground';
import { Card, Icon, Input, ListItem, Divider } from 'react-native-elements';

export default function AddFriends({navigation}:any) {
    const [value, onChangeText] = React.useState('');

    // const onFocus = () => {
    //     onChangeText('');
    // }

    const users = [
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
        {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
        },
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
        {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
        },
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
        {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
        },
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
        {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
        },
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
        },
        {
        name: 'brynn',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'none'
        },
    ]

    return(
        <TriangleBackground style={styles.container}>
            <View style={styles.searchBar}>
                    <Input
                        leftIcon={<Icon 
                            style={styles.searchIcon}
                            name='search'
                            size={25}
                            type='font-awesome'
                            color='grey'
                            // underlayColor='transparent'
                        />}
                        containerStyle={styles.searchContainer}
                        inputStyle={styles.searchInput}
                        inputContainerStyle={{borderBottomWidth: 0, marginLeft: -10}}
                        placeholder='Rechercher'
                        value={value}
                        clearButtonMode='always'
                        onChangeText={onChangeText}
                    />
                <Icon 
                    style={styles.backButton}
                    name='arrow-left'
                    size={40}
                    type='font-awesome'
                    color='white'
                    underlayColor='transparent'
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
            
            <Card containerStyle={styles.cardContainer}>
                <ScrollView>
                {
                    users.map((u:any, i:any) => {
                        return(
                            <View key={i}>
                                <ListItem
                                    leftAvatar={{source: {uri: u.avatar_url}}}
                                    title={u.name}
                                    containerStyle={{paddingLeft: 0, paddingRight: 0}}
                                    rightElement={<Icon
                                        name='plus'
                                        type='font-awesome'
                                        color='grey'
                                        underlayColor='transparent'
                                        size={30}
                                        onPress={() => console.log(`add friend ${u.name}`)}
                                    />}
                                />
                                <Divider style={{ backgroundColor: 'grey' }}/>
                            </View>
                        );
                    })
                }
                </ScrollView>
            </Card>
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
