import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

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
	}, [])

	return (
		!isLoading ?
			(<ScrollView style={styles.container}>
				{posts.map((post, index) => {
					return (
						<Post
							key={index}
							title={post.title}
							description={post.description}
							navigation={navigation}
							truthRating={post.rating}
							truth={post.truth}
							ad={post.ad}
							img={post.img}
						/>
					)
				})}
			</ScrollView>) :
			(<Loading />)
	);
}

const styles = StyleSheet.create({
	container: { marginVertical: 20, backgroundColor: theme.darkColors.background, paddingHorizontal: 10 }
})

export default Dashboard;
