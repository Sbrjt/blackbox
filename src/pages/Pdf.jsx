import { Document, Page, Text, View, pdf as createPdf } from '@react-pdf/renderer'

function Pdf({ pills, patient }) {
	return (
		<Document>
			<Page>
				<View>
					<Text>Name: {patient.name}</Text>
					<Text>Email: {patient.email}</Text>
					<Text>DOB: {patient.dob}</Text>
					<Text>Gender: {patient.gender}</Text>
					<Text>Blood Group: {patient.bloodGroup}</Text>
				</View>

				{pills.map((item, index) => (
					<View key={index} style={{ marginBottom: 10 }}>
						<Text>{item.drug}</Text>
						<Text>
							{item.dosage}: {item.qty} {item.unit}
							{parseInt(item.qty) > 1 ? 's' : ''}
						</Text>
						<Text>{item.instruction.join(', ')}</Text>
					</View>
				))}
			</Page>
		</Document>
	)
}

export default Pdf
