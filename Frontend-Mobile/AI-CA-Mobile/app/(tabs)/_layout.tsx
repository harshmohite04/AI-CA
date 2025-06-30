import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import '../../global.css';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='HomeScreen'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="PersonalDetailsScreen"
        options={{
          title: 'Personal Details',
        }}
      />
      <Tabs.Screen
        name="BankDetailsScreen"
        options={{
          title: 'Bank Details',
        }}
      />
      <Tabs.Screen
        name="ITRFillingScreen"
        options={{
          title: 'ITR Filing',
        }}
      />
      <Tabs.Screen
        name="GSTFilingScreen"
        options={{
          title: 'GST Filing',
        }}
      />
      <Tabs.Screen
        name="TDSFilingScreen"
        options={{
          title: 'TDS Filing',
        }}
      />
      <Tabs.Screen
        name="PayrollProcessingScreen"
        options={{
          title: 'Payroll Processing',
        }}
      />
      <Tabs.Screen
        name="BusinessDetailsScreen"
        options={{
          title: 'Business Details',
        }}
      />
      <Tabs.Screen
        name="DocumentUploadsScreen"
        options={{
          title: 'Document Uploads',
        }}
      />
    </Tabs>
  );
}
