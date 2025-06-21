import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Stepper from '../../components/Stepper';

const initialState = {
  salaryIncome: '',
  businessIncome: '',
  capitalGains: '',
  housePropertyIncome: '',
  otherSourcesIncome: '',
  exemptIncome: '',
  foreignIncome: '',
  deduction80C: '',
  deduction80D: '',
  deduction80G: '',
  deductionOther: '',
  previousTaxPaid: '',
  refundBankAccount: '',
  form26AS: '',
};

const placeholderTextColor = '#a0aec0';

const incomeFields = [
  { label: 'Salary Income (from Form 16)', name: 'salaryIncome', placeholder: 'e.g. 500000' },
  { label: 'Business/Professional Income', name: 'businessIncome', placeholder: 'e.g. 200000' },
  { label: 'Capital Gains', name: 'capitalGains', placeholder: 'e.g. 10000' },
  { label: 'House Property Income', name: 'housePropertyIncome', placeholder: 'e.g. 30000' },
  { label: 'Other Sources Income (interest, dividend, etc.)', name: 'otherSourcesIncome', placeholder: 'e.g. 5000' },
  { label: 'Exempt Income (e.g., agriculture income)', name: 'exemptIncome', placeholder: 'e.g. 10000' },
  { label: 'Foreign Income (if applicable)', name: 'foreignIncome', placeholder: 'e.g. 0' },
];

const deductionFields = [
  { label: 'Section 80C (e.g., LIC, PPF, ELSS)', name: 'deduction80C', placeholder: 'e.g. 150000' },
  { label: 'Section 80D (medical insurance)', name: 'deduction80D', placeholder: 'e.g. 25000' },
  { label: 'Section 80G (donations)', name: 'deduction80G', placeholder: 'e.g. 5000' },
  { label: 'Section 80E, 80TTA, etc.', name: 'deductionOther', placeholder: 'e.g. 10000' },
];

export default function ITRFillingScreen() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation();

  const steps = ['Personal', 'Bank', 'ITR', 'Employment', 'Address', 'Declarations', 'Documents', 'Summary'];
  const currentStep = 3;

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    // Add validation logic here if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // @ts-ignore
      navigation.navigate('GSTFilingScreen'); // Navigate to the next screen
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
              
              <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">ITR Filing Details</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Enter your income, deductions, and tax details.</Text>
              
              {/* Income Section */}
              <View className="mb-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <Text className="text-xl font-bold text-indigo-700 mb-6">Income Details</Text>
                {incomeFields.map(field => (
                  <View key={field.name} className="mb-5">
                    <Text className="font-semibold text-slate-700 mb-1">{field.label}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-slate-500 text-base mr-2">₹</Text>
                      <TextInput
                        value={form[field.name as keyof typeof form]}
                        onChangeText={v => handleChange(field.name, v)}
                        className="flex-1 h-12 px-3 rounded-xl border border-slate-300 bg-slate-50 text-base"
                        placeholder={field.placeholder}
                        placeholderTextColor={placeholderTextColor}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* Deductions Section */}
              <View className="mb-8 p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
                <Text className="text-xl font-bold text-sky-700 mb-6">Deductions</Text>
                {deductionFields.map(field => (
                  <View key={field.name} className="mb-5">
                    <Text className="font-semibold text-slate-700 mb-1">{field.label}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-slate-500 text-base mr-2">₹</Text>
                      <TextInput
                        value={form[field.name as keyof typeof form]}
                        onChangeText={v => handleChange(field.name, v)}
                        className="flex-1 h-12 px-3 rounded-xl border border-slate-300 bg-slate-50 text-base"
                        placeholder={field.placeholder}
                        placeholderTextColor={placeholderTextColor}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* Other Details Section */}
              <View className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <Text className="text-xl font-bold text-emerald-700 mb-6">Other Details</Text>
                <View className="mb-5">
                  <Text className="font-semibold text-slate-700 mb-1">Previous Year's Tax Paid / Refunds</Text>
                  <View className="flex-row items-center">
                    <Text className="text-slate-500 text-base mr-2">₹</Text>
                    <TextInput
                      value={form.previousTaxPaid}
                      onChangeText={v => handleChange('previousTaxPaid', v)}
                      className="flex-1 h-12 px-3 rounded-xl border border-slate-300 bg-slate-50 text-base"
                      placeholder="e.g. 20000"
                      placeholderTextColor={placeholderTextColor}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View className="mb-5">
                  <Text className="font-semibold text-slate-700 mb-1">Bank Account for refund credit</Text>
                  <TextInput
                    value={form.refundBankAccount}
                    onChangeText={v => handleChange('refundBankAccount', v)}
                    className="h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 text-base"
                    placeholder="Enter bank account number"
                    placeholderTextColor={placeholderTextColor}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-slate-700 mb-1">Form 26AS / AIS data</Text>
                  <TextInput
                    value={form.form26AS}
                    onChangeText={v => handleChange('form26AS', v)}
                    className="px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-base min-h-[96px]"
                    placeholder="Paste your Form 26AS or AIS data here"
                    placeholderTextColor={placeholderTextColor}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
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