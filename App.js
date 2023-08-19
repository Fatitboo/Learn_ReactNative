import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalVisible] = useState(false);
  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [...courseGoals,
    { text: enteredGoalText, id: Math.random().toString() }]);
    endAddModalHandler();
  }
  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  function startAddModalHandler() {
    setModalVisible(true);
  }
  function endAddModalHandler() {
    setModalVisible(false);
  }
  return (
    <View style={styles.appcontainer}>
      <Button title='add new goal'
              onPress={startAddModalHandler}/>
      <GoalInput  onAddGoal={addGoalHandler}
                  visible={modalIsVisible} 
                  onCancel={endAddModalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(dataItem) => {
            return <GoalItem text={dataItem.item.text}
              onDeleteItem={deleteGoalHandler}
              id={dataItem.item.id} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}>

        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor:"#e4d0ff"
  },
  goalsContainer: {
    flex: 6
  }
});
