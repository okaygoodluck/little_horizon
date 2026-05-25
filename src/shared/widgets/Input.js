import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Colors, Spacing, Border, Typography } from '../theme';
import { TextCaption } from './Typography';

export function Input({ label, value, onChangeText, placeholder, ...props }) {
  return (
    <View style={styles.container}>
      {label && <TextCaption style={styles.label}>{label}</TextCaption>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.m,
  },
  label: {
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Border.radius_m,
    padding: Spacing.m,
    fontSize: Typography.body.fontSize,
    color: Colors.textPrimary,
  },
});
