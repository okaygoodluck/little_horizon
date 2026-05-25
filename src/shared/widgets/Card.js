import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Shadows, Border, Spacing } from '../theme';

export function Card({ children, style, padding = Spacing.l }) {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Border.radius_l,
    ...Shadows.soft,
    marginBottom: Spacing.m,
  },
});
