// // App.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Alert,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const FuelWise = () => {
//   const [fuelEntries, setFuelEntries] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingEntry, setEditingEntry] = useState(null);
//   const [formData, setFormData] = useState({
//     fuelType: 'petrol',
//     date: new Date().toISOString().split('T')[0],
//     quantity: '',
//     pricePerUnit: '',
//     totalCost: '',
//     odometerReading: '',
//   });

//   // Calculate total cost when quantity or price changes
//   useEffect(() => {
//     const quantity = parseFloat(formData.quantity) || 0;
//     const pricePerUnit = parseFloat(formData.pricePerUnit) || 0;
//     const total = quantity * pricePerUnit;
    
//     if (quantity > 0 && pricePerUnit > 0) {
//       setFormData(prev => ({
//         ...prev,
//         totalCost: total.toFixed(2)
//       }));
//     }
//   }, [formData.quantity, formData.pricePerUnit]);

//   const resetForm = () => {
//     setFormData({
//       fuelType: 'petrol',
//       date: new Date().toISOString().split('T')[0],
//       quantity: '',
//       pricePerUnit: '',
//       totalCost: '',
//       odometerReading: '',
//     });
//     setEditingEntry(null);
//   };

//   const handleSaveEntry = () => {
//     if (!formData.quantity || !formData.pricePerUnit) {
//       Alert.alert('Error', 'Please fill in quantity and price per unit');
//       return;
//     }

//     const entry = {
//       id: editingEntry?.id || Date.now(),
//       ...formData,
//       quantity: parseFloat(formData.quantity),
//       pricePerUnit: parseFloat(formData.pricePerUnit),
//       totalCost: parseFloat(formData.totalCost),
//       odometerReading: formData.odometerReading ? parseFloat(formData.odometerReading) : null,
//     };

//     if (editingEntry) {
//       setFuelEntries(prev => prev.map(e => e.id === editingEntry.id ? entry : e));
//     } else {
//       setFuelEntries(prev => [...prev, entry]);
//     }

//     resetForm();
//     setShowAddModal(false);
//   };

//   const handleEditEntry = (entry) => {
//     setFormData({
//       fuelType: entry.fuelType,
//       date: entry.date,
//       quantity: entry.quantity.toString(),
//       pricePerUnit: entry.pricePerUnit.toString(),
//       totalCost: entry.totalCost.toString(),
//       odometerReading: entry.odometerReading ? entry.odometerReading.toString() : '',
//     });
//     setEditingEntry(entry);
//     setShowAddModal(true);
//   };

//   const handleDeleteEntry = (id) => {
//     Alert.alert(
//       'Delete Entry',
//       'Are you sure you want to delete this entry?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Delete', onPress: () => setFuelEntries(prev => prev.filter(e => e.id !== id)) }
//       ]
//     );
//   };

//   // Calculate summary statistics
//   const totalFuelConsumed = fuelEntries.reduce((sum, entry) => sum + entry.quantity, 0);
//   const totalMoneySpent = fuelEntries.reduce((sum, entry) => sum + entry.totalCost, 0);
  
//   // Calculate average fuel efficiency (for entries with odometer readings)
//   const entriesWithOdometer = fuelEntries.filter(e => e.odometerReading).sort((a, b) => a.odometerReading - b.odometerReading);
//   let avgEfficiency = 0;
//   if (entriesWithOdometer.length > 1) {
//     const totalDistance = entriesWithOdometer[entriesWithOdometer.length - 1].odometerReading - entriesWithOdometer[0].odometerReading;
//     const fuelUsedForDistance = entriesWithOdometer.slice(1).reduce((sum, entry) => sum + entry.quantity, 0);
//     avgEfficiency = totalDistance / fuelUsedForDistance;
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
//       {/* Header */}
//       <View className="bg-blue-600 px-4 py-6">
//         <Text className="text-white text-2xl font-bold">FuelWise</Text>
//         <Text className="text-blue-100 text-sm mt-1">Track your fuel usage and expenses</Text>
//       </View>

//       {/* Summary Cards */}
//       <View className="px-4 py-4">
//         <View className="flex-row space-x-3">
//           <View className="flex-1 bg-green-100 p-4 rounded-lg">
//             <Text className="text-green-800 text-xs font-medium">TOTAL FUEL</Text>
//             <Text className="text-green-900 text-lg font-bold">{totalFuelConsumed.toFixed(1)}L</Text>
//           </View>
//           <View className="flex-1 bg-red-100 p-4 rounded-lg">
//             <Text className="text-red-800 text-xs font-medium">TOTAL SPENT</Text>
//             <Text className="text-red-900 text-lg font-bold">${totalMoneySpent.toFixed(2)}</Text>
//           </View>
//           <View className="flex-1 bg-purple-100 p-4 rounded-lg">
//             <Text className="text-purple-800 text-xs font-medium">AVG EFFICIENCY</Text>
//             <Text className="text-purple-900 text-lg font-bold">
//               {avgEfficiency > 0 ? `${avgEfficiency.toFixed(1)}km/L` : 'N/A'}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Fuel Entries List */}
//       <ScrollView className="flex-1 px-4">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-gray-800 text-lg font-semibold">Recent Entries</Text>
//           <TouchableOpacity 
//             className="bg-blue-600 px-4 py-2 rounded-lg"
//             onPress={() => setShowAddModal(true)}
//           >
//             <Text className="text-white font-medium">+ Add Entry</Text>
//           </TouchableOpacity>
//         </View>

