import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../theme';

export function ProgressBar({ progress, color = Colors.success, height = 10 }) {
  // progress goes from 0 to 100
  return (
    <View style={[styles.background, { height }]}>
      <View style={[styles.fill, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.border,
    borderRadius: 999,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
