// import { login } from "@/services/authService";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     await login(email, password)
//       .then((res) => {
//         router.push("/home");
//         Alert.alert("Login successful", "Welcome back!");
//       })
//       .catch(() => {
//         Alert.alert("Login failed", "Invalid email or password.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <View className="flex-1 bg-gray-50 justify-center px-4">
//       <View className="bg-white rounded-xl shadow-md p-6 max-w-lg w-full mx-auto">
//         <Text className="text-2xl font-semibold text-center text-gray-900 mb-6">
//           Login
//         </Text>

//         <TextInput
//           placeholder="Email"
//           className="border border-gray-200 bg-gray-100 rounded-md p-3 mb-4 text-base"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//         <TextInput
//           placeholder="Password"
//           className="border border-gray-200 bg-gray-100 rounded-md p-3 mb-6 text-base"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TouchableOpacity
//           onPress={handleLogin}
//           className="bg-indigo-600 p-3 rounded-md"
//         >
//           {isLoading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text className="text-white text-center font-medium">Login</Text>
//           )}
//         </TouchableOpacity>
//         <Pressable className="mt-4" onPress={() => router.push("/register")}>
//           <Text className="text-indigo-600 text-center font-medium">
//             Do not have an account? Register
//           </Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default Login;

import { login } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await login(email, password)
      .then((res) => {
        router.push("/home");
        Alert.alert("Login successful", "Welcome back to FuelWise!");
      })
      .catch(() => {
        Alert.alert("Login failed", "Invalid email or password.");
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
        <View className="items-center mb-10">
          <View className="bg-orange-500 rounded-full w-20 h-20 items-center justify-center mb-6 shadow-xl">
            <Text className="text-white text-4xl font-bold">⛽</Text>
          </View>
          <Text className="text-5xl font-bold text-white mb-3 tracking-wide">
            FuelWise
          </Text>
          <Text className="text-slate-300 text-center text-lg font-medium">
            Smart fuel tracking for the modern driver
          </Text>
        </View>

        {/* Login Form */}
        <View className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl">
          <Text className="text-3xl font-bold text-center text-white mb-8">
            Welcome Back
          </Text>

          {/* Email Input */}
          <View className="mb-5">
            <Text className="text-slate-300 font-semibold mb-2 ml-1">Email</Text>
            <View className="bg-slate-700 rounded-2xl border-2 border-slate-600 focus:border-orange-400">
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="#94a3b8"
                className="px-4 py-4 text-white text-lg rounded-2xl"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-slate-300 font-semibold mb-2 ml-1">Password</Text>
            <View className="bg-slate-700 rounded-2xl border-2 border-slate-600 flex-row items-center px-4 py-1">
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                className="flex-1 py-3 text-white text-lg"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-2 ml-2"
              >
                <Text className="text-slate-400 text-xl">
                  {showPassword ? "👁️" : "🙈"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-orange-500 rounded-2xl py-5 mb-6 shadow-lg active:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold text-xl">
                🚗 Sign In to FuelWise
              </Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password */}
          <Pressable className="mb-6">
            <Text className="text-orange-300 text-center font-semibold text-lg">
              Forgot your password?
            </Text>
          </Pressable>

          {/* Register Link */}
          <View className="border-t-2 border-slate-700 pt-6">
            <Pressable onPress={() => router.push("/register")}>
              <Text className="text-slate-300 text-center text-lg">
                New to FuelWise?{" "}
                <Text className="text-orange-400 font-bold">
                  Create Account
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-orange-400 text-lg font-bold text-center mb-2">
            🎯 Track • 📊 Analyze • 💰 Save
          </Text>
          <Text className="text-slate-400 text-base text-center">
            Your intelligent fuel companion
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;