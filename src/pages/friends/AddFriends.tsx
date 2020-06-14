import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import TriangleBackground from '../../components/TriangleBackground';
import { Card, Icon, Input, ListItem, Divider } from 'react-native-elements';
import { userService } from '../../services';
import { User } from '../../utils';

export default function AddFriends({navigation}:any) {
    const [value, setText] = React.useState('');
    const [state, setState] = React.useState({isSearching: false});
    const [searchResult, setSearchResult] = React.useState<any>();
    const [friendList, setFriendList] = React.useState<any>([]);

    useEffect(() => {
        // getFriends();
        getFriends();
    }, [searchResult]);

    const usersList = [
        {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        isAFriend: true
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

    const myFriends = [
        {
            name: 'Adrien Neto Ferreira',
            avatar_url: 'https://firebasestorage.googleapis.com/v0/b/pictomap-9aad7.appspot.com/o/Bel-Homme.webp?alt=media&token=220a8ffa-161e-4423-8acb-80ceb5045a1d',
        },
        {
            name: 'Antoine Plard',
            avatar_url: '',
        },
    ]

    const [users, setUsers] = React.useState([
        {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        isAFriend: false
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
        }
    ]);

    function getFriends(){
        userService.getFriends()
        .then((res:any) => {
            setFriendList(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function showUser(searchedName: string){
        userService.searchUser(searchedName)
        .then((res) => {
            setSearchResult(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function addFriend(friend_uuid: string){
        userService.addFriend(friend_uuid)
        .then((res) => {
            console.log('sucessfully added : '+JSON.stringify(res));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function onChangeText(text:any) {
        if(text.length === 0)
            setState({isSearching: false});
        else
            setState({isSearching: true});
        setText(text);
        showUser(text);
    }

    function onAddFriend(friend:any) {
        console.log(`${friend} has been added to your friends list !`)
        setSearchResult({...searchResult, ...{isAFriend: true}});
        addFriend(friend);
        // let newUsers = users;
        // newUsers[index] = {...newUsers[index], ...{isAFriend: true}};
        // setUsers([...newUsers]);
    }

    function showSearchResult(user:any){
        if(!user)
            return <Text style={styles.empty}>Aucun résultat</Text>;
        return (
            <View>
                <ListItem
                    leftAvatar={ user.profile_picture ? {source: {uri: user.profile_picture}} : {title: user.name[0]}}
                    title={user.name}
                    containerStyle={{paddingLeft: 0, paddingRight: 0}}
                    rightElement={user.isAFriend 
                    ? 
                    <Icon
                        name='check'
                        type='font-awesome'
                        color='green'
                        underlayColor='transparent'
                        size={30}
                        onPress={() => console.log(`${user.name} is already your friend`)}
                    />
                    :
                    <Icon
                        name='plus'
                        type='font-awesome'
                        color='grey'
                        underlayColor='transparent'
                        size={30}
                        onPress={() => onAddFriend(user.uuid)}
                    />
                    }
                />
                <Divider style={{ backgroundColor: 'grey' }}/>
            </View>
        );
    }

    function showFriendList(list:any){
        if(!list)
            return (<Text style={styles.empty}>Aucun ami</Text>);
        return(
            list.map((u:any, i:any) => {
                return(
                    <View key={i}>
                        <ListItem
                            leftAvatar={ u.profile_picture ? {source: {uri: u.profile_picture}} : {title: u.name[0]}}
                            title={u.name}
                            containerStyle={{paddingLeft: 0, paddingRight: 0}}
                            // rightElement={<Icon
                            //     name='plus'
                            //     type='font-awesome'
                            //     color='grey'
                            //     underlayColor='transparent'
                            //     size={30}
                            //     onPress={() => console.log(`add friend ${u.name}`)}
                            // />}
                            onPress={() => navigation.navigate('ShowFriend', {userId: u.uuid})}
                        />
                        <Divider style={{ backgroundColor: 'grey' }}/>
                    </View>
                );
            })
        )
    }

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
                        onChangeText={(text) => onChangeText(text)}
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
                    state.isSearching ? 
                    showSearchResult(searchResult)
                    : showFriendList(friendList)
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
    empty: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
    user: {

    },
    image: {

    },
    name: {

    },
});
