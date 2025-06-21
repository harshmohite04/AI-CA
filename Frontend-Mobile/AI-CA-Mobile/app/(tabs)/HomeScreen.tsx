import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View className="flex-1 items-center p-4 bg-white/10 rounded-2xl border border-white/20">
    <Ionicons name={icon} size={28} color="white" />
    <Text className="text-white font-bold text-2xl mt-2">{value}</Text>
    <Text className="text-white/80 text-sm">{label}</Text>
  </View>
);

const RecentFilingCard = ({ name, date, status }: { name: string; date: string; status: 'Completed' | 'In Progress' }) => {
    const isCompleted = status === 'Completed';
    return (
        <View className="flex-row items-center justify-between p-4 bg-white/90 rounded-2xl mb-3">
            <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-full items-center justify-center ${isCompleted ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Ionicons name={isCompleted ? 'checkmark-done-circle' : 'hourglass'} size={28} color={isCompleted ? '#16a34a' : '#f97316'} />
                </View>
                <View className="ml-4">
                    <Text className="font-bold text-slate-800 text-base">{name}</Text>
                    <Text className="text-slate-500 text-sm">{date}</Text>
                </View>
            </View>
            <Text className={`font-bold text-sm ${isCompleted ? 'text-green-600' : 'text-orange-500'}`}>{status}</Text>
        </View>
    );
};


export default function HomeScreen() {
  const navigation = useNavigation();

  const handleStartFiling = () => {
    // @ts-ignore
    navigation.navigate('PersonalDetailsScreen');
  };

  return (
    <LinearGradient colors={['#4f46e5', '#1e3a8a']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="light-content" />
        <View className="p-8 pt-20">
          <Text className="text-white font-bold text-4xl">Welcome Back!</Text>
          <Text className="text-white/80 text-lg mt-1">Let's get your taxes filed.</Text>

          <View className="flex-row gap-4 my-8">
            <StatCard icon="document-text-outline" label="Filings" value="0" />
            <StatCard icon="alert-circle-outline" label="Alerts" value="0" />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            className="w-full rounded-2xl shadow-md overflow-hidden"
            onPress={handleStartFiling}
          >
            <LinearGradient
              colors={["#22d3ee", "#06b6d4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 w-full items-center justify-center flex-row"
            >
              <Ionicons name="add-circle-outline" size={28} color="white" />
              <Text className="text-white font-extrabold text-xl text-center ml-3">Start New Filing</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <View className="flex-1 bg-gray-100 p-8 rounded-t-3xl">
            <Text className="text-slate-800 font-bold text-2xl mb-5">Recent Activity</Text>
            <RecentFilingCard name="ITR 2023-24" date="May 15, 2024" status="In Progress" />
            <RecentFilingCard name="GST March 2024" date="April 20, 2024" status="Completed" />
            <View className="items-center mt-4">
                <TouchableOpacity>
                    <Text className="text-indigo-600 font-bold">View All</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
} 