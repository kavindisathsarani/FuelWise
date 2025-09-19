import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { FuelService } from '../services/fuelService';
import { FuelEntry } from '../types/fuel';
import FuelEntryForm from './FuelEntryForm';

interface FuelHistoryListProps {
  onRefresh?: () => void;
}

export default function FuelHistoryList({ onRefresh }: FuelHistoryListProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<FuelEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FuelEntry | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadEntries = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    
    try {
      console.log('Loading fuel entries for user:', user.uid);
      const fuelEntries = await FuelService.getFuelEntries(user.uid);
      console.log('Loaded fuel entries:', fuelEntries);
      setEntries(fuelEntries);
    } catch (error) {
      console.error('Error loading fuel entries:', error);
      Alert.alert('Error', 'Failed to load fuel entries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEntries();
    onRefresh?.();
  };

  const handleEdit = (entry: FuelEntry) => {
    setEditingEntry(entry);
    setShowEditModal(true);
  };

  const handleDelete = (entry: FuelEntry) => {
    console.log('Delete button pressed for entry:', entry);
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this fuel entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('User confirmed deletion for entry ID:', entry.id);
              console.log('Entry details:', entry);
              await FuelService.deleteFuelEntry(entry.id);
              console.log('Delete successful, reloading entries...');
              await loadEntries();
              onRefresh?.();
              console.log('Entries reloaded after deletion');
              Alert.alert('Success', 'Fuel entry deleted successfully!');
            } catch (error) {
              console.error('Error deleting fuel entry:', error);
              console.error('Error details:', error);
              Alert.alert('Error', `Failed to delete fuel entry: ${error.message || 'Unknown error'}`);
            }
          },
        },
      ]
    );
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditingEntry(null);
    loadEntries();
    onRefresh?.();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const renderEntry = ({ item }: { item: FuelEntry }) => {
    console.log('Rendering entry with ID:', item.id, 'Type:', typeof item.id);
    return (
      <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              {item.fuelType.charAt(0).toUpperCase() + item.fuelType.slice(1)}
            </Text>
            <Text className="text-sm text-gray-600">{formatDate(item.date)}</Text>
            {__DEV__ && (
              <Text className="text-xs text-gray-400">ID: {item.id}</Text>
            )}
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              className="bg-blue-100 px-3 py-1 rounded"
            >
              <Text className="text-blue-600 text-xs font-medium">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              className="bg-red-100 px-3 py-1 rounded"
            >
              <Text className="text-red-600 text-xs font-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm text-gray-600">
          {item.quantity}L @ {formatCurrency(item.pricePerUnit)}/L
        </Text>
        <Text className="text-lg font-bold text-green-600">
          {formatCurrency(item.totalCost)}
        </Text>
      </View>

      {item.odometerReading && (
        <Text className="text-sm text-gray-500 mb-1">
          Odometer: {item.odometerReading.toLocaleString()} km
        </Text>
      )}

      {item.location && (
        <Text className="text-sm text-gray-500 mb-1">
          📍 {item.location}
        </Text>
      )}

      {item.notes && (
        <Text className="text-sm text-gray-500 italic">
          &quot;{item.notes}&quot;
        </Text>
      )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-12">
      <Text className="text-4xl mb-4">⛽</Text>
      <Text className="text-xl font-semibold text-gray-600 mb-2">
        No Fuel Entries Yet
      </Text>
      <Text className="text-gray-500 text-center px-8">
        Start tracking your fuel consumption by adding your first entry!
      </Text>
      {__DEV__ && (
        <View className="mt-4 p-4 bg-gray-100 rounded">
          <Text className="text-xs text-gray-600">Debug: User ID: {user?.uid || 'No user'}</Text>
          <Text className="text-xs text-gray-600">Entries count: {entries.length}</Text>
          <TouchableOpacity
            onPress={async () => {
              console.log('Test delete button pressed');
              if (entries.length > 0) {
                const firstEntry = entries[0];
                console.log('Testing delete with entry:', firstEntry);
                try {
                  await FuelService.deleteFuelEntry(firstEntry.id);
                  console.log('Test delete successful');
                  await loadEntries();
                } catch (error) {
                  console.error('Test delete failed:', error);
                }
              }
            }}
            className="mt-2 bg-red-500 px-3 py-1 rounded"
          >
            <Text className="text-white text-xs">Test Delete First Entry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Loading fuel entries...</Text>
        {__DEV__ && (
          <View className="mt-4 p-4 bg-gray-100 rounded">
            <Text className="text-xs text-gray-600">Debug: User ID: {user?.uid || 'No user'}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        extraData={entries.length} // Force re-render when entries change
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={entries.length === 0 ? { flex: 1 } : { padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity
              onPress={() => setShowEditModal(false)}
              className="bg-gray-100 px-4 py-2 rounded"
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Edit Fuel Entry</Text>
            <View className="w-16" />
          </View>
          
          {editingEntry && (
            <FuelEntryForm
              initialData={{
                fuelType: editingEntry.fuelType,
                date: editingEntry.date.toISOString().split('T')[0],
                quantity: editingEntry.quantity.toString(),
                pricePerUnit: editingEntry.pricePerUnit.toString(),
                odometerReading: editingEntry.odometerReading?.toString() || '',
                location: editingEntry.location || '',
                notes: editingEntry.notes || '',
              }}
              isEditing={true}
              entryId={editingEntry.id}
              onSuccess={handleEditSuccess}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
