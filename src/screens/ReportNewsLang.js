import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Button, Input } from '@rneui/base'
import theme from '../static/theme'
import React, { useState, useContext } from 'react'
import { ReportPostContext } from '../context/ReportPostContext'

const NewsLang = ({ navigation }) => {
	const { postData, setPostData } = useContext(ReportPostContext)
	const { title, description, tagID, tagName, originPostInfo } = postData

	const [subject, setSubject] = useState("")
	const [object, setObject] = useState("")
	const [sentence, setSentence] = useState("")
	const [connector, setConnector] = useState("")
	return (
		<ScrollView style={styles.container}>
			<Text style={{ fontSize: 30, color: theme.darkColors.white }}>
				Title : {title}
			</Text>
			<View style={{ marginTop: 25, paddingLeft: 30 }}>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
					<TextInput
						style={{ fontSize: 20, color: theme.darkColors.white, textDecorationLine: 'underline', textDecorationColor: theme.darkColors.white }}
						placeholder='Enter the Subject'
						placeholderTextColor={"white"}
						value={subject}
						onChangeText={(text) => { setSubject(text) }}
					/>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
					<TextInput
						style={{ fontSize: 20, color: theme.darkColors.white, textDecorationLine: 'underline', textDecorationColor: theme.darkColors.white }}
						placeholder='Enter the Object'
						placeholderTextColor={"white"}
						value={object}
						onChangeText={(text) => { setObject(text) }}
					/>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
					<TextInput
						style={{ fontSize: 20, color: theme.darkColors.white, textDecorationLine: 'underline', textDecorationColor: theme.darkColors.white }}
						placeholder='Enter the Sentence'
						value={sentence}
						placeholderTextColor={"white"}
						onChangeText={(text) => { setSentence(text) }}
					/>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<TextInput
						style={{ fontSize: 20, color: theme.darkColors.white, textDecorationLine: 'underline', textDecorationColor: theme.darkColors.white }}
						placeholder='Enter the Connector'
						value={connector}
						placeholderTextColor={"white"}
						onChangeText={(text) => { setConnector(text) }}
					/>
				</View>
			</View>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary} onPress={() => {
					setPostData({
						title: title,
						description: description,
						tagID: tagID,
						tagName: tagName,
						originPostInfo: originPostInfo,
						newslang: {
							subject: subject,
							object: object,
							sentence: sentence,
							connector: connector
						}
					})
					navigation.navigate("ConfirmPost")
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

export default NewsLang