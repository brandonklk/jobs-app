// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Timeline from 'react-native-timeline-flatlist';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const CustomTimeline = () => {
//   const data = [
//     { time: '09:00', title: 'Serviço solicitado', description: 'Serviço solicitado pelo cliente (fulado)',icon:<FontAwesome name="bell-o" size={16} color="white" /> },
//     { time: '10:45', title: 'Atendimento', description: 'Você aceitou o serviço',icon: <FontAwesome name="handshake-o" size={16} color="white" /> },
//     { time: '12:00', title: 'Atendimento finalizado', description: 'Você terminou o serviço', icon: <FontAwesome name="flag-checkered" size={16} color="white" /> },
//     { time: '15:00', title: 'Pagamento feito pelo cliente', description: 'O cliente confirmou o pagamento', icon: <FontAwesome name="money" size={16} color="white" /> },
//     { time: '16:30', title: 'Prazo para liberação', description: 'O dinheiro cairá automaticamente na sua conta', icon: <FontAwesome name="calendar" size={16} color="white" /> },
//   ];
//   // Ideal é os eventos alimentados pelo retorno da api Stripe

//   return (
//     <View style={styles.container}>
//       <Timeline
//         data={data}
//         circleSize={30}
//         circleColor="#8A2BE2" // Cor roxa
//         lineColor="#00FF00" // Cor verde limão
//         timeContainerStyle={{ minWidth: 52 }}
//         timeStyle={{ textAlign: 'center', backgroundColor: '#8A2BE2', color: 'white', padding: 5, borderRadius: 12 }}
//         descriptionStyle={{ color: 'gray' }}
//         options={{
//           style: { paddingTop: 5 },
//           renderDetail: ({ item }) => (
//             <View style={styles.detailContainer}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//             </View>
//           ),
//         }}
//         innerCircle={'icon'}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FFF',
//   },
//   detailContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: 'gray',
//   },
// });

// export default CustomTimeline;
