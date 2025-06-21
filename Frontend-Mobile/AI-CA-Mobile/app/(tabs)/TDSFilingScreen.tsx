import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Stepper from '../../components/Stepper';

const initialState = {
  tdsApplicable: '',
  tanNumber: '',
  paymentTypes: '',
  deducteeDetails: '',
  sectionWiseData: '',
  totalTdsDeducted: '',
  tdsPaid: '',
  challanDetails: '',
};

const placeholderTextColor = '#a0aec0';

const InputField = ({ label, value, name, placeholder, onChange, isNumeric = false, hasRupee = false, isUppercase = false }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void, isNumeric?: boolean, hasRupee?: boolean, isUppercase?: boolean }) => (
  <View className="mb-6 w-full">
    <Text className="font-semibold text-slate-700 mb-1">{label}</Text>
    <View className="flex-row items-center">
      {hasRupee && <Text className="text-slate-500 text-base mr-2">₹</Text>}
      <TextInput
        value={value}
        onChangeText={v => onChange(name, v)}
        className="flex-1 h-12 px-3 rounded-xl border border-slate-300 bg-slate-50 text-base"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={isNumeric ? 'numeric' : 'default'}
        autoCapitalize={isUppercase ? 'characters' : 'none'}
        maxLength={name === 'tanNumber' ? 10 : undefined}
      />
    </View>
  </View>
);

const TextAreaField = ({ label, value, name, placeholder, onChange }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void }) => (
    <View className="mb-6 w-full">
        <Text className="font-semibold text-slate-700 mb-1">{label}</Text>
        <TextInput
            value={value}
            onChangeText={(v) => onChange(name, v)}
            className="px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-base min-h-[96px]"
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline
            textAlignVertical="top"
        />
    </View>
);

export default function TDSFilingScreen() {
  const [form, setForm] = useState(initialState);
  const navigation = useNavigation();

  const steps = ['Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'];
  const currentStep = 5;

  const [tdsApplicableOpen, setTdsApplicableOpen] = useState(false);
  const yesNoItems = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }];

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  
  const setDropdownValue = (name: string, callback: any) => {
    const value = typeof callback === 'function' ? callback(form[name as keyof typeof initialState]) : callback;
    handleChange(name, value);
  };

  const handleSubmit = () => {
    // @ts-ignore
    navigation.navigate('PayrollProcessingScreen');
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
              <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">TDS Details</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Enter your TDS applicability, deduction, and payment details.</Text>

              {/* Applicability Section */}
              <View className="mb-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <Text className="text-xl font-bold text-indigo-700 mb-6">Applicability & Registration</Text>
                 <View className="w-full" style={{ zIndex: tdsApplicableOpen ? 10 : 1 }}>
                    <Text className="font-semibold text-slate-700 mb-1">TDS Applicability</Text>
                    <DropDownPicker
                        open={tdsApplicableOpen}
                        setOpen={setTdsApplicableOpen}
                        value={form.tdsApplicable}
                        setValue={(cb) => setDropdownValue('tdsApplicable', cb)}
                        items={yesNoItems}
                        placeholder="Select"
                        listMode="SCROLLVIEW"
                        style={{ borderRadius: 12, borderColor: tdsApplicableOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                        textStyle={{ fontSize: 16, color: '#1f2937' }}
                        placeholderStyle={{ color: placeholderTextColor }}
                        dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                        selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                        selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                     />
                  </View>
                 <View className="mt-6">
                    <InputField label="TAN Number" name="tanNumber" value={form.tanNumber} onChange={handleChange} placeholder="Enter TAN Number" isUppercase />
                 </View>
              </View>

              {/* Payment Types Section */}
              <View className="mb-8 p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <Text className="text-xl font-bold text-sky-700 mb-6">Payment & Deductee Details</Text>
                  <InputField label="Types of Payments (e.g., salary, contractor, rent)" name="paymentTypes" value={form.paymentTypes} onChange={handleChange} placeholder="e.g. Salary, Contractor, Rent" />
                  <TextAreaField label="Deductee details" name="deducteeDetails" value={form.deducteeDetails} onChange={handleChange} placeholder="Enter deductee details (name, PAN, amount, etc.)" />
              </View>

              {/* Section-wise Deduction Section */}
              <View className="mb-8 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <Text className="text-xl font-bold text-emerald-700 mb-6">Section-wise Deduction</Text>
                <TextAreaField label="Section-wise deduction data (e.g., 194C, 194J)" name="sectionWiseData" value={form.sectionWiseData} onChange={handleChange} placeholder="Enter section-wise deduction data" />
              </View>

              {/* TDS Payment Section */}
              <View className="mb-8 p-5 rounded-2xl bg-yellow-50/70 border border-yellow-100">
                <Text className="text-xl font-bold text-yellow-700 mb-6">TDS Payment Details</Text>
                <InputField label="Total TDS deducted" name="totalTdsDeducted" value={form.totalTdsDeducted} onChange={handleChange} placeholder="e.g. 10000" isNumeric hasRupee />
                <InputField label="TDS paid to government" name="tdsPaid" value={form.tdsPaid} onChange={handleChange} placeholder="e.g. 9500" isNumeric hasRupee />
                <TextAreaField label="Challan details (if available)" name="challanDetails" value={form.challanDetails} onChange={handleChange} placeholder="Enter challan details or upload file" />
              </View>

              {/* Buttons */}
              <View className="flex-row gap-4 mt-10">
                <TouchableOpacity activeOpacity={0.8} className="flex-1 py-3 rounded-xl bg-slate-200" onPress={handleBack}>
                  <Text className="text-slate-700 font-bold text-lg text-center">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} className="flex-1 rounded-xl shadow-md overflow-hidden" onPress={handleSubmit}>
                  <LinearGradient colors={["#4f46e5", "#06b6d4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="py-3 w-full items-center justify-center">
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