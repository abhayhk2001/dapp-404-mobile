import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { ContractContext } from '../context/ContractContext'
import { AuthContext } from '../context/AuthContext';

import Loading from '../components/Loading';
import Post from '../components/Post';
import theme from '../static/theme';
import Newposts from '../assets/posts.json'

import getUserTags from '../helper/getUserTags';
import getPostByTags from '../helper/getPostsByTags';

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Third Item",
	},
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<Text style={[styles.title, textColor]}>{item.title}</Text>
	</TouchableOpacity>
);



function Dashboard({ navigation }) {
	const [posts, setPosts] = useState([]);
	const { userToken } = useContext(AuthContext);
	const { backendContract, backendAdContract, backendProvider, account } = useContext(ContractContext);
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		getUserTags(userToken)
			.then((tags) => {
				tags = tags.map((tag) => { return tag["id"] });
				getPostByTags(backendContract, backendAdContract, backendProvider, tags, 10, account)
					.then((_posts) => {
						console.log(_posts)
						setPosts(_posts);
						setIsLoading(false)
					})
					.catch((err) => { console.log(err, userToken) });
			})
			.catch((err) => console.log(err));
		// setPosts(Newposts)
		setIsLoading(false)

	}, [])

	const renderPost = ({ item }) => {
		return (
			<Post
				key={item.id * 10 + item.tag.id}
				postID={item.id}
				title={item.title}
				description={item.description}
				navigation={navigation}
				truthRating={item.rating}
				truth={item.truth}
				views={item.interactions}
				tag={item.tag}
				ad={item.ad}
				img={item.img}
			/>
		);
	};

	return (
		!isLoading ?
			(
				<SafeAreaView style={styles.container}>
					<FlatList
						data={posts}
						renderItem={renderPost}
						keyExtractor={(item) => item.id * 10 + item.tag.id}
					/>
				</SafeAreaView>
			) :
			(<Loading />)
	);
}

const styles = StyleSheet.create({
	container: { marginVertical: 20, backgroundColor: theme.darkColors.background, paddingHorizontal: 10 },
	container1: {
		flex: 1,
		marginTop: 10
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
})

export default Dashboard;
