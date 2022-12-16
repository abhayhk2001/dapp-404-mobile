import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Post from '../components/Post';
import theme from '../static/theme';
import dummy_posts from '../assets/posts.json'
import getPostByTags from '../helper/getPostsByTags';
import {ContractContext} from '../context/ContractContext'
import { AuthContext } from '../context/AuthContext';
import getUserTags from '../helper/getUserTags';
function Dashboard({ navigation }) {
	const [posts, setPosts] = useState(dummy_posts);
	const {userToken} = useContext(AuthContext);
	const { backendContract, backendAdContract, backendProvider,account }  = useContext(ContractContext);
	useEffect(()=>{
		getUserTags(userToken)
		.then((tags)=>{
			tags = tags.map((tag) =>{ return tag["id"] });
			// console.log(tags);
			getPostByTags(backendContract,backendAdContract,backendProvider,tags, 10, account)
			.then((_posts)=>{
				console.log(_posts);
				setPosts(_posts);
			})
			.catch((err)=> {console.log(err, userToken)});
		})
		.catch((err)=>console.log(err));
	},[])
	
	return (
		<ScrollView style={styles.container}>
			{posts.map((post, index) => {
				return (
					<Post
						key={index}
						title={post.title}
						description={post.description}
						navigation={navigation}
						truthRating={post.rating}
						truth={post.truth}
					/>
				)
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { marginVertical: 20, backgroundColor: theme.darkColors.background, paddingHorizontal: 5 }
})

export default Dashboard;
