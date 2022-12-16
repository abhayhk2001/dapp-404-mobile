import { View, Text } from 'react-native'
import { Card, Button } from "@rneui/base";

import theme from '../static/theme'

import React from 'react'

const ReportPost = ({ title }) => {
	return (
		<View>
			<Card.Divider />
			<Text style={{ color: theme.darkColors.white, fontSize: 15 }}>{title}</Text>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 50, marginVertical: 10 }}>
				<Button type="solid" color={theme.darkColors.success} onPress={() => { }} >
					Confirm
				</Button>
				<Button type="solid" color={theme.darkColors.error} onPress={() => { }} >
					Refute
				</Button>
			</View>
		</View>
	)
}

export default ReportPost