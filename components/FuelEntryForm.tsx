import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { FuelService } from '../services/fuelService';
import { FuelFormData } from '../types/fuel';

interface FuelEntryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: Partial<FuelFormData>;
  isEditing?: boolean;
  entryId?: string;
}

export default function FuelEntryForm({ 
  onSuccess, 
  onCancel, 
  initialData,
  isEditing = false,
  entryId 
}: FuelEntryFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FuelFormData>({
    fuelType: 'petrol',
    date: new Date().toISOString().split('T')[0],
    quantity: '',
    pricePerUnit: '',
    odometerReading: '',
    location: '',
    notes: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<FuelFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FuelFormData> = {};

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.pricePerUnit || parseFloat(formData.pricePerUnit) <= 0) {
      newErrors.pricePerUnit = 'Price per unit must be greater than 0';
    }

    // Only validate odometer reading if it's provided and not empty
    if (formData.odometerReading && formData.odometerReading.trim() !== '' && parseFloat(formData.odometerReading) < 0) {
      newErrors.odometerReading = 'Odometer reading cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalCost = (): number => {
    const quantity = parseFloat(formData.quantity) || 0;
    const pricePerUnit = parseFloat(formData.pricePerUnit) || 0;
    return quantity * pricePerUnit;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !user) return;

    setLoading(true);
    try {
      const totalCost = calculateTotalCost();
       const entryData = {
         userId: user.uid,
         fuelType: formData.fuelType,
         date: new Date(formData.date),
         quantity: parseFloat(formData.quantity),
         pricePerUnit: parseFloat(formData.pricePerUnit),
         totalCost,
         odometerReading: formData.odometerReading && formData.odometerReading.trim() !== '' 
           ? parseFloat(formData.odometerReading) 
           : undefined,
         location: formData.location && formData.location.trim() !== '' 
           ? formData.location.trim() 
           : undefined,
         notes: formData.notes && formData.notes.trim() !== '' 
           ? formData.notes.trim() 
           : undefined,
       };

      if (isEditing && entryId) {
        await FuelService.updateFuelEntry(entryId, entryData);
        Alert.alert('Success', 'Fuel entry updated successfully!');
      } else {
        await FuelService.addFuelEntry(entryData);
        Alert.alert('Success', 'Fuel entry added successfully!');
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving fuel entry:', error);
      Alert.alert('Error', 'Failed to save fuel entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FuelFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isEditing ? 'Edit Fuel Entry' : 'Add Fuel Entry'}
          </Text>

          {/* Fuel Type */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Fuel Type *</Text>
            <View className="border border-gray-300 rounded-lg bg-white">
              <Picker
                selectedValue={formData.fuelType}
                onValueChange={(value) => handleInputChange('fuelType', value)}
                style={{ height: 50 }}
              >
                <Picker.Item label="Petrol" value="petrol" />
                <Picker.Item label="Diesel" value="diesel" />
              </Picker>
            </View>
          </View>

          {/* Date */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Date *</Text>
            <TextInput
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
              placeholder="YYYY-MM-DD"
              className="border border-gray-300 rounded-lg px-3 py-3 bg-white text-gray-800"
            />
          </View>

          {/* Quantity */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Quantity (Liters) *</Text>
            <TextInput
              value={formData.quantity}
              onChangeText={(value) => handleInputChange('quantity', value)}
              placeholder="Enter quantity in liters"
              keyboardType="numeric"
              className={`border rounded-lg px-3 py-3 bg-white text-gray-800 ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.quantity && (
              <Text className="text-red-500 text-xs mt-1">{errors.quantity}</Text>
            )}
          </View>

          {/* Price Per Unit */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Price Per Liter *</Text>
            <TextInput
              value={formData.pricePerUnit}
              onChangeText={(value) => handleInputChange('pricePerUnit', value)}
              placeholder="Enter price per liter"
              keyboardType="numeric"
              className={`border rounded-lg px-3 py-3 bg-white text-gray-800 ${
                errors.pricePerUnit ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.pricePerUnit && (
              <Text className="text-red-500 text-xs mt-1">{errors.pricePerUnit}</Text>
            )}
          </View>

          {/* Total Cost Display */}
          <View className="mb-4 p-3 bg-blue-50 rounded-lg">
            <Text className="text-sm font-medium text-gray-700">Total Cost</Text>
            <Text className="text-lg font-bold text-blue-600">
              ₹{calculateTotalCost().toFixed(2)}
            </Text>
          </View>

           {/* Odometer Reading */}
           <View className="mb-4">
             <Text className="text-sm font-medium text-gray-700 mb-2">Odometer Reading (km) <Text className="text-gray-400">(Optional)</Text></Text>
             <TextInput
               value={formData.odometerReading}
               onChangeText={(value) => handleInputChange('odometerReading', value)}
               placeholder="Enter odometer reading (optional)"
               keyboardType="numeric"
               className={`border rounded-lg px-3 py-3 bg-white text-gray-800 ${
                 errors.odometerReading ? 'border-red-500' : 'border-gray-300'
               }`}
             />
             {errors.odometerReading && (
               <Text className="text-red-500 text-xs mt-1">{errors.odometerReading}</Text>
             )}
           </View>

           {/* Location */}
           <View className="mb-4">
             <Text className="text-sm font-medium text-gray-700 mb-2">Location <Text className="text-gray-400">(Optional)</Text></Text>
             <TextInput
               value={formData.location}
               onChangeText={(value) => handleInputChange('location', value)}
               placeholder="Enter location (optional)"
               className="border border-gray-300 rounded-lg px-3 py-3 bg-white text-gray-800"
             />
           </View>

           {/* Notes */}
           <View className="mb-6">
             <Text className="text-sm font-medium text-gray-700 mb-2">Notes <Text className="text-gray-400">(Optional)</Text></Text>
             <TextInput
               value={formData.notes}
               onChangeText={(value) => handleInputChange('notes', value)}
               placeholder="Add any notes (optional)"
               multiline
               numberOfLines={3}
               className="border border-gray-300 rounded-lg px-3 py-3 bg-white text-gray-800"
             />
           </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-gray-300 py-3 rounded-lg"
              disabled={loading}
            >
              <Text className="text-center font-medium text-gray-700">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 bg-blue-600 py-3 rounded-lg"
              disabled={loading}
            >
              <Text className="text-center font-medium text-white">
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add Entry')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
