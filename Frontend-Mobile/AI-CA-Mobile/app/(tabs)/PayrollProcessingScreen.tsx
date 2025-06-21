import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Stepper from '../../components/Stepper';
import { Ionicons } from '@expo/vector-icons';

const placeholderTextColor = '#a0aec0';

const emptyEmployee = {
  name: '',
  pan: '',
  designation: '',
  basicSalary: '',
  hra: '',
  allowances: '',
  deductions: '',
  dateOfJoining: '',
  salaryPaymentDates: '',
  compliance: '',
};

const EmployeeInputField = ({ label, value, name, placeholder, onChange, isNumeric = false, hasRupee = false, isUppercase = false }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void, isNumeric?: boolean, hasRupee?: boolean, isUppercase?: boolean }) => (
    <View className="w-full md:w-1/2 px-2 mb-6">
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
            />
        </View>
    </View>
);

export default function PayrollProcessingScreen() {
  const [employees, setEmployees] = useState([emptyEmployee]);
  const [showDatePickerFor, setShowDatePickerFor] = useState<number | null>(null);

  const navigation = useNavigation();
  const steps = ['Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'];
  const currentStep = 6;

  const handleEmployeeChange = (idx: number, name: string, value: string) => {
    const updatedEmployees = [...employees];
    updatedEmployees[idx] = { ...updatedEmployees[idx], [name]: value };
    setEmployees(updatedEmployees);
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const HIDE = setShowDatePickerFor(null);
    if (selectedDate && showDatePickerFor !== null) {
        handleEmployeeChange(showDatePickerFor, 'dateOfJoining', selectedDate.toISOString().split('T')[0]);
    }
  };

  const addEmployee = () => {
    setEmployees([...employees, { ...emptyEmployee }]);
  };

  const removeEmployee = (idx: number) => {
    if (employees.length > 1) {
      setEmployees(employees.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = () => {
    // @ts-ignore
    navigation.navigate('BusinessDetailsScreen');
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
              <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">Payroll Processing</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Enter payroll details for all employees.</Text>

              <View className="mb-8 p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
                <Text className="text-xl font-bold text-sky-700 mb-6">Employee Details</Text>
                {employees.map((emp, idx) => (
                  <View key={idx} className="mb-6 p-4 rounded-xl border border-sky-200 bg-white/80 relative">
                    {employees.length > 1 && (
                      <TouchableOpacity onPress={() => removeEmployee(idx)} className="absolute top-2 right-2 p-1 z-10">
                        <Ionicons name="close-circle" size={24} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                    <Text className="font-bold text-lg text-slate-600 mb-4">Employee {idx + 1}</Text>
                    <View className="flex-row flex-wrap -mx-2">
                        <EmployeeInputField label="Name" name="name" value={emp.name} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="Employee Name" />
                        <EmployeeInputField label="PAN" name="pan" value={emp.pan} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="ABCDE1234F" isUppercase />
                        <EmployeeInputField label="Designation" name="designation" value={emp.designation} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. Manager" />
                        <EmployeeInputField label="Basic Salary" name="basicSalary" value={emp.basicSalary} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. 30000" isNumeric hasRupee />
                        <EmployeeInputField label="HRA" name="hra" value={emp.hra} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. 12000" isNumeric hasRupee />
                        <EmployeeInputField label="Allowances" name="allowances" value={emp.allowances} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. 5000" isNumeric />
                        <EmployeeInputField label="Deductions (PF, ESI, loans)" name="deductions" value={emp.deductions} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. 2000" isNumeric />
                        <EmployeeInputField label="Salary Payment Dates" name="salaryPaymentDates" value={emp.salaryPaymentDates} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="e.g. 1st of every month" />
                        <EmployeeInputField label="Compliance details" name="compliance" value={emp.compliance} onChange={(n, v) => handleEmployeeChange(idx, n, v)} placeholder="PF/ESI/TDS applicability" />

                        <View className="w-full md:w-1/2 px-2 mb-6">
                            <Text className="font-semibold text-slate-700 mb-1">Date of Joining</Text>
                            <TouchableOpacity onPress={() => setShowDatePickerFor(idx)} activeOpacity={0.8} className="relative">
                                <TextInput
                                    value={emp.dateOfJoining}
                                    editable={false}
                                    placeholder="dd-mm-yyyy"
                                    placeholderTextColor={placeholderTextColor}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 text-base"
                                />
                                <Ionicons name="calendar-outline" size={22} color="#64748b" style={{ position: 'absolute', right: 12, top: 12 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                ))}
                
                {showDatePickerFor !== null && (
                    <DateTimePicker
                        value={employees[showDatePickerFor]?.dateOfJoining ? new Date(employees[showDatePickerFor].dateOfJoining) : new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}
                
                <View className="flex-row justify-end mt-2">
                    <TouchableOpacity onPress={addEmployee} className="px-6 py-3 rounded-xl bg-indigo-100 items-center justify-center flex-row">
                        <Ionicons name="add-circle-outline" size={22} color="#4f46e5" />
                        <Text className="text-indigo-700 font-bold text-base ml-2">Add Employee</Text>
                    </TouchableOpacity>
                </View>
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