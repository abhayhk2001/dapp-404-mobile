import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Post from '../components/Post';
import theme from '../static/theme';
import posts from '../assets/posts.json'


function Dashboard({ navigation }) {
	return (
		<ScrollView style={styles.container}>
			{posts.map((post, index) => {
				return (
					<Post
						key={index}
						title={post.title}
						description={post.description}
						navigation={navigation}
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
