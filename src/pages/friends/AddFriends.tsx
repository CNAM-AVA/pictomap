import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import TriangleBackground from '../../components/TriangleBackground';
import { Card, Icon, Input, ListItem, Divider, Badge } from 'react-native-elements';
import { userService, friendService } from '../../services';
import { User } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddFriends({ navigation }: any) {
    const [value, setText] = React.useState('');
    const [state, setState] = React.useState({ isSearching: false });
    const [searchResult, setSearchResult] = React.useState<any>();
    const [fetchingResults, setFetchingResults] = React.useState<any>(false);
    const [friendList, setFriendList] = React.useState<any>([]);
    const [subscribeRequests, setsubscribeRequests] = React.useState<any>([]);
    const [nbRequests, setNbRequests] = React.useState<any>(0);
    const [loaded, setLoaded] = React.useState<any>(true);
    const user_uuid = userService.getUser().uuid;

    useEffect(() => {
        // getFriends();
        if (loaded) {
            getSubscribeRequests();
            getFriends();
        }
    }, [searchResult, loaded]);

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            setLoaded(true);
        });
        return focus;
    }, [navigation]);

    useEffect(() => {
        const blur = navigation.addListener('blur', () => {
            setLoaded(false);
        });
        return blur;
    }, [navigation]);

    function getFriends() {
        friendService.getFriends(user_uuid)
            .then((res: any) => {
                setFriendList(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getSubscribeRequests() {
        friendService.getSubscribeRequests(user_uuid)
            .then((res: any) => {
                setNbRequests(res.length);
                setsubscribeRequests(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function showUser(searchedName: string) {
        setFetchingResults(true);
        userService.searchUser(searchedName)
            .then((res) => {
                console.log(res);
                setSearchResult(res);
                setFetchingResults(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function addFriend(friend_uuid: string) {
        friendService.addFriend(user_uuid, friend_uuid)
            .then((res) => {
                console.log('sucessfully added : ' + JSON.stringify(res));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onChangeText(text: any) {
        if (text.length === 0)
            setState({ isSearching: false });
        else
            setState({ isSearching: true });
        setText(text);
        showUser(text);
    }

    function onAddFriend(friend: any) {
        console.log(`${friend} has been added to your friends list !`)
        let newSearchResults = [...searchResult.map(x => (x.uuid == friend) ? { ...x, ...{ requested: true } } : x)];
        setSearchResult(newSearchResults);
        addFriend(friend);
    }

    function subtitle(requested: boolean, friend: boolean) {
        if (requested) {
            if (friend)
                return 'Vous le suivez déjà'
            return 'Demande en attente...'
        }
        return ''
    }

    function showSearchResult(results: any) {
        if (fetchingResults)
            return <ActivityIndicator size={60} color="#27466A" />
        if (!results)
            return <Text style={styles.empty}>Aucun résultat</Text>;
        return results.map((user: any, i: any) => {
            return (
                <View key={i}>
                    <ListItem
                        leftAvatar={user.profile_picture ? { source: { uri: user.profile_picture }, size: 50 } : { title: user.name[0], size: 50 }}
                        title={user.name}
                        subtitle={subtitle(user.requested, user.friend)}
                        containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        rightElement={user.requested
                            ?
                            <Icon
                                name='check'
                                type='font-awesome'
                                color='green'
                                underlayColor='transparent'
                                size={30}
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
                    <Divider style={{ backgroundColor: 'grey' }} />
                </View>
            );
        })
    }

    function showFriendList(list: any) {
        if (!list)
            return (<Text style={styles.empty}>Aucun ami</Text>);
        return (
            list.map((u: any, i: any) => {
                return (
                    <View key={i}>
                        <ListItem
                            leftAvatar={u.profile_picture ? { source: { uri: u.profile_picture }, size: 50 } : { title: u.name[0], size: 'medium' }}
                            title={u.name}
                            subtitle={u.mail}
                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                            onPress={() => navigation.navigate('ShowFriend', { user: JSON.stringify(u) })}
                        />
                        <Divider style={{ backgroundColor: 'grey' }} />
                    </View>
                );
            })
        )
    }

    function subscribeRequestsBanner() {
        const requests = JSON.stringify(subscribeRequests);
        return (
            <TouchableOpacity
                // style={styles.requestContainer}
                onPress={() => navigation.navigate('SubscribeRequests', { params: requests })}
            >
                <View style={styles.requestContainer}>
                    <Badge
                        value={nbRequests}
                        status="primary"
                        badgeStyle={styles.badgeStyle}
                        textStyle={{ fontSize: 16 }}
                    />
                    <Text style={styles.requestText}>Demande(s) d'abonnement en attente</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
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
                    inputContainerStyle={{ borderBottomWidth: 0, marginLeft: -10 }}
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
                    {nbRequests === 0 ? <View></View> : subscribeRequestsBanner() /* On montre la bannière seulement s'il y a des demandes*/}
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
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    searchContainer: {
        // paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 0.95,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    searchInput: {
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
    },
    empty: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
    requestContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingStart: 10,
        borderColor: '#27466A',
        borderStyle: 'solid',
        borderRadius: 20,
        borderWidth: 1,
    },
    badgeStyle: {
        // width: 40,
        minWidth: 30,
        padding: 2,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#27466A',
    },
    requestText: {
        color: '#27466A',
        fontSize: 15,
        marginStart: 6,
    },
    user: {

    },
    image: {

    },
    name: {

    },
});
