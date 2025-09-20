// // import { View, Text } from 'react-native'
// // import React from 'react'

// // const HomeScreen = () => {
// //   return (
// //     <View className="flex-1 w-full justify-center align-items-center">
// //       <Text className="text-center text-4xl">HomeScreen</Text>
// //     </View>
// //   )
// // }

// // export default HomeScreen

// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Alert, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
// import { useAuth } from '../../context/AuthContext';

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user, logout } = useAuth();
  
//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await logout();
//               router.replace('/login');
//             } catch (error) {
//               console.error('Logout error:', error);
//               Alert.alert('Error', 'Failed to logout. Please try again.');
//             }
//           },
//         },
//       ]
//     );
//   };
  
//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Hero Header with Gradient Effect */}
//         <View className="bg-blue-600 px-6 pt-12 pb-20 relative overflow-hidden">
//           {/* Decorative Circles */}
//           <View className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 -mr-20 -mt-10" />
//           <View className="absolute top-20 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-15" />
//           <View className="absolute bottom-0 left-0 w-32 h-32 bg-blue-700 rounded-full opacity-25 -ml-16 -mb-8" />
          
//           {/* Header Content */}
//           <View className="flex-row justify-between items-start mb-8">
//             <View className="flex-1">
//               <Text className="text-blue-100 text-base">Good Morning</Text>
//               <Text className="text-white text-3xl font-bold mt-1">FuelWise</Text>
//               <Text className="text-blue-100 text-sm mt-1">Smart fuel tracking made simple</Text>
//             </View>
//             <View className="flex-row space-x-2">
//               <View className="bg-white/10 rounded-full px-4 py-2">
//                 <Text className="text-white text-sm font-medium">🗓️ Today</Text>
//               </View>
//               {__DEV__ && (
//                 <TouchableOpacity
//                   onPress={handleLogout}
//                   className="bg-red-500/20 rounded-full px-4 py-2"
//                 >
//                   <Text className="text-white text-sm font-medium">🚪 Logout</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {/* Main CTA Button */}
//           <TouchableOpacity 
//             className="bg-white rounded-2xl px-6 py-5 shadow-xl"
//             onPress={() => router.push('/fuelwise')}
//           >
//             <View className="flex-row items-center justify-center">
//               <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
//                 <Text className="text-blue-600 text-2xl">⛽</Text>
//               </View>
//               <View>
//                 <Text className="text-gray-800 text-xl font-bold">Add Fuel Entry</Text>
//                 <Text className="text-gray-500 text-sm">Track your fuel usage</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Stats Cards - Overlapping Header */}
//         <View className="px-4 -mt-16 mb-8">
//           <View className="flex-row space-x-3 mb-4">
//             <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
//               <View className="flex-row items-center justify-between mb-2">
//                 <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Fuel</Text>
//                 <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center">
//                   <Text className="text-green-600 text-sm">🚗</Text>
//                 </View>
//               </View>
//               <Text className="text-gray-900 text-2xl font-bold">247.5</Text>
//               <Text className="text-gray-400 text-sm">Liters</Text>
//             </View>
            
//             <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
//               <View className="flex-row items-center justify-between mb-2">
//                 <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">This Month</Text>
//                 <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
//                   <Text className="text-blue-600 text-sm">💰</Text>
//                 </View>
//               </View>
//               <Text className="text-gray-900 text-2xl font-bold">$124</Text>
//               <Text className="text-gray-400 text-sm">Spent</Text>
//             </View>
//           </View>

//           <View className="flex-row space-x-3">
//             <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
//               <View className="flex-row items-center justify-between mb-2">
//                 <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Efficiency</Text>
//                 <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center">
//                   <Text className="text-purple-600 text-sm">⚡</Text>
//                 </View>
//               </View>
//               <Text className="text-gray-900 text-2xl font-bold">12.5</Text>
//               <Text className="text-gray-400 text-sm">km/L</Text>
//             </View>
            