//         {fuelEntries.length === 0 ? (
//           <View className="bg-white p-8 rounded-lg items-center">
//             <Text className="text-gray-500 text-center">No fuel entries yet</Text>
//             <Text className="text-gray-400 text-sm text-center mt-2">
//               Start tracking by adding your first fuel entry
//             </Text>
//           </View>
//         ) : (
//           fuelEntries
//             .sort((a, b) => new Date(b.date) - new Date(a.date))
//             .map(entry => (
//               <View key={entry.id} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
//                 <View className="flex-row justify-between items-start">
//                   <View className="flex-1">
//                     <View className="flex-row items-center mb-2">
//                       <View className={`px-2 py-1 rounded-full ${entry.fuelType === 'petrol' ? 'bg-blue-100' : 'bg-green-100'}`}>
//                         <Text className={`text-xs font-medium ${entry.fuelType === 'petrol' ? 'text-blue-800' : 'text-green-800'}`}>
//                           {entry.fuelType.toUpperCase()}
//                         </Text>
//                       </View>
//                       <Text className="text-gray-500 text-sm ml-2">{entry.date}</Text>
//                     </View>
                    
//                     <View className="flex-row justify-between items-center">
//                       <View>
//                         <Text className="text-gray-800 font-semibold">{entry.quantity}L @ ${entry.pricePerUnit}/L</Text>
//                         <Text className="text-gray-600 text-sm">Total: ${entry.totalCost.toFixed(2)}</Text>
//                         {entry.odometerReading && (
//                           <Text className="text-gray-500 text-xs">Odometer: {entry.odometerReading}km</Text>
//                         )}
//                       </View>
                      
//                       <View className="flex-row space-x-2">
//                         <TouchableOpacity 
//                           className="bg-gray-100 p-2 rounded"
//                           onPress={() => handleEditEntry(entry)}
//                         >
//                           <Text className="text-gray-600 text-xs">Edit</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                           className="bg-red-100 p-2 rounded"
//                           onPress={() => handleDeleteEntry(entry.id)}
//                         >
//                           <Text className="text-red-600 text-xs">Delete</Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ))
//         )}
//       </ScrollView>

//       {/* Add/Edit Modal */}
//       <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
//         <SafeAreaView className="flex-1 bg-white">
//           <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
//             <TouchableOpacity onPress={() => {
//               setShowAddModal(false);
//               resetForm();
//             }}>
//               <Text className="text-blue-600 text-base">Cancel</Text>
//             </TouchableOpacity>
//             <Text className="text-lg font-semibold">
//               {editingEntry ? 'Edit Entry' : 'Add Fuel Entry'}
//             </Text>
//             <TouchableOpacity onPress={handleSaveEntry}>
//               <Text className="text-blue-600 text-base font-medium">Save</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView className="flex-1 px-4 py-6">
//             {/* Fuel Type */}
//             <View className="mb-6">
//               <Text className="text-gray-700 font-medium mb-2">Fuel Type</Text>
//               <View className="flex-row space-x-3">
//                 <TouchableOpacity 
//                   className={`flex-1 p-3 rounded-lg border ${formData.fuelType === 'petrol' ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'}`}
//                   onPress={() => setFormData(prev => ({ ...prev, fuelType: 'petrol' }))}
//                 >
//                   <Text className={`text-center font-medium ${formData.fuelType === 'petrol' ? 'text-blue-600' : 'text-gray-600'}`}>
//                     Petrol
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   className={`flex-1 p-3 rounded-lg border ${formData.fuelType === 'diesel' ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}
//                   onPress={() => setFormData(prev => ({ ...prev, fuelType: 'diesel' }))}
//                 >
//                   <Text className={`text-center font-medium ${formData.fuelType === 'diesel' ? 'text-green-600' : 'text-gray-600'}`}>
//                     Diesel
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Date */}
//             <View className="mb-4">
//               <Text className="text-gray-700 font-medium mb-2">Date</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg px-3 py-3 bg-white"
//                 value={formData.date}
//                 onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
//                 placeholder="YYYY-MM-DD"
//               />
//             </View>

//             {/* Quantity */}
//             <View className="mb-4">
//               <Text className="text-gray-700 font-medium mb-2">Quantity (Liters)</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg px-3 py-3 bg-white"
//                 value={formData.quantity}
//                 onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
//                 placeholder="Enter fuel quantity"
//                 keyboardType="numeric"
//               />
//             </View>

//             {/* Price per Unit */}
//             <View className="mb-4">
//               <Text className="text-gray-700 font-medium mb-2">Price per Liter ($)</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg px-3 py-3 bg-white"
//                 value={formData.pricePerUnit}
//                 onChangeText={(text) => setFormData(prev => ({ ...prev, pricePerUnit: text }))}
//                 placeholder="Enter price per liter"
//                 keyboardType="numeric"
//               />
//             </View>

//             {/* Total Cost (Auto-calculated) */}
//             <View className="mb-4">
//               <Text className="text-gray-700 font-medium mb-2">Total Cost ($)</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-100"
//                 value={formData.totalCost}
//                 editable={false}
//                 placeholder="Auto-calculated"
//               />
//             </View>

//             {/* Odometer Reading (Optional) */}
//             <View className="mb-6">
//               <Text className="text-gray-700 font-medium mb-2">Odometer Reading (km) - Optional</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg px-3 py-3 bg-white"
//                 value={formData.odometerReading}
//                 onChangeText={(text) => setFormData(prev => ({ ...prev, odometerReading: text }))}
//                 placeholder="Enter current odometer reading"
//                 keyboardType="numeric"
//               />
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default FuelWise;