import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';

import { ContractContext } from '../context/ContractContext'
import { AuthContext } from '../context/AuthContext';

import Loading from '../components/Loading';
import Post from '../components/Post';
import theme from '../static/theme';

import getUserTags from '../helper/getUserTags';
import getPostByTags from '../helper/getPostsByTags';


function Dashboard({ navigation }) {
	const [posts, setPosts] = useState([]);
	const { userToken } = useContext(AuthContext);
	const { backendContract, backendAdContract, backendProvider, account } = useContext(ContractContext);
	const [isLoading, setIsLoading] = useState(false)
	const [refresing, setRefreshing] = useState(true)

	const getPosts = () => {
		setIsLoading(true)
		getUserTags(userToken)
			.then((tags) => {
				tags = tags.map((tag) => { return tag["id"] });
				getPostByTags(backendContract, backendAdContract, backendProvider, tags, 10, account)
					.then((_posts) => {
						console.log(_posts)
						setPosts(_posts);
						setIsLoading(false)
						setRefreshing(false)
					})
					.catch((err) => { console.log(err, userToken) });
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		getPosts()
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
				reportIDs={item.reportIDs}
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
						refreshControl={
							<RefreshControl refreshing={refresing} onRefresh={getPosts} />
						}
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
