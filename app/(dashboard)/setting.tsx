// import { useRouter } from 'expo-router'
// import React, { useState } from 'react'
// import {
//     Alert,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     Switch,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native'

// const SettingScreen = () => {
//   const router = useRouter()
  
//   // Settings state
//   const [notifications, setNotifications] = useState(true)
//   const [darkMode, setDarkMode] = useState(false)
//   const [autoSync, setAutoSync] = useState(true)
//   const [fuelReminders, setFuelReminders] = useState(false)

//   const handleLogout = () => {
//     if (Platform.OS === 'web') {
//       const confirmed = window.confirm('Are you sure you want to logout?')
//       if (confirmed) {
//         // This will be handled by the logout function in AuthContext
//         router.replace('/login')
//       }
//     } else {
//       Alert.alert(
//         'Logout',
//         'Are you sure you want to logout?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Logout',
//             style: 'destructive',
//             onPress: () => router.replace('/login'),
//           },
//         ]
//       )
//     }
//   }

//   const handleClearData = () => {
//     if (Platform.OS === 'web') {
//       const confirmed = window.confirm('Are you sure you want to clear all fuel data? This action cannot be undone.')
//       if (confirmed) {
//         // TODO: Implement clear data functionality
//         alert('Data cleared successfully!')
//       }
//     } else {
//       Alert.alert(
//         'Clear Data',
//         'Are you sure you want to clear all fuel data? This action cannot be undone.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Clear',
//             style: 'destructive',
//             onPress: () => {
//               // TODO: Implement clear data functionality
//               Alert.alert('Success', 'Data cleared successfully!')
//             },
//           },
//         ]
//       )
//     }
//   }

//   const handleExportData = () => {
//     // TODO: Implement data export functionality
//     if (Platform.OS === 'web') {
//       alert('Data export feature coming soon!')
//     } else {
//       Alert.alert('Info', 'Data export feature coming soon!')
//     }
//   }

//   const SettingItem = ({ 
//     icon, 
//     title, 
//     subtitle, 
//     onPress, 
//     rightComponent, 
//     isLast = false 
//   }: {
//     icon: string
//     title: string
//     subtitle?: string
//     onPress?: () => void
//     rightComponent?: React.ReactNode
//     isLast?: boolean
//   }) => (
//     <TouchableOpacity
//       onPress={onPress}
//       className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 ${
//         isLast ? 'mb-0' : ''
//       }`}
//       disabled={!onPress}
//     >
//       <View className="flex-row items-center">
//         <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
//           <Text className="text-blue-600 text-xl">{icon}</Text>
//         </View>
//         <View className="flex-1">
//           <Text className="text-gray-800 text-base font-semibold">{title}</Text>
//           {subtitle && (
//             <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
//           )}
//         </View>
//         {rightComponent || (
//           <Text className="text-gray-400 text-2xl">›</Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <SafeAreaView className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <View className="p-6">
//           {/* Header with Gradient Background */}
//           <View className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 mb-8 shadow-xl">
//             <View className="items-center">
//               <View className="w-28 h-28 bg-white/20 rounded-full items-center justify-center mb-4 shadow-lg">
//                 <Text className="text-white text-4xl">⚙️</Text>
//               </View>
//               <Text className="text-white text-3xl font-bold mb-2">Settings</Text>
//               <Text className="text-purple-100 text-base">Customize your FuelWise experience</Text>
//             </View>
//           </View>

//           {/* Account Settings */}
//           <View className="mb-8">
//             <Text className="text-gray-800 text-xl font-bold mb-4">Account</Text>
            
//             <SettingItem
//               icon="👤"
//               title="Profile"
//               subtitle="Manage your account information"
//               onPress={() => router.push('/profile')}
//             />
            
//             <SettingItem
//               icon="🔒"
//               title="Privacy & Security"
//               subtitle="Control your data and privacy"
//               onPress={() => {
//                 if (Platform.OS === 'web') {
//                   alert('Privacy settings coming soon!')
//                 } else {
//                   Alert.alert('Info', 'Privacy settings coming soon!')
//                 }
//               }}
//             />
//           </View>

//           {/* App Preferences */}
//           <View className="mb-8">
//             <Text className="text-gray-800 text-xl font-bold mb-4">Preferences</Text>
            
//             <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center flex-1">
//                   <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-4">
//                     <Text className="text-green-600 text-xl">🔔</Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text className="text-gray-800 text-base font-semibold">Notifications</Text>
//                     <Text className="text-gray-500 text-sm mt-1">Get notified about fuel reminders</Text>
//                   </View>
//                 </View>
//                 <Switch
//                   value={notifications}
//                   onValueChange={setNotifications}
//                   trackColor={{ false: '#f3f4f6', true: '#10b981' }}
//                   thumbColor={notifications ? '#ffffff' : '#9ca3af'}
//                 />
//               </View>
//             </View>

//             <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center flex-1">
//                   <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
//                     <Text className="text-gray-600 text-xl">🌙</Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text className="text-gray-800 text-base font-semibold">Dark Mode</Text>
//                     <Text className="text-gray-500 text-sm mt-1">Switch to dark theme</Text>
//                   </View>
//                 </View>
//                 <Switch
//                   value={darkMode}
//                   onValueChange={setDarkMode}
//                   trackColor={{ false: '#f3f4f6', true: '#6366f1' }}
//                   thumbColor={darkMode ? '#ffffff' : '#9ca3af'}
//                 />
//               </View>
//             </View>

//             <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center flex-1">
//                   <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
//                     <Text className="text-blue-600 text-xl">🔄</Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text className="text-gray-800 text-base font-semibold">Auto Sync</Text>
//                     <Text className="text-gray-500 text-sm mt-1">Automatically sync data</Text>
//                   </View>
//                 </View>
//                 <Switch
//                   value={autoSync}
//                   onValueChange={setAutoSync}
//                   trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
//                   thumbColor={autoSync ? '#ffffff' : '#9ca3af'}
//                 />
//               </View>
//             </View>

//             <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
//               <View className="flex-row items-center justify-between">
//                 <View className="flex-row items-center flex-1">
//                   <View className="w-12 h-12 bg-orange-100 rounded-xl items-center justify-center mr-4">
//                     <Text className="text-orange-600 text-xl">⛽</Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text className="text-gray-800 text-base font-semibold">Fuel Reminders</Text>
//                     <Text className="text-gray-500 text-sm mt-1">Get reminded to log fuel entries</Text>
//                   </View>
//                 </View>
//                 <Switch
//                   value={fuelReminders}
//                   onValueChange={setFuelReminders}
//                   trackColor={{ false: '#f3f4f6', true: '#f59e0b' }}
//                   thumbColor={fuelReminders ? '#ffffff' : '#9ca3af'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Data Management */}
//           <View className="mb-8">
//             <Text className="text-gray-800 text-xl font-bold mb-4">Data Management</Text>
            
//             <SettingItem
//               icon="📊"
//               title="Export Data"
//               subtitle="Download your fuel data as CSV"
//               onPress={handleExportData}
//             />
            
//             <SettingItem
//               icon="🗑️"
//               title="Clear All Data"
//               subtitle="Remove all fuel entries permanently"
//               onPress={handleClearData}
//             />
//           </View>

//           {/* App Information */}
//           <View className="mb-8">
//             <Text className="text-gray-800 text-xl font-bold mb-4">About</Text>
            
//             <SettingItem
//               icon="ℹ️"
//               title="App Version"
//               subtitle="FuelWise v1.0.0"
//               isLast
//             />
            
//             <SettingItem
//               icon="📱"
//               title="Platform"
//               subtitle="React Native + Expo"
//               isLast
//             />
            
//             <SettingItem
//               icon="🔧"
//               title="Developer"
//               subtitle="Built with ❤️ for fuel tracking"
//               isLast
//             />
//           </View>

//           {/* Logout Button */}
//           <TouchableOpacity
//             onPress={handleLogout}
//             className="bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl mb-8 shadow-lg active:scale-95 transition-transform"
//           >
//             <View className="flex-row items-center justify-center">
//               <Text className="text-white text-lg font-semibold mr-2">🚪</Text>
//               <Text className="text-white text-lg font-semibold">Logout</Text>
//             </View>
//           </TouchableOpacity>

//           {/* Footer */}
//           <View className="items-center py-4">
//             <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//               <Text className="text-gray-400 text-center text-sm mb-2">
//                 Made with ❤️ for fuel tracking
//               </Text>
//               <Text className="text-gray-300 text-center text-xs">
//                 FuelWise - Smart Fuel Management
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default SettingScreen

import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

interface SettingItemProps {
  icon: string
  title: string
  subtitle?: string
  onPress?: () => void
  rightComponent?: React.ReactNode
  isLast?: boolean
}

