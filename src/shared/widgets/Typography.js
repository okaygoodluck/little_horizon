import React from 'react';
import { Text } from 'react-native';
import { Typography } from '../theme';

export function TextTitle({ children, style, ...props }) {
  return <Text style={[Typography.h1, style]} {...props}>{children}</Text>;
}

export function TextHeading({ children, style, ...props }) {
  return <Text style={[Typography.h2, style]} {...props}>{children}</Text>;
}

export function TextSubheading({ children, style, ...props }) {
  return <Text style={[Typography.h3, style]} {...props}>{children}</Text>;
}

export function TextBody({ children, style, ...props }) {
  return <Text style={[Typography.body, style]} {...props}>{children}</Text>;
}

export function TextCaption({ children, style, ...props }) {
  return <Text style={[Typography.caption, style]} {...props}>{children}</Text>;
}
