import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';

interface Task {
  id: string;
  value: string;
  completed: boolean;
}

export const TodoListScreen: React.FC = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = () => {
    if (task.trim()) {
      setTasks(currentTasks => [
        ...currentTasks,
        { id: Math.random().toString(), value: task, completed: false },
      ]);
      setTask('');
    }
  };

  const toggleCompletionHandler = (taskId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Image source={require('../Files/OverlayPatternONE.png')} style={styles.floatingImage} />
      <View style={styles.topTextContainer}>
        <Text style={styles.topText}>እግዚአብሔር ቢፈቅድ ይህን አደርጋለሁ በል እንጂ ...</Text>
      </View>
      {/* Adjusted KeyboardAvoidingView to wrap only the input area */}
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => toggleCompletionHandler(item.id)}>
            <View style={[styles.listItem, item.completed && styles.listItemCompleted]}>
              <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>
                {item.value}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={addTaskHandler} style={styles.addButton}>
            <Text style={styles.addButtonText}>✔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F3C613',
  },
  floatingImage: {
    position: 'absolute',
    width: '100%',
    height: '64%',
    opacity: 0.5,
  },
  topTextContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    alignSelf: 'center',
  },
  topText: {
    color: '#65081B',
    fontSize: 18,
    textAlign: 'center',
  },
  listContainer: { // Ensure FlatList content is padded at the bottom
    paddingBottom: 60, // Adjust this value based on the height of your input container
  },
  keyboardAvoidingContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3C613',
    borderRadius: 20,
    padding: 10,
  },
  addButtonText: {
    color: 'black',
    fontSize: 24,
  },
  listItem: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderColor: '#F3C613',
    borderWidth: 1,
  },
  listItemCompleted: {
    backgroundColor: '#65081B',
  },
  itemText: {
    fontSize: 18,
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#FFFFFF',
  },
});

export default TodoListScreen;
