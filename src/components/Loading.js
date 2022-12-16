import { StyleSheet, ScrollView } from 'react-native'
import ContentLoader, { Rect, Circle } from "react-content-loader/native"
import theme from '../static/theme'
import React from 'react'

const Loading = () => {
	return (
		<ScrollView style={styles.container}>
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</ScrollView>
	)
}

const Skeleton = () => {
	return (
		<ContentLoader
			speed={4}
			width={"100%"}
			height={160}
			viewBox="0 0 400 160"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			style={{ opacity: 0.7 }}
		>
			<Rect x="48" y="8" rx="3" ry="3" width="88" height="8" />
			<Rect x="48" y="26" rx="3" ry="3" width="52" height="8" />
			<Rect x="0" y="56" rx="3" ry="3" width="100%" height="8" />
			<Rect x="0" y="72" rx="3" ry="3" width="100%" height="8" />
			<Rect x="0" y="88" rx="3" ry="3" width="100%" height="8" />
			<Rect x="0" y="106" rx="3" ry="3" width="100%" height="8" />
			<Rect x="0" y="120" rx="3" ry="3" width="60%" height="8" />
			<Circle cx="20" cy="20" r="20" />
		</ContentLoader>
	)
}


const styles = StyleSheet.create({
	container: { marginVertical: 20, backgroundColor: theme.darkColors.background, paddingHorizontal: 20, paddingTop: 30 }
})

export default Loading