//             <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm">
//               <View className="flex-row items-center justify-between mb-2">
//                 <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Last Fill</Text>
//                 <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center">
//                   <Text className="text-orange-600 text-sm">📅</Text>
//                 </View>
//               </View>
//               <Text className="text-gray-900 text-2xl font-bold">3</Text>
//               <Text className="text-gray-400 text-sm">Days ago</Text>
//             </View>
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <View className="px-4 mb-8">
//           <Text className="text-gray-800 text-xl font-bold mb-4">Quick Actions</Text>
//           <View className="flex-row space-x-4">
//             <TouchableOpacity 
//               className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6"
//               onPress={() => router.push('/fuelwise')}
//             >
//               <View className="items-center">
//                 <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center mb-3">
//                   <Text className="text-white text-2xl">📊</Text>
//                 </View>
//                 <Text className="text-white font-bold text-base">View Reports</Text>
//                 <Text className="text-blue-100 text-xs mt-1">Analytics & insights</Text>
//               </View>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               className="flex-1 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6"
//               onPress={() => router.push('/fuelwise')}
//             >
//               <View className="items-center">
//                 <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center mb-3">
//                   <Text className="text-white text-2xl">📋</Text>
//                 </View>
//                 <Text className="text-white font-bold text-base">All Entries</Text>
//                 <Text className="text-green-100 text-xs mt-1">Fuel history</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Recent Activity */}
//         <View className="px-4 mb-8">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-gray-800 text-xl font-bold">Recent Activity</Text>
//             <TouchableOpacity>
//               <Text className="text-blue-600 font-semibold">See All</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Activity Items */}
//           <View className="space-y-3">
//             <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
//               <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
//                 <Text className="text-blue-600 text-lg">⛽</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="text-gray-800 font-semibold">Petrol Fill-up</Text>
//                 <Text className="text-gray-500 text-sm">45.5L • $67.80 • Yesterday</Text>
//               </View>
//               <View className="bg-green-100 px-3 py-1 rounded-full">
//                 <Text className="text-green-700 text-xs font-semibold">PETROL</Text>
//               </View>
//             </View>

//             <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
//               <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
//                 <Text className="text-green-600 text-lg">⛽</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="text-gray-800 font-semibold">Diesel Fill-up</Text>
//                 <Text className="text-gray-500 text-sm">52.2L • $71.20 • 3 days ago</Text>
//               </View>
//               <View className="bg-blue-100 px-3 py-1 rounded-full">
//                 <Text className="text-blue-700 text-xs font-semibold">DIESEL</Text>
//               </View>
//             </View>

//             <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
//               <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
//                 <Text className="text-purple-600 text-lg">📊</Text>
//               </View>
//               <View className="flex-1">
//                 <Text className="text-gray-800 font-semibold">Monthly Report</Text>
//                 <Text className="text-gray-500 text-sm">Efficiency improved by 8%</Text>
//               </View>
//               <View className="bg-purple-100 px-3 py-1 rounded-full">
//                 <Text className="text-purple-700 text-xs font-semibold">REPORT</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Fuel Tips Card */}
//         <View className="px-4 mb-8">
//           <View className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 relative overflow-hidden">
//             {/* Decorative Elements */}
//             <View className="absolute top-0 right-0 w-24 h-24 bg-orange-300 rounded-full opacity-30 -mr-12 -mt-12" />
//             <View className="absolute bottom-0 left-0 w-16 h-16 bg-orange-600 rounded-full opacity-30 -ml-8 -mb-8" />
            
//             <View className="flex-row items-center mb-3">
//               <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
//                 <Text className="text-white text-lg">💡</Text>
//               </View>
//               <Text className="text-white font-bold text-lg">Fuel Saving Tip</Text>
//             </View>
//             <Text className="text-orange-100 text-base leading-relaxed">
//               Maintain steady speeds and avoid rapid acceleration to improve your fuel efficiency by up to 15%!
//             </Text>
//           </View>
//         </View>

//         {/* Bottom Navigation Hint */}
//         <View className="px-4 mb-6">
//           <View className="bg-white rounded-2xl p-4 shadow-sm border-2 border-dashed border-gray-200">
//             <Text className="text-gray-600 text-center font-medium">
//               🚀 Ready to start tracking? Tap &quot;Add Fuel Entry&quot; above!
//             </Text>
//           </View>
//         </View>

//         {/* Bottom Spacing */}
//         <View className="h-8" />
//       </ScrollView>
//     </View>
//   )
// }

