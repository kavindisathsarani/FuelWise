import { View, Text, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async() => {
    //if(email)
    //if(password)
    //if(cPassword)
    if(isLoading) return
    if(password !== cPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
  }

  setIsLoading(true)
  await register(email, password)
  .then((res) => {
    // const res = await register(email, password)
    // success
    router.back()
  })
  .catch((err) => {
    Alert.alert("Registration failed", "Something went wrong")
    console.error(err)
  })
  .finally(() => {
    setIsLoading(false)
  })
}

  return (
    <View className="flex-1 w-full justify-center items-center">
      <Text className="text-4xl text-center">Register</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Confirm Password"
        value={cPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="bg-surface border border-gray-300 rounded px-4 py-3 mb-4 text-gray-800"
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-600 p-4 rounded mt-2"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-2xl text-white">Register</Text>
        )}
      </TouchableOpacity>

      <Pressable className="px-6 py-3" onPress={() => router.back()}>
        <Text className="text-4xl text-center">Go to Login</Text>
      </Pressable>
    </View>
  );
};

export default Register;