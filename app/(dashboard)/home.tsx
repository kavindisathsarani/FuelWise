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

import { View, Text, ScrollView, TouchableOpacity, FlatList, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useAuth } from '@/context/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const HomeScreen = () => {
  const router = useRouter()
  const { user } = useAuth()
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  
  // Mock data for demonstration
  const [entries, setEntries] = useState([
    {
      id: '1',
      fuelType: 'petrol',
      date: '2023-10-15',
      quantity: '42.5',
      pricePerUnit: '1.65',
      totalCost: '70.13',
      odometer: '15420'
    },
    {
      id: '2',
      fuelType: 'diesel',
      date: '2023-10-08',
      quantity: '38.0',
      pricePerUnit: '1.72',
      totalCost: '65.36',
      odometer: '15080'
    }
  ])
  
  const [stats, setStats] = useState({
    totalFuel: 80.5,
    totalCost: 135.49,
    avgEfficiency: 12.5,
    lastEntryDate: 'Oct 15, 2023'
  })

  useEffect(() => {
    // Animate on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const renderEntryItem = ({ item }: { item: any }) => (
    <Animated.View 
      className="bg-white/80 p-4 rounded-2xl mb-3 shadow-sm backdrop-blur-md"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">{item.date}</Text>
        <View className={`px-3 py-1 rounded-full ${
          item.fuelType === 'petrol' ? 'bg-blue-100/80' : 'bg-amber-100/80'
        }`}>
          <Text className={`text-xs font-medium ${
            item.fuelType === 'petrol' ? 'text-blue-800' : 'text-amber-800'
          }`}>
            {item.fuelType.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View className="flex-row justify-between mb-2">
        <View>
          <Text className="text-gray-600 text-sm">Quantity</Text>
          <Text className="font-medium">{item.quantity} L</Text>
        </View>
        <View>
          <Text className="text-gray-600 text-sm">Price/L</Text>
          <Text className="font-medium">${item.pricePerUnit}</Text>
        </View>
        <View>
          <Text className="text-gray-600 text-sm">Total</Text>
          <Text className="font-medium text-green-600">{formatCurrency(parseFloat(item.totalCost))}</Text>
        </View>
      </View>

      {item.odometer && (
        <View className="mb-2">
          <Text className="text-gray-600 text-sm">Odometer</Text>
          <Text className="font-medium">{item.odometer} km</Text>
        </View>
      )}
    </Animated.View>
  )

  return (
    <LinearGradient 
      colors={['#f8fafc', '#e2e8f0', '#cbd5e1']} 
      className="flex-1"
    >
      <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
        {/* Header with animated entrance */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Text className="text-4xl font-bold text-gray-900 mb-2">FuelWise</Text>
          <Text className="text-gray-600 text-lg">Track your fuel usage & expenses</Text>
        </Animated.View>

        {/* Quick Stats with glassmorphism effect */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
          }}
        >
          <BlurView intensity={80} tint="light" className="rounded-3xl overflow-hidden">
            <LinearGradient 
              colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)']} 
              className="p-6 rounded-3xl"
            >
              <Text className="text-xl font-semibold mb-5 text-gray-800 text-center">Quick Overview</Text>
              
              <View className="flex-row justify-between mb-5">
                <View className="items-center flex-1">
                  <View className="bg-blue-500/10 p-3 rounded-full mb-2">
                    <Ionicons name="water" size={24} color="#3b82f6" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-900 mb-1">{stats.totalFuel.toFixed(1)}L</Text>
                  <Text className="text-gray-600 text-xs">Total Fuel</Text>
                </View>
                
                <View className="items-center flex-1">
                  <View className="bg-green-500/10 p-3 rounded-full mb-2">
                    <Ionicons name="cash" size={24} color="#10b981" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.totalCost)}</Text>
                  <Text className="text-gray-600 text-xs">Total Spent</Text>
                </View>
                
                <View className="items-center flex-1">
                  <View className="bg-red-500/10 p-3 rounded-full mb-2">
                    <Ionicons name="speedometer" size={24} color="#ef4444" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.avgEfficiency ? stats.avgEfficiency.toFixed(1) : 'N/A'}
                  </Text>
                  <Text className="text-gray-600 text-xs">km/L</Text>
                </View>
              </View>

              {stats.lastEntryDate && (
                <View className="bg-gray-100/50 py-2 px-4 rounded-full self-center">
                  <Text className="text-gray-600 text-sm">
                    Last entry: <Text className="font-semibold">{stats.lastEntryDate}</Text>
                  </Text>
                </View>
              )}
            </LinearGradient>
          </BlurView>
        </Animated.View>

        {/* Recent Entries */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-semibold text-gray-800">Recent Entries</Text>
            {entries.length > 0 && (
              <TouchableOpacity 
                onPress={() => router.push('/(dashboard)/profile')}
                className="flex-row items-center"
              >
                <Text className="text-blue-500 font-medium mr-1">View All</Text>
                <Ionicons name="arrow-forward" size={16} color="#3b82f6" />
              </TouchableOpacity>
            )}
          </View>

          {entries.length === 0 ? (
            <View className="bg-white/80 rounded-2xl p-8 items-center backdrop-blur-md">
              <View className="bg-blue-100/50 p-5 rounded-full mb-4">
                <Ionicons name="car-sport" size={40} color="#3b82f6" />
              </View>
              <Text className="text-gray-600 mt-2 text-lg font-medium">No entries yet</Text>
              <Text className="text-gray-500 text-center mt-1 mb-4">
                Add your first fuel entry to start tracking
              </Text>
              <TouchableOpacity 
                className="bg-blue-500 px-6 py-3 rounded-full flex-row items-center"
                onPress={() => router.push('/(dashboard)/setting')}
              >
                <Ionicons name="add" size={20} color="#fff" className="mr-2" />
                <Text className="text-white font-semibold">Add First Entry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={entries.slice(0, 3)}
              renderItem={renderEntryItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          )}
        </Animated.View>

        {/* Quick Actions with animated buttons */}
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Text className="text-xl font-semibold mb-5 text-gray-800">Quick Actions</Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className="flex-1 bg-white/90 p-5 rounded-2xl mr-3 items-center shadow-md"
              onPress={() => router.push('/(dashboard)/setting')}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="bg-blue-500/10 p-3 rounded-full mb-3">
                <Ionicons name="add-circle" size={28} color="#3b82f6" />
              </View>
              <Text className="text-blue-600 font-medium">Add Entry</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-white/90 p-5 rounded-2xl mx-3 items-center shadow-md"
              onPress={() => router.push('/(dashboard)/setting')}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="bg-green-500/10 p-3 rounded-full mb-3">
                <MaterialIcons name="analytics" size={28} color="#10b981" />
              </View>
              <Text className="text-green-600 font-medium">Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-white/90 p-5 rounded-2xl ml-3 items-center shadow-md"
              onPress={() => router.push('/(dashboard)/setting')}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="bg-purple-500/10 p-3 rounded-full mb-3">
                <FontAwesome5 name="history" size={24} color="#8b5cf6" />
              </View>
              <Text className="text-purple-600 font-medium">History</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom spacer */}
        <View className="h-20" />
      </ScrollView>

      {/* Floating Action Button with pulse animation */}
      <Animated.View 
        className="absolute bottom-6 right-6"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        <TouchableOpacity
          className="bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-xl"
          onPress={() => router.push('/(dashboard)/setting')}
          style={{
            shadowColor: "#3b82f6",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  )
}

export default HomeScreen