import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createTask, getTaskById } from '@/services/taskService'
import { useLoader } from '@/context/LoaderContext'

const TaskFormScreen = () => {
    const {id} = useLocalSearchParams<{ id?: string}>()
    //params.id = {id}
    const isNew = !id || id === "new"  // null or id is new -> save
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const router = useRouter()
    const { showLoader, hideLoader } = useLoader()
    

   useEffect(() => {
  const load = async () => {
    if (!isNew && id) {
      showLoader();
      try {
        const task = await getTaskById(id);
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
        }
      } catch (err) {
        console.error("Error loading task:", err);
        Alert.alert("Error", "Failed to load task");
      } finally {
        hideLoader();
      }
    }
  };

  load();
}, [id, isNew]);

// ...existing code...

const handleSubmit = async () => {
  if (!title.trim()) {
    Alert.alert("Validation", "Title is required");
    return;
  }
  showLoader();
  try {
    if (isNew) {
      await createTask({ title, description });
      Alert.alert("Success", "Task created!");
    } else if (id) {
      // You may want to implement updateTask in your service
      // await updateTask(id, { title, description });
      Alert.alert("Success", "Task updated!");
    }
    router.back();
  } catch (err) {
    Alert.alert("Error", "Failed to save task");
    console.error(err);
  } finally {
    hideLoader();
  }
};

// ...existing code...

 return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">
        {isNew ? "Add Task" : "Edit Task"}
      </Text>

      <TextInput
        className="border p-2 rounded-lg mb-3"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border p-2 rounded-lg mb-3"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 p-3 rounded-lg"
      >
        <Text className="text-white text-center">
          {isNew ? "Add Task" : "Update Task"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFormScreen