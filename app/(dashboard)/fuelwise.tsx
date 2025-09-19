import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import FuelEntryForm from '../../components/FuelEntryForm';
import FuelHistoryList from '../../components/FuelHistoryList';
import FuelStatistics from '../../components/FuelStatistics';

type TabType = 'history' | 'statistics';

export default function FuelWiseScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    handleRefresh();
  };

  // Refresh data when screen is focused
  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Text className="text-gray-600 text-lg">←</Text>
          </TouchableOpacity>
          
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-gray-800">FuelWise</Text>
            <Text className="text-sm text-gray-500">Track your fuel usage</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center"
          >
            <Text className="text-white text-lg">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'history' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text className={`text-center font-medium ${
              activeTab === 'history' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              History
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('statistics')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === 'statistics' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text className={`text-center font-medium ${
              activeTab === 'statistics' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              Statistics
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        {activeTab === 'history' ? (
          <FuelHistoryList key={refreshKey} onRefresh={handleRefresh} />
        ) : (
          <FuelStatistics key={refreshKey} onRefresh={handleRefresh} />
        )}
      </View>

      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity
              onPress={() => setShowAddModal(false)}
              className="bg-gray-100 px-4 py-2 rounded"
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Add Fuel Entry</Text>
            <View className="w-16" />
          </View>
          
          <FuelEntryForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddModal(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
