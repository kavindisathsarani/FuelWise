import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

const SettingScreen = () => {
  const router = useRouter()
  
  // Settings state
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [fuelReminders, setFuelReminders] = useState(false)

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?')
      if (confirmed) {
        // This will be handled by the logout function in AuthContext
        router.replace('/login')
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => router.replace('/login'),
          },
        ]
      )
    }
  }

  const handleClearData = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to clear all fuel data? This action cannot be undone.')
      if (confirmed) {
        // TODO: Implement clear data functionality
        alert('Data cleared successfully!')
      }
    } else {
      Alert.alert(
        'Clear Data',
        'Are you sure you want to clear all fuel data? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: () => {
              // TODO: Implement clear data functionality
              Alert.alert('Success', 'Data cleared successfully!')
            },
          },
        ]
      )
    }
  }

  const handleExportData = () => {
    // TODO: Implement data export functionality
    if (Platform.OS === 'web') {
      alert('Data export feature coming soon!')
    } else {
      Alert.alert('Info', 'Data export feature coming soon!')
    }
  }

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent, 
    isLast = false 
  }: {
    icon: string
    title: string
    subtitle?: string
    onPress?: () => void
    rightComponent?: React.ReactNode
    isLast?: boolean
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 ${
        isLast ? 'mb-0' : ''
      }`}
      disabled={!onPress}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
          <Text className="text-blue-600 text-xl">{icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-800 text-base font-semibold">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
        {rightComponent || (
          <Text className="text-gray-400 text-2xl">›</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Header with Gradient Background */}
          <View className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 mb-8 shadow-xl">
            <View className="items-center">
              <View className="w-28 h-28 bg-white/20 rounded-full items-center justify-center mb-4 shadow-lg">
                <Text className="text-white text-4xl">⚙️</Text>
              </View>
              <Text className="text-white text-3xl font-bold mb-2">Settings</Text>
              <Text className="text-purple-100 text-base">Customize your FuelWise experience</Text>
            </View>
          </View>

          {/* Account Settings */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">Account</Text>
            
            <SettingItem
              icon="👤"
              title="Profile"
              subtitle="Manage your account information"
              onPress={() => router.push('/profile')}
            />
            
            <SettingItem
              icon="🔒"
              title="Privacy & Security"
              subtitle="Control your data and privacy"
              onPress={() => {
                if (Platform.OS === 'web') {
                  alert('Privacy settings coming soon!')
                } else {
                  Alert.alert('Info', 'Privacy settings coming soon!')
                }
              }}
            />
          </View>

          {/* App Preferences */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">Preferences</Text>
            
            <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-green-600 text-xl">🔔</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 text-base font-semibold">Notifications</Text>
                    <Text className="text-gray-500 text-sm mt-1">Get notified about fuel reminders</Text>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#f3f4f6', true: '#10b981' }}
                  thumbColor={notifications ? '#ffffff' : '#9ca3af'}
                />
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-gray-600 text-xl">🌙</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 text-base font-semibold">Dark Mode</Text>
                    <Text className="text-gray-500 text-sm mt-1">Switch to dark theme</Text>
                  </View>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#f3f4f6', true: '#6366f1' }}
                  thumbColor={darkMode ? '#ffffff' : '#9ca3af'}
                />
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-blue-600 text-xl">🔄</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 text-base font-semibold">Auto Sync</Text>
                    <Text className="text-gray-500 text-sm mt-1">Automatically sync data</Text>
                  </View>
                </View>
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
                  thumbColor={autoSync ? '#ffffff' : '#9ca3af'}
                />
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-orange-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-orange-600 text-xl">⛽</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 text-base font-semibold">Fuel Reminders</Text>
                    <Text className="text-gray-500 text-sm mt-1">Get reminded to log fuel entries</Text>
                  </View>
                </View>
                <Switch
                  value={fuelReminders}
                  onValueChange={setFuelReminders}
                  trackColor={{ false: '#f3f4f6', true: '#f59e0b' }}
                  thumbColor={fuelReminders ? '#ffffff' : '#9ca3af'}
                />
              </View>
            </View>
          </View>

          {/* Data Management */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">Data Management</Text>
            
            <SettingItem
              icon="📊"
              title="Export Data"
              subtitle="Download your fuel data as CSV"
              onPress={handleExportData}
            />
            
            <SettingItem
              icon="🗑️"
              title="Clear All Data"
              subtitle="Remove all fuel entries permanently"
              onPress={handleClearData}
            />
          </View>

          {/* App Information */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">About</Text>
            
            <SettingItem
              icon="ℹ️"
              title="App Version"
              subtitle="FuelWise v1.0.0"
              isLast
            />
            
            <SettingItem
              icon="📱"
              title="Platform"
              subtitle="React Native + Expo"
              isLast
            />
            
            <SettingItem
              icon="🔧"
              title="Developer"
              subtitle="Built with ❤️ for fuel tracking"
              isLast
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl mb-8 shadow-lg active:scale-95 transition-transform"
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-lg font-semibold mr-2">🚪</Text>
              <Text className="text-white text-lg font-semibold">Logout</Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center py-4">
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Text className="text-gray-400 text-center text-sm mb-2">
                Made with ❤️ for fuel tracking
              </Text>
              <Text className="text-gray-300 text-center text-xs">
                FuelWise - Smart Fuel Management
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen