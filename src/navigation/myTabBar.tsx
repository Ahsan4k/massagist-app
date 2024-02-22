import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');

const ICONS = [
  {
    name: 'home',
  },
  // {
  //   name: 'cart-outline',
  // },
  {
    name: 'bell',
  },
  {
    name: 'male',
  },
];

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabs}>
              <View style={{width: scale(25), height: scale(25)}}>
                {ICONS[index].name == 'cart-outline' ? (
                  <MaterialCommunityIcons
                    name={ICONS[index].name}
                    color={isFocused ? '#790102' : 'lightgrey'}
                    size={scale(27)}
                  />
                ) : (
                  <Fontisto
                    name={ICONS[index].name}
                    color={isFocused ? '#790102' : 'lightgrey'}
                    size={scale(25)}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default MyTabBar;

const styles = StyleSheet.create({
  bar: {
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.02,
  },
});
