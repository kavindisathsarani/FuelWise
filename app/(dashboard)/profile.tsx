import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthContext'

const ProfileScreen = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    console.log('=== HANDLE LOGOUT CALLED ===');
    console.log('Logout button pressed');
    console.log('Current user:', user);
    console.log('Logout function available:', !!logout);
    console.log('Platform:', Platform.OS);
    
    // For web platform, use confirm instead of Alert
    if (Platform.OS === 'web') {
      console.log('Using web confirm dialog...');
      const confirmed = window.confirm('Are you sure you want to logout?');
      console.log('User confirmed:', confirmed);
      
      if (confirmed) {
        console.log('User confirmed logout, starting process...');
        logout().then(() => {
          console.log('Logout successful, navigating to login...');
          router.replace('/login');
        }).catch((error) => {
          console.error('Logout error:', error);
          alert(`Failed to logout: ${error.message || 'Unknown error'}`);
        });
      } else {
        console.log('User cancelled logout');
      }
    } else {
      // For mobile platforms, use Alert
      try {
        console.log('Showing alert dialog...');
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { 
              text: 'Cancel', 
              style: 'cancel',
              onPress: () => {
                console.log('User cancelled logout');
              }
            },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: async () => {
                try {
                  console.log('User confirmed logout, starting process...');
                  await logout();
                  console.log('Logout successful, navigating to login...');
                  router.replace('/login');
                } catch (error) {
                  console.error('Logout error:', error);
                  Alert.alert('Error', `Failed to logout: ${error.message || 'Unknown error'}`);
                }
              },
            },
          ]
        );
        console.log('Alert dialog shown successfully');
      } catch (error) {
        console.error('Error showing alert dialog:', error);
      }
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Header with Gradient Background */}
          <View className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 shadow-xl">
            <View className="items-center">
              <View className="w-28 h-28 bg-white/20 rounded-full items-center justify-center mb-4 shadow-lg">
                <Text className="text-white text-4xl">👤</Text>
              </View>
              <Text className="text-white text-3xl font-bold mb-2">Profile</Text>
              <Text className="text-blue-100 text-base">Manage your account settings</Text>
            </View>
          </View>

          {/* User Info Card */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                <Text className="text-blue-600 text-xl">📧</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-800">Account Information</Text>
                <Text className="text-gray-500 text-sm">Your personal details</Text>
              </View>
            </View>

            <View className="space-y-4">
              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-sm font-medium text-gray-500 mb-2">Email Address</Text>
                <Text className="text-gray-800 text-base font-medium">{user?.email || 'Not available'}</Text>
              </View>

              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-sm font-medium text-gray-500 mb-2">User ID</Text>
                <Text className="text-gray-600 text-xs font-mono break-all">{user?.uid || 'Not available'}</Text>
              </View>

              <View className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Text className="text-sm font-medium text-gray-500 mb-2">Account Status</Text>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 bg-green-500 rounded-full mr-2"></View>
                  <Text className="text-green-700 font-semibold text-base">Active</Text>
                </View>
              </View>
            </View>
          </View>

          {/* App Info Card */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
                <Text className="text-purple-600 text-xl">⚙️</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-800">App Information</Text>
                <Text className="text-gray-500 text-sm">Application details</Text>
              </View>
            </View>

            <View className="space-y-4">
              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-sm font-medium text-gray-500 mb-2">App Name</Text>
                <Text className="text-gray-800 text-base font-medium">FuelWise</Text>
              </View>

              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-sm font-medium text-gray-500 mb-2">Version</Text>
                <Text className="text-gray-800 text-base font-medium">1.0.0</Text>
              </View>

              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-sm font-medium text-gray-500 mb-2">Platform</Text>
                <Text className="text-gray-800 text-base font-medium">React Native + Expo</Text>
              </View>
            </View>
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
              <Text className="text-gray-400 text-center text-sm mb-2">Made with ❤️ for fuel tracking</Text>
              <Text className="text-gray-300 text-center text-xs">FuelWise v1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen