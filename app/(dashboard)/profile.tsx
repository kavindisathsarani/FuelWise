// import { useRouter } from 'expo-router'
// import React from 'react'
// import { Alert, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { useAuth } from '../../context/AuthContext'

// const ProfileScreen = () => {
//   const { user, logout } = useAuth()
//   const router = useRouter()

//   const handleLogout = () => {
//     console.log('=== HANDLE LOGOUT CALLED ===');
//     console.log('Logout button pressed');
//     console.log('Current user:', user);
//     console.log('Logout function available:', !!logout);
//     console.log('Platform:', Platform.OS);
    
//     // For web platform, use confirm instead of Alert
//     if (Platform.OS === 'web') {
//       console.log('Using web confirm dialog...');
//       const confirmed = window.confirm('Are you sure you want to logout?');
//       console.log('User confirmed:', confirmed);
      
//       if (confirmed) {
//         console.log('User confirmed logout, starting process...');
//         logout().then(() => {
//           console.log('Logout successful, navigating to login...');
//           router.replace('/login');
//         }).catch((error) => {
//           console.error('Logout error:', error);
//           alert(`Failed to logout: ${error.message || 'Unknown error'}`);
//         });
//       } else {
//         console.log('User cancelled logout');
//       }
//     } else {
//       // For mobile platforms, use Alert
//       try {
//         console.log('Showing alert dialog...');
//         Alert.alert(
//           'Logout',
//           'Are you sure you want to logout?',
//           [
//             { 
//               text: 'Cancel', 
//               style: 'cancel',
//               onPress: () => {
//                 console.log('User cancelled logout');
//               }
//             },
//             {
//               text: 'Logout',
//               style: 'destructive',
//               onPress: async () => {
//                 try {
//                   console.log('User confirmed logout, starting process...');
//                   await logout();
//                   console.log('Logout successful, navigating to login...');
//                   router.replace('/login');
//                 } catch (error) {
//                   console.error('Logout error:', error);
//                   Alert.alert('Error', `Failed to logout: ${error.message || 'Unknown error'}`);
//                 }
//               },
//             },
//           ]
//         );
//         console.log('Alert dialog shown successfully');
//       } catch (error) {
//         console.error('Error showing alert dialog:', error);
//       }
//     }
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <View className="p-6">
//           {/* Header with Gradient Background */}
//           <View className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 shadow-xl">
//             <View className="items-center">
//               <View className="w-28 h-28 bg-white/20 rounded-full items-center justify-center mb-4 shadow-lg">
//                 <Text className="text-white text-4xl">👤</Text>
//               </View>
//               <Text className="text-white text-3xl font-bold mb-2">Profile</Text>
//               <Text className="text-blue-100 text-base">Manage your account settings</Text>
//             </View>
//           </View>

//           {/* User Info Card */}
//           <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
//             <View className="flex-row items-center mb-6">
//               <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
//                 <Text className="text-blue-600 text-xl">📧</Text>
//               </View>
//               <View>
//                 <Text className="text-lg font-semibold text-gray-800">Account Information</Text>
//                 <Text className="text-gray-500 text-sm">Your personal details</Text>
//               </View>
//             </View>

//             <View className="space-y-4">
//               <View className="bg-gray-50 rounded-xl p-4">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">Email Address</Text>
//                 <Text className="text-gray-800 text-base font-medium">{user?.email || 'Not available'}</Text>
//               </View>

//               <View className="bg-gray-50 rounded-xl p-4">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">User ID</Text>
//                 <Text className="text-gray-600 text-xs font-mono break-all">{user?.uid || 'Not available'}</Text>
//               </View>

//               <View className="bg-green-50 rounded-xl p-4 border border-green-200">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">Account Status</Text>
//                 <View className="flex-row items-center">
//                   <View className="w-3 h-3 bg-green-500 rounded-full mr-2"></View>
//                   <Text className="text-green-700 font-semibold text-base">Active</Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* App Info Card */}
//           <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
//             <View className="flex-row items-center mb-6">
//               <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
//                 <Text className="text-purple-600 text-xl">⚙️</Text>
//               </View>
//               <View>
//                 <Text className="text-lg font-semibold text-gray-800">App Information</Text>
//                 <Text className="text-gray-500 text-sm">Application details</Text>
//               </View>
//             </View>

