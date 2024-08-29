import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define your styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        marginBottom: 5,
        lineHeight: 1.5,
        color: '#333',
    },
    pillContainer: {
        marginBottom: 10,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    pillText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#444',
    },
    instructionText: {
        color: '#555',
        fontStyle: 'italic',
    },
    dateText: {
        textAlign: 'right',
        fontSize: 10,
        color: '#888',
        marginBottom: 20,
    }
});

// Function to format the current date
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

function Pdf({ pills, patient }) {
    const currentDate = formatDate(new Date());

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.dateText}>Date: {currentDate}</Text> {/* Display the current date */}

                <View style={styles.section}>
                    <Text style={styles.header}>Patient Information</Text>
                    <Text style={styles.text}>Name: {patient.name}</Text>
                    <Text style={styles.text}>Email: {patient.email}</Text>
                    <Text style={styles.text}>DOB: {patient.dob}</Text>
                    <Text style={styles.text}>Gender: {patient.gender}</Text>
                    <Text style={styles.text}>Blood Group: {patient.bloodGroup}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.header}>Medications</Text>
                    {pills.map((item, index) => (
                        <View key={index} style={styles.pillContainer}>
                            <Text style={styles.pillText}>{item.drug}</Text>
                            <Text style={styles.pillText}>
                                {item.dosage}: {item.qty} {item.unit}
                                {parseInt(item.qty) > 1 ? 's' : ''}
                            </Text>
                            <Text style={styles.instructionText}>
                                {item.instruction.join(', ')}
                            </Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

export default Pdf;
