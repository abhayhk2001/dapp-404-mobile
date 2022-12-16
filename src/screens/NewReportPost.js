import { ScrollView, TextInput, StyleSheet, View, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Input, Button } from '@rneui/base'
import theme from '../static/theme'
import { Icon } from '@rneui/themed'

import axios from 'axios'

import { ReportPostContext } from '../context/ReportPostContext';
import { backendURL } from "../utils/constants";

const NewPost = ({ navigation }) => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [tags, setTags] = useState([])

	const { postData, setPostData } = useContext(ReportPostContext)
	const { originPostInfo } = postData

	useEffect(() => {
		axios.get(`${backendURL}/tags`).then((res) => {
			setTags(res.data)
		})
	}, [])

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
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
				<Icon
					color={theme.darkColors.secondary}
					name="label"
					size={25}
					type="material"
				/>
				<Text style={{ color: theme.darkColors.white, marginLeft: 20, fontSize: 25 }}>Report</Text>
			</View>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary} onPress={() => {
					setPostData({
						title: title,
						description: description,
						tag: {
							id: 0,
							name: "Report"
						},
						originPostInfo: originPostInfo
					})
					navigation.navigate("Report News Lang")
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