const SettingScreen = () => {
  const router = useRouter()
  
  // Settings state
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [fuelReminders, setFuelReminders] = useState(false)

  const handleLogout = (): void => {
    try {
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Are you sure you want to logout?')
        if (confirmed) {
          console.log('User confirmed logout, navigating to login...')
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
              onPress: () => {
                try {
                  console.log('User confirmed logout, navigating to login...')
                  router.replace('/login')
                } catch (error) {
                  console.error('Logout navigation error:', error)
                  const errorMessage = error instanceof Error ? error.message : 'Navigation failed'
                  Alert.alert('Error', `Failed to logout: ${errorMessage}`)
                }
              },
            },
          ]
        )
      }
    } catch (error) {
      console.error('Error in handleLogout:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      if (Platform.OS === 'web') {
        alert(`Logout error: ${errorMessage}`)
      } else {
        Alert.alert('Error', `Logout error: ${errorMessage}`)
      }
    }
  }

  const handleClearData = (): void => {
    try {
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
                try {
                  // TODO: Implement clear data functionality
                  Alert.alert('Success', 'Data cleared successfully!')
                } catch (error) {
                  console.error('Clear data error:', error)
                  const errorMessage = error instanceof Error ? error.message : 'Failed to clear data'
                  Alert.alert('Error', errorMessage)
                }
              },
            },
          ]
        )
      }
    } catch (error) {
      console.error('Error in handleClearData:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      if (Platform.OS === 'web') {
        alert(`Error: ${errorMessage}`)
      } else {
        Alert.alert('Error', errorMessage)
      }
    }
  }

  const handleExportData = (): void => {
    try {
      // TODO: Implement data export functionality
      if (Platform.OS === 'web') {
        alert('Data export feature coming soon!')
      } else {
        Alert.alert('Info', 'Data export feature coming soon!')
      }
    } catch (error) {
      console.error('Export data error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Export failed'
      if (Platform.OS === 'web') {
        alert(`Export error: ${errorMessage}`)
      } else {
        Alert.alert('Error', `Export error: ${errorMessage}`)
      }
    }
  }

  const handlePrivacySettings = (): void => {
    try {
      if (Platform.OS === 'web') {
        alert('Privacy settings coming soon!')
      } else {
        Alert.alert('Info', 'Privacy settings coming soon!')
      }
    } catch (error) {
      console.error('Privacy settings error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      if (Platform.OS === 'web') {
        alert(`Error: ${errorMessage}`)
      } else {
        Alert.alert('Error', errorMessage)
      }
    }
  }

  const handleProfileNavigation = (): void => {
    try {
      router.push('/profile')
    } catch (error) {
      console.error('Profile navigation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Navigation failed'
      if (Platform.OS === 'web') {
        alert(`Navigation error: ${errorMessage}`)
      } else {
        Alert.alert('Error', `Navigation error: ${errorMessage}`)
      }
    }
  }

  const SettingItem: React.FC<SettingItemProps> = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent, 
    isLast = false 
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.settingItem, isLast && styles.lastItem]}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitleText}>{subtitle}</Text>
          )}
        </View>
        {rightComponent || (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <Text style={styles.headerIconText}>⚙️</Text>
              </View>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Customize your FuelWise experience</Text>
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <SettingItem
              icon="👤"
              title="Profile"
              subtitle="Manage your account information"
              onPress={handleProfileNavigation}
            />
            
            <SettingItem
              icon="🔒"
              title="Privacy & Security"
              subtitle="Control your data and privacy"
              onPress={handlePrivacySettings}
            />
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#dcfce7' }]}>
                    <Text style={[styles.iconText, { color: '#16a34a' }]}>🔔</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Notifications</Text>
                    <Text style={styles.subtitleText}>Get notified about fuel reminders</Text>
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

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#f3f4f6' }]}>
                    <Text style={[styles.iconText, { color: '#4b5563' }]}>🌙</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Dark Mode</Text>
                    <Text style={styles.subtitleText}>Switch to dark theme</Text>
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

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                    <Text style={[styles.iconText, { color: '#2563eb' }]}>🔄</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Auto Sync</Text>
                    <Text style={styles.subtitleText}>Automatically sync data</Text>
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

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceContent}>
                <View style={styles.preferenceLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#fed7aa' }]}>
                    <Text style={[styles.iconText, { color: '#ea580c' }]}>⛽</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Fuel Reminders</Text>
                    <Text style={styles.subtitleText}>Get reminded to log fuel entries</Text>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>
            
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            
            <SettingItem
              icon="ℹ️"
              title="App Version"
              subtitle="FuelWise v1.0.0"
            />
            
            <SettingItem
              icon="📱"
              title="Platform"
              subtitle="React Native + Expo"
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
            style={styles.logoutButton}
            activeOpacity={0.8}
          >
            <View style={styles.logoutButtonContent}>
              <Text style={styles.logoutButtonIcon}>🚪</Text>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>
                Made with ❤️ for fuel tracking
              </Text>
              <Text style={styles.footerSubtext}>
                FuelWise - Smart Fuel Management
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    backgroundColor: '#8b5cf6',
    borderRadius: 24,
    padding: 32,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    width: 112,
    height: 112,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerIconText: {
    fontSize: 36,
    color: '#ffffff',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#ddd6fe',
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#1f2937',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  lastItem: {
    marginBottom: 0,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
    color: '#2563eb',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitleText: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 4,
  },
  chevron: {
    color: '#9ca3af',
    fontSize: 24,
  },
  preferenceItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  preferenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  footerText: {
    color: '#9ca3af',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 8,
  },
  footerSubtext: {
    color: '#d1d5db',
    textAlign: 'center',
    fontSize: 12,
  },
})

export default SettingScreen