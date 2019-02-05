import { createStackNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";
import AddTask from "./Screens/AddTask";
import ViewTask from "./Screens/ViewTask";
import HomeScreen from "./Screens/HomeScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Tasks`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },

  AddTask: {
    screen: AddTask,
    navigationOptions: () => ({
      title: `Add Task`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },
  ViewTask: {
    screen: ViewTask,
    navigationOptions: () => ({
      title: `Task View`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  }
});

const Routes = createAppContainer(AppNavigator);

export default Routes;
