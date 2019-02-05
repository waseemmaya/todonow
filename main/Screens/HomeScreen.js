import React from "react";
import {
  Text,
  Row,
  Caption,
  Icon,
  Heading,
  TouchableOpacity,
  Subtitle
} from "@shoutem/ui";

import { View, Dimensions, Alert } from "react-native";
import { connect } from "react-redux";
import ActionButton from "react-native-action-button";
import { AppLoading, Font } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { removeTask } from "../Redux/actions/actions";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      loaded: false
    };
  }
  render() {
    const { tasks } = this.props;
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={this._loadFonts}
          onFinish={() => this.setState({ loaded: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {!!tasks.length ? this.renderTasks() : <Heading>No Task</Heading>}
        <ActionButton
          onPress={() => this.props.navigation.navigate("AddTask")}
          buttonColor="#212121"
        />
      </View>
    );
  }

  _viewTask = (v, i) => {
    let obj = {
      v: v,
      i: i
    };
    this.props.navigation.navigate("ViewTask", obj);
  };

  _onLongPressButton = (i, v) => {
    console.log("i :", i);

    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.removeTask(i, v) }
      ],
      { cancelable: false }
    );
  };

  renderTasks = () => {
    const { tasks } = this.props;
    let a = tasks.sort((a, b) => {
      var dateA = new Date(a.task.momentDate);
      var dateB = new Date(b.task.momentDate);
      return dateB - dateA;
    });
    // Buttons
    return (
      <ScrollView>
        {a.map((v, i) => {
          return (
            <TouchableOpacity
              onLongPress={() => this._onLongPressButton(i, v)}
              key={i}
              onPress={() => this._viewTask(v, i)}>
              <Row
                style={{
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1
                }}>
                <View styleName="vertical">
                  <Subtitle style={{ fontSize: 18 }} numberOfLines={1}>
                    {v.task.taskName}
                  </Subtitle>
                  <View styleName="horizontal space-between">
                    <Caption>
                      Added {moment(v.task.momentDate).fromNow()}
                    </Caption>
                    {/* <Caption>
                      {v.task.isEdit ? "Edited " : "Added "}
                      {moment(v.task.momentDate).fromNow()}
                    </Caption> */}
                  </View>
                </View>
              </Row>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  async _loadFonts() {
    await Font.loadAsync({
      "Rubik-Regular": require("../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.reducers.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeTask: (i, task) => dispatch(removeTask(i, task))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
