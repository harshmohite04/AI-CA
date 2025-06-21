import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Stepper from '../../components/Stepper'; // Adjusted path

const initialState = {
  accountNumber: '',
  ifsc: '',
  bankName: '',
  branch: '',
  consent: false,
  transactions: '',
};

const placeholderTextColor = '#a0aec0';

export default function BankDetailsScreen() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation();

  const steps = ['Personal', 'Bank', 'ITR', 'Employment', 'Address', 'Declarations', 'Documents', 'Summary'];
  const currentStep = 2; // This is the Bank details screen

  const handleChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.accountNumber) newErrors.accountNumber = 'Bank Account Number is required';
    if (!form.ifsc) newErrors.ifsc = 'IFSC Code is required';
    if (!form.bankName) newErrors.bankName = 'Bank Name is required';
    if (!form.branch) newErrors.branch = 'Branch is required';
    
    if (form.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.toUpperCase())) {
      newErrors.ifsc = 'Invalid IFSC code';
    }
    if (form.accountNumber && !/^\d{9,18}$/.test(form.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9-18 digits';
    }
    if (!form.consent && !form.transactions) {
      newErrors.transactions = 'Please provide your bank transactions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Navigate to the next screen (e.g., ITRFiling)
      // @ts-ignore
      navigation.navigate('ITRFillingScreen'); 
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="items-center py-10">
            <View className="w-full max-w-2xl rounded-3xl shadow-2xl px-6 py-10 mx-2" style={{ backgroundColor: '#fefefe' }}>
              
              <Stepper steps={steps} currentStep={currentStep} />
              
              <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">Bank Details</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Enter your bank account details and consent for transaction access.</Text>
              
              {/* Form */}
              <View className="flex-row flex-wrap -mx-2">
                {/* Bank Account Number */}
                <View className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Bank Account Number*</Text>
                  <TextInput
                    value={form.accountNumber}
                    onChangeText={v => handleChange('accountNumber', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.accountNumber ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                    placeholder="Enter your account number"
                    placeholderTextColor={placeholderTextColor}
                    keyboardType="numeric"
                    maxLength={18}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.accountNumber}</Text>
                </View>

                {/* IFSC Code */}
                <View className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">IFSC Code*</Text>
                  <TextInput
                    value={form.ifsc}
                    onChangeText={v => handleChange('ifsc', v.toUpperCase())}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.ifsc ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm uppercase`}
                    placeholder="e.g. SBIN0001234"
                    placeholderTextColor={placeholderTextColor}
                    autoCapitalize="characters"
                    maxLength={11}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.ifsc}</Text>
                </View>

                {/* Bank Name */}
                <View className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Bank Name*</Text>
                  <TextInput
                    value={form.bankName}
                    onChangeText={v => handleChange('bankName', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.bankName ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                    placeholder="e.g. State Bank of India"
                    placeholderTextColor={placeholderTextColor}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.bankName}</Text>
                </View>

                {/* Branch */}
                <View className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Branch*</Text>
                  <TextInput
                    value={form.branch}
                    onChangeText={v => handleChange('branch', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.branch ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                    placeholder="e.g. Andheri West"
                    placeholderTextColor={placeholderTextColor}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.branch}</Text>
                </View>

                {/* Consent */}
                <View className="w-full px-2 mb-6">
                  <TouchableOpacity onPress={() => handleChange('consent', !form.consent)} className="flex-row items-center gap-3 mt-1">
                    <Checkbox
                      value={form.consent}
                      onValueChange={v => handleChange('consent', v)}
                      color={form.consent ? '#4F46E5' : undefined}
                    />
                    <Text className="font-medium text-slate-700 flex-1">
                      I consent to access my transactions via Account Aggregator (AA)
                    </Text>
                  </TouchableOpacity>
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.consent}</Text>
                </View>
                
                {/* Transactions */}
                {!form.consent && (
                  <View className="w-full px-2 mb-6">
                    <Text className="font-semibold text-slate-700 mb-1">List of bank transactions*</Text>
                    <TextInput
                      value={form.transactions}
                      onChangeText={v => handleChange('transactions', v)}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.transactions ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base min-h-[96px] shadow-sm`}
                      placeholder="Paste your bank transactions here if not fetched automatically"
                      placeholderTextColor={placeholderTextColor}
                      multiline
                      textAlignVertical="top"
                    />
                    <Text className="min-h-[18px] text-rose-500 text-sm">{errors.transactions}</Text>
                  </View>
                )}
              </View>
              
              {/* Buttons */}
              <View className="flex-row gap-4 mt-10">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 py-3 rounded-xl bg-slate-200"
                  onPress={handleBack}
                >
                  <Text className="text-slate-700 font-bold text-lg text-center">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  className="flex-1 rounded-xl shadow-md overflow-hidden"
                  onPress={handleSubmit}
                >
                  <LinearGradient
                    colors={["#4f46e5", "#06b6d4"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-3 w-full items-center justify-center"
                  >
                    <Text className="text-white font-extrabold text-lg text-center">Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
} 