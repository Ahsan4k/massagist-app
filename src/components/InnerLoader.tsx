import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';

const InnerLoader = ({loading}) => {
  return loading ? <ActivityIndicator color="white" size="large" /> : null;
};

export default InnerLoader;

const styles = StyleSheet.create({});
