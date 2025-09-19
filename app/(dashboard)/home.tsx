// import { View, Text } from 'react-native'
// import React from 'react'

// const HomeScreen = () => {
//   return (
//     <View className="flex-1 w-full justify-center align-items-center">
//       <Text className="text-center text-4xl">HomeScreen</Text>
//     </View>
//   )
// }

// export default HomeScreen

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Header with Gradient Effect */}
        <View className="bg-blue-600 px-6 pt-12 pb-20 relative overflow-hidden">
          {/* Decorative Circles */}
          <View className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 -mr-20 -mt-10" />
          <View className="absolute top-20 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-15" />
          <View className="absolute bottom-0 left-0 w-32 h-32 bg-blue-700 rounded-full opacity-25 -ml-16 -mb-8" />
          
          {/* Header Content */}
          <View className="flex-row justify-between items-start mb-8">
            <View className="flex-1">
              <Text className="text-blue-100 text-base">Good Morning</Text>
              <Text className="text-white text-3xl font-bold mt-1">FuelWise</Text>
              <Text className="text-blue-100 text-sm mt-1">Smart fuel tracking made simple</Text>
            </View>
            <View className="bg-white/10 rounded-full px-4 py-2">
              <Text className="text-white text-sm font-medium">🗓️ Today</Text>
            </View>
          </View>

          {/* Main CTA Button */}
          <TouchableOpacity 
            className="bg-white rounded-2xl px-6 py-5 shadow-xl"
            onPress={() => router.push('/fuelwise')}
          >
            <View className="flex-row items-center justify-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Text className="text-blue-600 text-2xl">⛽</Text>
              </View>
              <View>
                <Text className="text-gray-800 text-xl font-bold">Add Fuel Entry</Text>
                <Text className="text-gray-500 text-sm">Track your fuel usage</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards - Overlapping Header */}
        <View className="px-4 -mt-16 mb-8">
          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Fuel</Text>
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center">
                  <Text className="text-green-600 text-sm">🚗</Text>
                </View>
              </View>
              <Text className="text-gray-900 text-2xl font-bold">247.5</Text>
              <Text className="text-gray-400 text-sm">Liters</Text>
            </View>
            
            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">This Month</Text>
                <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                  <Text className="text-blue-600 text-sm">💰</Text>
                </View>
              </View>
              <Text className="text-gray-900 text-2xl font-bold">$124</Text>
              <Text className="text-gray-400 text-sm">Spent</Text>
            </View>
          </View>

          <View className="flex-row space-x-3">
            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Efficiency</Text>
                <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center">
                  <Text className="text-purple-600 text-sm">⚡</Text>
                </View>
              </View>
              <Text className="text-gray-900 text-2xl font-bold">12.5</Text>
              <Text className="text-gray-400 text-sm">km/L</Text>
            </View>
            
            <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Last Fill</Text>
                <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center">
                  <Text className="text-orange-600 text-sm">📅</Text>
                </View>
              </View>
              <Text className="text-gray-900 text-2xl font-bold">3</Text>
              <Text className="text-gray-400 text-sm">Days ago</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-8">
          <Text className="text-gray-800 text-xl font-bold mb-4">Quick Actions</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity 
              className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6"
              onPress={() => router.push('/fuelwise')}
            >
              <View className="items-center">
                <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center mb-3">
                  <Text className="text-white text-2xl">📊</Text>
                </View>
                <Text className="text-white font-bold text-base">View Reports</Text>
                <Text className="text-blue-100 text-xs mt-1">Analytics & insights</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6"
              onPress={() => router.push('/fuelwise')}
            >
              <View className="items-center">
                <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center mb-3">
                  <Text className="text-white text-2xl">📋</Text>
                </View>
                <Text className="text-white font-bold text-base">All Entries</Text>
                <Text className="text-green-100 text-xs mt-1">Fuel history</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 text-xl font-bold">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Items */}
          <View className="space-y-3">
            <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Text className="text-blue-600 text-lg">⛽</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Petrol Fill-up</Text>
                <Text className="text-gray-500 text-sm">45.5L • $67.80 • Yesterday</Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 text-xs font-semibold">PETROL</Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                <Text className="text-green-600 text-lg">⛽</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Diesel Fill-up</Text>
                <Text className="text-gray-500 text-sm">52.2L • $71.20 • 3 days ago</Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-700 text-xs font-semibold">DIESEL</Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
                <Text className="text-purple-600 text-lg">📊</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">Monthly Report</Text>
                <Text className="text-gray-500 text-sm">Efficiency improved by 8%</Text>
              </View>
              <View className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-700 text-xs font-semibold">REPORT</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Fuel Tips Card */}
        <View className="px-4 mb-8">
          <View className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <View className="absolute top-0 right-0 w-24 h-24 bg-orange-300 rounded-full opacity-30 -mr-12 -mt-12" />
            <View className="absolute bottom-0 left-0 w-16 h-16 bg-orange-600 rounded-full opacity-30 -ml-8 -mb-8" />
            
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-lg">💡</Text>
              </View>
              <Text className="text-white font-bold text-lg">Fuel Saving Tip</Text>
            </View>
            <Text className="text-orange-100 text-base leading-relaxed">
              Maintain steady speeds and avoid rapid acceleration to improve your fuel efficiency by up to 15%!
            </Text>
          </View>
        </View>

        {/* Bottom Navigation Hint */}
        <View className="px-4 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm border-2 border-dashed border-gray-200">
            <Text className="text-gray-600 text-center font-medium">
              🚀 Ready to start tracking? Tap &quot;Add Fuel Entry&quot; above!
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

