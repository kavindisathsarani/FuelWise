import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { FuelService } from '../services/fuelService';
import { FuelStatistics as FuelStats } from '../types/fuel';

interface FuelStatisticsProps {
  onRefresh?: () => void;
}

export default function FuelStatistics({ onRefresh }: FuelStatisticsProps) {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState<FuelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStatistics = useCallback(async () => {
    if (!user) return;
    
    try {
      const stats = await FuelService.getFuelStatistics(user.uid);
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading fuel statistics:', error);
      Alert.alert('Error', 'Failed to load fuel statistics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStatistics();
    onRefresh?.();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    color = 'blue' 
  }: {
    title: string;
    value: string;
    subtitle?: string;
    icon: string;
    color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      orange: 'bg-orange-50 border-orange-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200',
    };

    const textColorClasses = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      purple: 'text-purple-600',
      red: 'text-red-600',
    };

    return (
      <View className={`p-4 rounded-lg border ${colorClasses[color]} mb-4`}>
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl mr-2">{icon}</Text>
          <Text className={`text-sm font-medium ${textColorClasses[color]}`}>
            {title}
          </Text>
        </View>
        <Text className={`text-2xl font-bold ${textColorClasses[color]} mb-1`}>
          {value}
        </Text>
        {subtitle && (
          <Text className="text-xs text-gray-600">{subtitle}</Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Loading statistics...</Text>
      </View>
    );
  }

  if (!statistics || statistics.totalEntries === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-4xl mb-4">📊</Text>
        <Text className="text-xl font-semibold text-gray-600 mb-2">
          No Data Available
        </Text>
        <Text className="text-gray-500 text-center">
          Add some fuel entries to see your statistics and insights!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Fuel Statistics
        </Text>

        {/* Overview Cards */}
        <View className="mb-6">
          <StatCard
            title="Total Fuel Consumed"
            value={`${statistics.totalFuelConsumed.toFixed(1)}L`}
            icon="⛽"
            color="blue"
          />
          
          <StatCard
            title="Total Money Spent"
            value={formatCurrency(statistics.totalMoneySpent)}
            icon="💰"
            color="green"
          />
          
          <StatCard
            title="Average Price per Liter"
            value={formatCurrency(statistics.averagePricePerLiter)}
            icon="💲"
            color="orange"
          />
          
          <StatCard
            title="Total Entries"
            value={statistics.totalEntries.toString()}
            subtitle={`Last entry: ${statistics.lastEntryDate ? formatDate(statistics.lastEntryDate) : 'N/A'}`}
            icon="📝"
            color="purple"
          />
        </View>

        {/* Fuel Efficiency */}
        {statistics.averageFuelEfficiency && (
          <View className="mb-6">
            <StatCard
              title="Average Fuel Efficiency"
              value={`${statistics.averageFuelEfficiency.toFixed(1)} km/L`}
              subtitle="Based on odometer readings"
              icon="🚗"
              color="green"
            />
          </View>
        )}

        {/* Fuel Type Breakdown */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Fuel Type Breakdown
          </Text>
          
          <View className="space-y-3">
            {/* Petrol */}
            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <View className="flex-row items-center mb-2">
                <Text className="text-xl mr-2">🟢</Text>
                <Text className="text-lg font-semibold text-gray-800">Petrol</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-gray-600">
                    {statistics.fuelTypeBreakdown.petrol.entries} entries
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {statistics.fuelTypeBreakdown.petrol.totalFuel.toFixed(1)}L
                  </Text>
                </View>
                <Text className="text-lg font-bold text-green-600">
                  {formatCurrency(statistics.fuelTypeBreakdown.petrol.totalCost)}
                </Text>
              </View>
            </View>

            {/* Diesel */}
            <View className="bg-white rounded-lg p-4 border border-gray-200">
              <View className="flex-row items-center mb-2">
                <Text className="text-xl mr-2">🔵</Text>
                <Text className="text-lg font-semibold text-gray-800">Diesel</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-gray-600">
                    {statistics.fuelTypeBreakdown.diesel.entries} entries
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {statistics.fuelTypeBreakdown.diesel.totalFuel.toFixed(1)}L
                  </Text>
                </View>
                <Text className="text-lg font-bold text-blue-600">
                  {formatCurrency(statistics.fuelTypeBreakdown.diesel.totalCost)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insights */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Insights
          </Text>
          
          <View className="bg-white rounded-lg p-4 border border-gray-200">
            <View className="space-y-3">
              <View className="flex-row items-start">
                <Text className="text-lg mr-2">💡</Text>
                <Text className="text-sm text-gray-700 flex-1">
                  You&apos;ve spent an average of{' '}
                  <Text className="font-semibold">
                    {formatCurrency(statistics.totalMoneySpent / statistics.totalEntries)}
                  </Text>{' '}
                  per fuel entry.
                </Text>
              </View>
              
              <View className="flex-row items-start">
                <Text className="text-lg mr-2">📈</Text>
                <Text className="text-sm text-gray-700 flex-1">
                  Your most used fuel type is{' '}
                  <Text className="font-semibold">
                    {statistics.fuelTypeBreakdown.petrol.totalFuel > statistics.fuelTypeBreakdown.diesel.totalFuel ? 'Petrol' : 'Diesel'}
                  </Text>{' '}
                  with{' '}
                  {Math.max(statistics.fuelTypeBreakdown.petrol.totalFuel, statistics.fuelTypeBreakdown.diesel.totalFuel).toFixed(1)}L consumed.
                </Text>
              </View>

              {statistics.averageFuelEfficiency && (
                <View className="flex-row items-start">
                  <Text className="text-lg mr-2">🎯</Text>
                  <Text className="text-sm text-gray-700 flex-1">
                    Your vehicle&apos;s fuel efficiency is{' '}
                    <Text className="font-semibold">
                      {statistics.averageFuelEfficiency.toFixed(1)} km/L
                    </Text>
                    , which is{' '}
                    {statistics.averageFuelEfficiency > 15 ? 'excellent' : 
                     statistics.averageFuelEfficiency > 10 ? 'good' : 'could be improved'}.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
