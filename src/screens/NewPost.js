import { ScrollView, TextInput, StyleSheet, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { Input, Button } from '@rneui/base'
import theme from '../static/theme'
import { Picker } from '@react-native-picker/picker';
import tags from '../assets/tags.json'
import { PostContext } from '../context/PostContext';

const NewPost = ({ navigation }) => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [tag, setTag] = useState(1);
	const { setPostData } = useContext(PostContext)
	return (
		<ScrollView style={styles.container}>
			<Input
				style={{ fontSize: 30, color: theme.darkColors.white }}
				placeholder='Header'
				value={title}
				onChangeText={(text) => { setTitle(text) }}
			/>
			<TextInput
				multiline={true}
				numberOfLines={10}
				onChangeText={text => setDescription(text)}
				style={styles.multilineText}
				placeholder='Description'
				placeholderTextColor={"white"}
				value={description}
				editable
				autoCapitalize={'none'}
				autoCorrect={false}
			/>
			<Picker
				style={{ color: 'white' }}
				itemStyle={{ fontSize: 20 }}
				selectedValue={tag}
				onValueChange={(itemValue, itemIndex) =>
					setTag(itemValue)
				}
				placeholder="Select a Tag"
			>
				{tags.map((tag) => (
					<Picker.Item key={tag.id} label={tag.name} value={tag.id} />
				))}
			</Picker>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary} onPress={() => {
					setPostData({
						title: title,
						description: description,
						tag: tag,
					})
					navigation.navigate("NewsLang")
				}} titleStyle={{
					fontSize: 25
				}}>
					Post
				</Button>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 20,
		backgroundColor: theme.darkColors.background,
		height: "100%"
	},
	multilineText: {
		borderColor: 'white', borderWidth: 1, color: theme.darkColors.white, borderRadius: 20, paddingHorizontal: 20, fontSize: 20, textAlignVertical: "top", paddingVertical: 10,
		marginTop: 20,
		maxHeight: 300
	}

})
export default NewPost