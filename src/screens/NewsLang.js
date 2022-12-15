import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Button } from '@rneui/base'
import theme from '../static/theme'
import React from 'react'

const NewsLang = ({ route, navigation }) => {
	const { title, description, tag } = route.params
	return (
		<ScrollView style={styles.container}>
			<Text style={{ fontSize: 30, color: theme.darkColors.white }}>
				{title}
			</Text>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary} onPress={() => {
					navigation.navigate("ConfirmPost", {
						title: title,
						description: description,
						tag: tag,
					})
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