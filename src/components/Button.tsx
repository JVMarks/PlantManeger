import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface buttonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: buttonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      {...rest}
    >

      <Text style={styles.text} >
        {title}
      </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading
  }
})