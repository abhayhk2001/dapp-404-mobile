import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React from 'react'
import theme from '../static/theme'
import tags from '../assets/tags.json'
import { Button, Icon } from '@rneui/base'

const ConfirmPost = ({ route }) => {
	const { title, description, tag } = route.params

	return (
		<ScrollView style={styles.container}>
			<Text style={{ fontSize: 30, color: theme.darkColors.white }}>
				{title}
			</Text>

			<TextInput
				multiline={true}
				numberOfLines={10}
				style={styles.multilineText}
				placeholderTextColor={"white"}
				value={description}
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
				<Text style={{ color: theme.darkColors.white, marginLeft: 20, fontSize: 25 }}>{tags[tag - 1].name}</Text>
			</View>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary} titleStyle={{
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
export default ConfirmPost