// export default HomeScreen

import { useRouter } from 'expo-router';
import React from 'react';
import { 
  Alert, 
  Platform,
  ScrollView, 
  StatusBar, 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const handleLogout = (): void => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              const errorMessage = error instanceof Error ? error.message : 'Failed to logout'
              Alert.alert('Error', `Logout failed: ${errorMessage}`);
            }
          },
        },
      ]
    );
  };

  const handleAddFuel = (): void => {
    try {
      router.push('/fuelwise');
    } catch (error) {
      console.error('Navigation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Navigation failed'
      Alert.alert('Error', `Navigation failed: ${errorMessage}`);
    }
  };

  const handleViewReports = (): void => {
    try {
      router.push('/fuelwise');
    } catch (error) {
      console.error('Navigation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Navigation failed'
      Alert.alert('Error', `Navigation failed: ${errorMessage}`);
    }
  };

  const handleViewEntries = (): void => {
    try {
      router.push('/fuelwise');
    } catch (error) {
      console.error('Navigation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Navigation failed'
      Alert.alert('Error', `Navigation failed: ${errorMessage}`);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Header */}
        <View style={styles.header}>
          {/* Decorative Circles */}
          <View style={[styles.decorativeCircle, styles.circleTopRight]} />
          <View style={[styles.decorativeCircle, styles.circleTopRightSmall]} />
          <View style={[styles.decorativeCircle, styles.circleBottomLeft]} />
          
          {/* Header Content */}
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.appTitle}>FuelWise</Text>
              <Text style={styles.subtitle}>Smart fuel tracking made simple</Text>
            </View>
            <View style={styles.headerButtons}>
              <View style={styles.todayBadge}>
                <Text style={styles.badgeText}>🗓️ Today</Text>
              </View>
              {__DEV__ && (
                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.logoutBadge}
                  activeOpacity={0.7}
                >
                  <Text style={styles.badgeText}>🚪 Logout</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Main CTA Button */}
          <TouchableOpacity 
            style={styles.mainCTA}
            onPress={handleAddFuel}
            activeOpacity={0.8}
          >
            <View style={styles.ctaContent}>
              <View style={styles.ctaIcon}>
                <Text style={styles.ctaIconText}>⛽</Text>
              </View>
              <View>
                <Text style={styles.ctaTitle}>Add Fuel Entry</Text>
                <Text style={styles.ctaSubtitle}>Track your fuel usage</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards - Overlapping Header */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>TOTAL FUEL</Text>
                <View style={[styles.statIconContainer, { backgroundColor: '#dcfce7' }]}>
                  <Text style={styles.statIcon}>🚗</Text>
                </View>
              </View>
              <Text style={styles.statValue}>247.5</Text>
              <Text style={styles.statUnit}>Liters</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>THIS MONTH</Text>
                <View style={[styles.statIconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Text style={styles.statIcon}>💰</Text>
                </View>
              </View>
              <Text style={styles.statValue}>$124</Text>
              <Text style={styles.statUnit}>Spent</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>EFFICIENCY</Text>
                <View style={[styles.statIconContainer, { backgroundColor: '#f3e8ff' }]}>
                  <Text style={styles.statIcon}>⚡</Text>
                </View>
              </View>
              <Text style={styles.statValue}>12.5</Text>
              <Text style={styles.statUnit}>km/L</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>LAST FILL</Text>
                <View style={[styles.statIconContainer, { backgroundColor: '#fed7aa' }]}>
                  <Text style={styles.statIcon}>📅</Text>
                </View>
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statUnit}>Days ago</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#3b82f6' }]}
              onPress={handleViewReports}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionContent}>
                <View style={styles.quickActionIcon}>
                  <Text style={styles.quickActionIconText}>📊</Text>
                </View>
                <Text style={styles.quickActionTitle}>View Reports</Text>
                <Text style={styles.quickActionSubtitle}>Analytics & insights</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#10b981' }]}
              onPress={handleViewEntries}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionContent}>
                <View style={styles.quickActionIcon}>
                  <Text style={styles.quickActionIconText}>📋</Text>
                </View>
                <Text style={styles.quickActionTitle}>All Entries</Text>
                <Text style={styles.quickActionSubtitle}>Fuel history</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Items */}
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.activityIconText}>⛽</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Petrol Fill-up</Text>
                <Text style={styles.activitySubtitle}>45.5L • $67.80 • Yesterday</Text>
              </View>
              <View style={[styles.activityBadge, { backgroundColor: '#dcfce7' }]}>
                <Text style={[styles.activityBadgeText, { color: '#16a34a' }]}>PETROL</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#dcfce7' }]}>
                <Text style={styles.activityIconText}>⛽</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Diesel Fill-up</Text>
                <Text style={styles.activitySubtitle}>52.2L • $71.20 • 3 days ago</Text>
              </View>
              <View style={[styles.activityBadge, { backgroundColor: '#dbeafe' }]}>
                <Text style={[styles.activityBadgeText, { color: '#2563eb' }]}>DIESEL</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#f3e8ff' }]}>
                <Text style={styles.activityIconText}>📊</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Monthly Report</Text>
                <Text style={styles.activitySubtitle}>Efficiency improved by 8%</Text>
              </View>
              <View style={[styles.activityBadge, { backgroundColor: '#f3e8ff' }]}>
                <Text style={[styles.activityBadgeText, { color: '#7c3aed' }]}>REPORT</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Fuel Tips Card */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            {/* Decorative Elements */}
            <View style={[styles.tipDecorative, styles.tipCircleTopRight]} />
            <View style={[styles.tipDecorative, styles.tipCircleBottomLeft]} />
            
            <View style={styles.tipHeader}>
              <View style={styles.tipIcon}>
                <Text style={styles.tipIconText}>💡</Text>
              </View>
              <Text style={styles.tipTitle}>Fuel Saving Tip</Text>
            </View>
            <Text style={styles.tipText}>
              Maintain steady speeds and avoid rapid acceleration to improve your fuel efficiency by up to 15%!
            </Text>
          </View>
        </View>

        {/* Bottom Navigation Hint */}
        <View style={styles.section}>
          <View style={styles.bottomHint}>
            <Text style={styles.bottomHintText}>
              🚀 Ready to start tracking? Tap "Add Fuel Entry" above!
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
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
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
  },
  circleTopRight: {
    width: 160,
    height: 160,
    backgroundColor: '#3b82f6',
    top: -40,
    right: -80,
  },
  circleTopRightSmall: {
    width: 96,
    height: 96,
    backgroundColor: '#60a5fa',
    top: 80,
    right: 40,
    opacity: 0.15,
  },
  circleBottomLeft: {
    width: 128,
    height: 128,
    backgroundColor: '#1d4ed8',
    bottom: -32,
    left: -64,
    opacity: 0.25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    color: '#bfdbfe',
    fontSize: 16,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  subtitle: {
    color: '#bfdbfe',
    fontSize: 14,
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  todayBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  mainCTA: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  ctaIconText: {
    fontSize: 24,
    color: '#2563eb',
  },
  ctaTitle: {
    color: '#1f2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ctaSubtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginTop: -64,
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 14,
  },
  statValue: {
    color: '#1f2937',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statUnit: {
    color: '#9ca3af',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#1f2937',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    color: '#2563eb',
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
  },
  quickActionContent: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    color: '#ffffff',
    fontSize: 24,
  },
  quickActionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityIconText: {
    fontSize: 18,
    color: '#2563eb',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#1f2937',
    fontWeight: '600',
  },
  activitySubtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  activityBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  activityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#f59e0b',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  tipDecorative: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.3,
  },
  tipCircleTopRight: {
    width: 96,
    height: 96,
    backgroundColor: '#fbbf24',
    top: -48,
    right: -48,
  },
  tipCircleBottomLeft: {
    width: 64,
    height: 64,
    backgroundColor: '#d97706',
    bottom: -32,
    left: -32,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipIconText: {
    color: '#ffffff',
    fontSize: 18,
  },
  tipTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tipText: {
    color: '#fef3c7',
    fontSize: 16,
    lineHeight: 24,
  },
  bottomHint: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
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
  bottomHintText: {
    color: '#4b5563',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 32,
  },
})

export default HomeScreen

