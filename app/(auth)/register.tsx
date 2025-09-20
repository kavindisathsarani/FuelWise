// import { View, Text, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { register } from "@/services/authService";

// const Register = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [cPassword, setConfirmPassword] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleRegister = async() => {
//     //if(email)
//     //if(password)
//     //if(cPassword)
//     if(isLoading) return
//     if(password !== cPassword) {
//       Alert.alert("Error", "Passwords do not match")
//       return
//   }

//   setIsLoading(true)
//   await register(email, password)
//   .then((res) => {
//     // const res = await register(email, password)
//     // success
//     router.back()
//   })
//   .catch((err) => {
//     Alert.alert("Registration failed", "Something went wrong")
//     console.error(err)
//   })
//   .finally(() => {
//     setIsLoading(false)
//   })
// }

//   return (
//     <View className="flex-1 w-full justify-center items-center">
//       <Text className="text-4xl text-center">Register</Text>

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
//       />
//       <TextInput
//         placeholder="Confirm Password"
//         value={cPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
//       />
//       <TouchableOpacity
//         onPress={handleRegister}
//         className="bg-green-600 p-4 rounded mt-2"
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" size="large" />
//         ) : (
//           <Text className="text-center text-2xl text-white">Register</Text>
//         )}
//       </TouchableOpacity>

//       <Pressable className="px-6 py-3" onPress={() => router.back()}>
//         <Text className="text-4xl text-center">Go to Login</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default Register;

import { 
  View, 
  Text, 
  Pressable, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  StatusBar 
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (isLoading) return;
    
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    
    if (!password.trim()) {
      Alert.alert("Error", "Please enter a password");
      return;
    }
    
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }
    
    if (password !== cPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    await register(email, password)
      .then((res) => {
        Alert.alert("Success", "Account created successfully! Please log in.", [
          { text: "OK", onPress: () => router.back() }
        ]);
      })
      .catch((err) => {
        Alert.alert("Registration failed", "Something went wrong. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <View className="flex-1 justify-center px-6">
        {/* Logo/Brand Section */}
        <View className="items-center mb-8">
          <View className="bg-orange-500 rounded-full w-16 h-16 items-center justify-center mb-4 shadow-xl">
            <Text className="text-white text-3xl font-bold">⛽</Text>
          </View>
          <Text className="text-4xl font-bold text-white mb-2 tracking-wide">
            Join FuelWise
          </Text>
          <Text className="text-slate-300 text-center text-base font-medium">
            Start your smart fuel tracking journey
          </Text>
        </View>

        {/* Register Form */}
        <View className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl">
          <Text className="text-2xl font-bold text-center text-white mb-6">
            Create Account
          </Text>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-slate-300 font-semibold mb-2 ml-1">Email</Text>
            <View className="bg-slate-700 rounded-xl border-2 border-slate-600">
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="#94a3b8"
                className="px-4 py-3 text-white text-base rounded-xl"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-slate-300 font-semibold mb-2 ml-1">Password</Text>
            <View className="bg-slate-700 rounded-xl border-2 border-slate-600 flex-row items-center px-4">
              <TextInput
                placeholder="Create a password (min 6 characters)"
                placeholderTextColor="#94a3b8"
                className="flex-1 py-3 text-white text-base"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1 ml-2"
              >
                <Text className="text-slate-400 text-lg">
                  {showPassword ? "👁️" : "🙈"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-slate-300 font-semibold mb-2 ml-1">Confirm Password</Text>
            <View className="bg-slate-700 rounded-xl border-2 border-slate-600 flex-row items-center px-4">
              <TextInput
                placeholder="Confirm your password"
                placeholderTextColor="#94a3b8"
                className="flex-1 py-3 text-white text-base"
                value={cPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1 ml-2"
              >
                <Text className="text-slate-400 text-lg">
                  {showConfirmPassword ? "👁️" : "🙈"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-orange-500 rounded-xl py-4 mb-4 shadow-lg active:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">
                🚀 Create FuelWise Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="border-t-2 border-slate-700 pt-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-slate-300 text-center text-base">
                Already have an account?{" "}
                <Text className="text-orange-400 font-bold">
                  Sign In
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center mt-6">
          <Text className="text-slate-400 text-sm text-center">
            By creating an account, you agree to our terms
          </Text>
          <Text className="text-orange-400 text-sm font-bold text-center mt-1">
            🛡️ Your data is secure with us
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;