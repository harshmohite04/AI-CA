import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const quickActions = [
  { icon: 'document-text-outline', label: 'File ITR', screen: 'PersonalDetailsScreen', color: '#e0e7ff' },
  { icon: 'cloud-upload-outline', label: 'Upload Form 16', screen: '', color: '#d1fae5' },
  { icon: 'download-outline', label: '26AS', screen: '', color: '#fce7f3' },
  { icon: 'calculator-outline', label: 'Calc Tax', screen: '', color: '#fef9c3' },
];

const recentDocuments = [
  { icon: 'file-pdf', name: 'Form_16_2022-23.pdf', date: '3 months ago', color: '#e0e7ff' },
  { icon: 'file-pdf', name: 'Form_26AS_2022-23.pdf', date: '1 month ago', color: '#d1fae5' },
];

const reminders = [
  { icon: 'calendar-today', label: 'ITR Filing Deadline', date: 'July 31, 2023 (15 days left)', color: '#fee2e2' },
  { icon: 'payments', label: 'GST Payment', date: 'August 10, 2023', color: '#fef9c3' },
];

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
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    if (screen) {
      router.push(`./${screen}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" />
      {/* Top Bar */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingTop: 32, paddingBottom: 8, backgroundColor: '#fff'
      }}>
        {/* The DrawerActions is still used for opening the drawer, but you may need to update this if you move to Expo Router's drawer system */}
        <TouchableOpacity /* onPress={() => router.push('/drawer')} */>
          <Ionicons name="menu" size={28} color="#1e293b" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#e0e7ff', borderRadius: 8, padding: 8, marginRight: 8 }}>
            <Text style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 18 }}>AI</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#64748b" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Greeting Card */}
        <View style={{
          backgroundColor: '#2563eb', borderRadius: 16, marginHorizontal: 16, marginTop: 16, padding: 20,
        }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Hello, Jayesh!</Text>
          <Text style={{ color: '#e0e7ff', marginBottom: 12 }}>Your ITR deadline is in 15 days</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#dbeafe', fontSize: 12 }}>Filing progress: 45%</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16,
              }}
              onPress={() => router.push('./PersonalDetailsScreen')}
            >
              <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>Continue Filing</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            width: '100%', height: 8, backgroundColor: '#3b82f6', borderRadius: 8, marginTop: 10,
            overflow: 'hidden'
          }}>
            <View style={{
              height: 8, backgroundColor: '#fff', width: '45%', borderRadius: 8
            }} />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mx-4 mt-6">
          {quickActions.map((action, idx) => (
            <TouchableOpacity
              key={action.label}
              className="flex-1 items-center mx-1 p-3 rounded-2xl"
              style={{ backgroundColor: action.color }}
              onPress={() => handleNavigate(action.screen)}
            >
              <Ionicons name={action.icon as any} size={28} color="#2563eb" />
              <Text className="font-bold text-xs mt-2">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tax Summary */}
        <View className="bg-white rounded-2xl mx-4 mt-6 p-4 shadow">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-bold text-slate-700">Tax Due</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-bold text-xs">Details</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-slate-800">₹12,450</Text>
            <View className="items-end">
              <Text className="text-xs text-slate-500">Estimated Refund</Text>
              <Text className="text-green-600 font-bold text-lg">₹3,200</Text>
            </View>
          </View>
          <View className="w-full h-2 bg-slate-200 rounded-full mt-3">
            <View className="h-2 bg-indigo-500 rounded-full" style={{ width: '45%' }} />
          </View>
        </View>

        {/* Recent Documents */}
        <View className="mx-4 mt-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-bold text-slate-700">Recent Documents</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>
          {recentDocuments.map((doc, idx) => (
            <View key={doc.name} className="flex-row items-center bg-white rounded-2xl p-3 mb-2 shadow">
              <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: doc.color }}>
                <FontAwesome5 name={doc.icon as any} size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-800">{doc.name}</Text>
                <Text className="text-slate-500 text-xs">{doc.date}</Text>
              </View>
              <Ionicons name="ellipsis-vertical" size={20} color="#64748b" />
            </View>
          ))}
        </View>

        {/* Reminders */}
        <View className="mx-4 mt-6 mb-24">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-bold text-slate-700">Reminders</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-bold text-xs">+ Add</Text>
            </TouchableOpacity>
          </View>
          {reminders.map((rem, idx) => (
            <View key={rem.label} className="flex-row items-center bg-white rounded-2xl p-3 mb-2 shadow">
              <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: rem.color }}>
                <MaterialIcons name={rem.icon as any} size={20} color="#f87171" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-800">{rem.label}</Text>
                <Text className="text-slate-500 text-xs">{rem.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 