//             <View className="space-y-4">
//               <View className="bg-gray-50 rounded-xl p-4">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">App Name</Text>
//                 <Text className="text-gray-800 text-base font-medium">FuelWise</Text>
//               </View>

//               <View className="bg-gray-50 rounded-xl p-4">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">Version</Text>
//                 <Text className="text-gray-800 text-base font-medium">1.0.0</Text>
//               </View>

//               <View className="bg-gray-50 rounded-xl p-4">
//                 <Text className="text-sm font-medium text-gray-500 mb-2">Platform</Text>
//                 <Text className="text-gray-800 text-base font-medium">React Native + Expo</Text>
//               </View>
//             </View>
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
//               <Text className="text-gray-400 text-center text-sm mb-2">Made with ❤️ for fuel tracking</Text>
//               <Text className="text-gray-300 text-center text-xs">FuelWise v1.0.0</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default ProfileScreen

import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
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
                  Alert.alert('Error', `Failed to logout: ${(error as Error).message || 'Unknown error'}`);
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}>⛽</Text>
              </View>
              <Text style={styles.appName}>FuelWise Profile</Text>
              <Text style={styles.tagline}>Manage your account settings</Text>
            </View>
          </View>

          {/* User Info Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>📧</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Account Information</Text>
                <Text style={styles.cardSubtitle}>Your personal details</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{user?.email || 'Not available'}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValueMono}>{user?.uid || 'Not available'}</Text>
              </View>

              <View style={styles.statusItem}>
                <Text style={styles.infoLabel}>Account Status</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusIndicator} />
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Fuel Stats Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                <Text style={[styles.iconText, { color: '#2563eb' }]}>📊</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Fuel Statistics</Text>
                <Text style={styles.cardSubtitle}>Your tracking summary</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.infoLabel}>Total Fill-ups</Text>
                <Text style={styles.statValue}>24</Text>
              </View>

              <View style={[styles.statItem, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
                <Text style={styles.infoLabel}>Money Saved</Text>
                <Text style={[styles.statValue, { color: '#15803d' }]}>$127.50</Text>
              </View>

              <View style={[styles.statItem, { backgroundColor: '#fdf4ff', borderColor: '#e9d5ff' }]}>
                <Text style={styles.infoLabel}>Average MPG</Text>
                <Text style={[styles.statValue, { color: '#9333ea' }]}>28.4</Text>
              </View>
            </View>
          </View>

          {/* App Info Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#f3e8ff' }]}>
                <Text style={[styles.iconText, { color: '#7c3aed' }]}>⚙️</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>App Information</Text>
                <Text style={styles.cardSubtitle}>Application details</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>App Name</Text>
                <Text style={styles.infoValue}>FuelWise</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Version</Text>
                <Text style={styles.infoValue}>1.0.0</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Platform</Text>
                <Text style={styles.infoValue}>React Native + Expo</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonEmoji}>🚪</Text>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerCard}>
              <Text style={styles.footerText}>Made with ❤️ for fuel tracking</Text>
              <Text style={styles.versionText}>FuelWise v1.0.0</Text>
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
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    backgroundColor: '#ea580c',
    borderRadius: 24,
    padding: 32,
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 112,
    height: 112,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 40,
    color: '#ffffff',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#fed7aa',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#fed7aa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
    color: '#ea580c',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoContainer: {
    gap: 16,
  },
  infoItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  infoValueMono: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6b7280',
    flexWrap: 'wrap',
  },
  statusItem: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803d',
  },
  statsContainer: {
    gap: 16,
  },
  statItem: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEmoji: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#d1d5db',
    textAlign: 'center',
  },
});

export default ProfileScreen