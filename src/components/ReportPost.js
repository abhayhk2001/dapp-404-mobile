import { View, Text } from 'react-native'
import { Card, Button } from "@rneui/base";
import confirmReport from '../helper/confirmReport';
import refuteReport from '../helper/refuteReport'; 
import { ContractContext } from '../context/ContractContext';
import theme from '../static/theme'

import React,{useContext} from 'react'

const ReportPost = ({ id , title, confirmations, refutations }) => {
	const { backendContract, backendProvider, account } = useContext(ContractContext);
	return (
		<View >
			<Card.Divider />
			<Text style={{ color: theme.darkColors.white, fontSize: 15 }}>{title}</Text>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 50, marginVertical: 10 }}>
				<Text style={{ color: theme.darkColors.white, fontSize: 20 }}>{confirmations}</Text>
				<Button type="solid" color={theme.darkColors.success} onPress={() => {
					confirmReport(backendContract,backendProvider, id, account)
				 }} >
					Confirm
				</Button>
				<Button type="solid" color={theme.darkColors.error} onPress={() => {
					refuteReport(backendContract,backendProvider, id, account)
				 }} >
					Refute
				</Button>
				<Text style={{ color: theme.darkColors.white, fontSize: 20 }}>{refutations}</Text>
			</View>
		</View>
	)
}

export default ReportPost