import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, Spacing, Border, Shadows } from '../theme';
import { TextBody } from './Typography';

export function Button({ title, onPress, variant = 'primary', style, loading = false, disabled = false }) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : Colors.primary} />
      ) : (
        <TextBody style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {title}
        </TextBody>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.xl,
    borderRadius: Border.radius_pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.soft,
    shadowColor: Colors.primary, // Sombra colorida no iOS/Web fica muito premium
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: Colors.textPrimary,
  },
});
