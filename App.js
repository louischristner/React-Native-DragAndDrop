import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";

// const Salope = ({
//   content,
//   isTouching
// }) => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;

//   const position = new Animated.ValueXY();

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value
//         });
//       },
//       onPanResponderMove: (event, gestureState) => {
//         position.setValue({ x: 0, y: gestureState.dy });
//       },
//       onPanResponderRelease: () => {
//         pan.flattenOffset();
//       }
//     })
//   ).current;

//   return (
//     <Animated.View
//       style={[
//         { ...position.getLayout() },
//         { position: 'absolute' }
//       ]}
//       // style={{
//       //   position: 'absolute',
//       //   transform: [{ translateY: pan.y }]
//       // }}
//       {...panResponder.panHandlers}
//     >
//       <View style={{
//         height: windowHeight,
//         width: windowWidth,
//         backgroundColor: "red",
//         borderRadius: 5
//       }}>
//         {content}
//       </View>
//     </Animated.View>
//   );
// };

const Salope = ({
  content,
  isTouching,
  setIsTouching
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
    },
    onPanResponderMove: (event, gestureState) => {
      if (!isTouching) {
        return Animated.event([
          null,
          {dx: pan.x, dy: pan.y}
        ], { useNativeDriver: false })(event, gestureState);
      }
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    }
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{ translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      <TouchableWithoutFeedback onPressIn={() => setIsTouching(false)}>
        <View style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: "red",
          borderRadius: 5
        }}>
          {content}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};


const App = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [isTouching, setIsTouching] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Salope
        isTouching={isTouching}
        setIsTouching={setIsTouching}
        content={
          <ScrollView style={{
              margin: 10,
              // marginTop: 50,
              backgroundColor: "blue",
              borderRadius: 5
            }} canCancelContentTouches={true}>
              {[
                "Salut mon pote",
                "Salut c'est Johnny",
                "Habile",
                "Je finis toujours le travail pour lequel on me paye"
              ].map((element, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPressIn={() => setIsTouching(true)}
                    onPress={() => setIsTouching(false)}
                  >
                    <View style={{
                      // margin: 20,
                      height: windowHeight / 3,
                    }}>
                      <Text>{element}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
          </ScrollView>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  }
});

export default App;