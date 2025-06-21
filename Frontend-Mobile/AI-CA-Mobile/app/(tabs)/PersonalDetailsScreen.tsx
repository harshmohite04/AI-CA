import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Stepper from '../../components/Stepper';

const initialState = {
  firstName: '',
  lastName: '',
  dob: '',
  pan: '',
  aadhaar: '',
  gender: '',
  email: '',
  mobile: '',
  address: '',
  maritalStatus: '',
  residentialStatus: '',
  occupation: '',
};

const fieldLabels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  dob: 'Date of Birth',
  pan: 'PAN Number',
  aadhaar: 'Aadhaar Number',
  gender: 'Gender',
  email: 'Email Address',
  mobile: 'Mobile Number',
  address: 'Address (with City, State, Pincode)',
  maritalStatus: 'Marital Status',
  residentialStatus: 'Residential Status',
  occupation: 'Occupation Type',
};

const placeholderTextColor = '#a0aec0';

export default function PersonalDetailsScreen() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [showDate, setShowDate] = useState(false);
  const navigation = useNavigation();

  // Dropdown states
  const [genderOpen, setGenderOpen] = useState(false);
  const [maritalOpen, setMaritalOpen] = useState(false);
  const [residentialOpen, setResidentialOpen] = useState(false);
  const [occupationOpen, setOccupationOpen] = useState(false);

  const steps = ['Personal', 'Bank', 'ITR', 'Employment', 'Address', 'Declarations', 'Documents', 'Summary'];
  const currentStep = 1; // This is the Personal details screen

  const genderItems = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
  const maritalItems = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widowed', value: 'Widowed' },
  ];
  const residentialItems = [
    { label: 'Resident', value: 'Resident' },
    { label: 'NRI', value: 'NRI' },
  ];
  const occupationItems = [
    { label: 'Salaried', value: 'Salaried' },
    { label: 'Business', value: 'Business' },
    { label: 'Professional', value: 'Professional' },
    { label: 'Others', value: 'Others' },
  ];

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${fieldLabels[key as keyof typeof fieldLabels]} is required`;
    });
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }
    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must be 12 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDate(false);
    if (selectedDate) {
      handleChange('dob', selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      // @ts-ignore
      navigation.navigate('BankDetailsScreen'); // Corrected navigation
    }
  };

  return (
    <View className="flex-1">
      {/* Subtle background gradient */}
      <LinearGradient
        colors={["#f4f7fe", "#e0e7ef"]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="items-center py-10">
            <View className="w-full max-w-2xl rounded-3xl shadow-2xl px-6 py-10 mx-2" style={{ backgroundColor: '#fefefe' }}>
              <Stepper steps={steps} currentStep={currentStep} />
          {/* Heading */}
              <Text className="text-center font-extrabold text-4xl text-slate-800 mb-2 tracking-tight">Personal Details</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Please fill in your personal information accurately. All fields are required.</Text>
          {/* Form */}
          <View className="flex-row flex-wrap -mx-2">
            {/* First Name */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">First Name*</Text>
              <TextInput
                value={form.firstName}
                onChangeText={v => handleChange('firstName', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.firstName ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="First Name"
                    placeholderTextColor={placeholderTextColor}
                autoCapitalize="words"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.firstName}</Text>
            </View>
            {/* Last Name */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Last Name*</Text>
              <TextInput
                value={form.lastName}
                onChangeText={v => handleChange('lastName', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.lastName ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="Last Name"
                    placeholderTextColor={placeholderTextColor}
                autoCapitalize="words"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.lastName}</Text>
            </View>
            {/* Date of Birth */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Date of Birth*</Text>
                  <TouchableOpacity onPress={() => setShowDate(true)} activeOpacity={0.8} className="relative">
                <TextInput
                  value={form.dob}
                  editable={false}
                      placeholder="dd-mm-yyyy"
                      placeholderTextColor={placeholderTextColor}
                      className={`w-full h-12 px-4 rounded-xl border ${errors.dob ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm pr-10`}
                />
                    <Ionicons name="calendar-outline" size={22} color="#64748b" style={{ position: 'absolute', right: 16, top: 18 }} />
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  value={form.dob ? new Date(form.dob) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.dob}</Text>
            </View>
            {/* PAN Number */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">PAN Number*</Text>
              <TextInput
                value={form.pan}
                onChangeText={v => handleChange('pan', v.toUpperCase())}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.pan ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="ABCDE1234F"
                    placeholderTextColor={placeholderTextColor}
                maxLength={10}
                autoCapitalize="characters"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.pan}</Text>
            </View>
            {/* Aadhaar Number */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Aadhaar Number*</Text>
              <TextInput
                value={form.aadhaar}
                onChangeText={v => handleChange('aadhaar', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.aadhaar ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="123412341234"
                    placeholderTextColor={placeholderTextColor}
                maxLength={12}
                keyboardType="numeric"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.aadhaar}</Text>
            </View>
            {/* Gender */}
                <View style={{ zIndex: genderOpen ? 50 : 4 }} className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Gender*</Text>
              <DropDownPicker
                open={genderOpen}
                setOpen={setGenderOpen}
                value={form.gender}
                    setValue={callback => {
                      const value = typeof callback === 'function' ? callback(form.gender) : callback;
                      handleChange('gender', value);
                    }}
                items={genderItems}
                placeholder="Select Gender"
                    listMode="SCROLLVIEW"
                    autoScroll
                    onOpen={() => {
                      setMaritalOpen(false);
                      setResidentialOpen(false);
                      setOccupationOpen(false);
                    }}
                style={{
                  borderRadius: 16,
                      borderColor: genderOpen ? '#3B82F6' : errors.gender ? '#f43f5e' : '#e5e7eb',
                      backgroundColor: '#fff',
                  minHeight: 48,
                }}
                    textStyle={{ fontSize: 16, color: '#1f2937' }}
                    placeholderStyle={{ color: placeholderTextColor }}
                    dropDownContainerStyle={{ borderRadius: 16, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                    selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                    selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.gender}</Text>
            </View>
            {/* Email Address */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Email Address*</Text>
              <TextInput
                value={form.email}
                onChangeText={v => handleChange('email', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.email ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="example@email.com"
                    placeholderTextColor={placeholderTextColor}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.email}</Text>
            </View>
            {/* Mobile Number */}
                <View className="w-full md:w-1/2 px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Mobile Number*</Text>
              <TextInput
                value={form.mobile}
                onChangeText={v => handleChange('mobile', v)}
                    className={`w-full h-12 px-4 rounded-xl border ${errors.mobile ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base shadow-sm`}
                placeholder="9876543210"
                    placeholderTextColor={placeholderTextColor}
                maxLength={10}
                keyboardType="numeric"
              />
              <Text className="min-h-[18px] text-rose-500 text-sm">{errors.mobile}</Text>
            </View>
            {/* Address */}
                <View className="w-full px-2 mb-6">
              <Text className="font-semibold text-slate-700 mb-1">Address (with City, State, Pincode)*</Text>
              <TextInput
                value={form.address}
                    onChangeText={v => handleChange('address', v)}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-rose-500' : 'border-slate-300'} bg-slate-50 text-base min-h-[48px] shadow-sm`}
                    placeholder="Flat/House, Street, City, State, Pincode"
                    placeholderTextColor={placeholderTextColor}
                    multiline
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.address}</Text>
                </View>
                {/* Marital Status */}
                <View style={{ zIndex: maritalOpen ? 50 : 3 }} className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Marital Status*</Text>
                  <DropDownPicker
                    open={maritalOpen}
                    setOpen={setMaritalOpen}
                    value={form.maritalStatus}
                    setValue={callback => {
                      const value = typeof callback === 'function' ? callback(form.maritalStatus) : callback;
                      handleChange('maritalStatus', value);
                    }}
                    items={maritalItems}
                    placeholder="Select Marital Status"
                    listMode="SCROLLVIEW"
                    autoScroll
                    onOpen={() => {
                      setGenderOpen(false);
                      setResidentialOpen(false);
                      setOccupationOpen(false);
                    }}
                    style={{
                      borderRadius: 16,
                      borderColor: maritalOpen ? '#3B82F6' : errors.maritalStatus ? '#f43f5e' : '#e5e7eb',
                      backgroundColor: '#fff',
                      minHeight: 48,
                    }}
                    textStyle={{ fontSize: 16, color: '#1f2937' }}
                    placeholderStyle={{ color: placeholderTextColor }}
                    dropDownContainerStyle={{ borderRadius: 16, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                    selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                    selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.maritalStatus}</Text>
                </View>
                {/* Residential Status */}
                <View style={{ zIndex: residentialOpen ? 50 : 2 }} className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Residential Status*</Text>
                  <DropDownPicker
                    open={residentialOpen}
                    setOpen={setResidentialOpen}
                    value={form.residentialStatus}
                    setValue={callback => {
                      const value = typeof callback === 'function' ? callback(form.residentialStatus) : callback;
                      handleChange('residentialStatus', value);
                    }}
                    items={residentialItems}
                    placeholder="Select Residential Status"
                    listMode="SCROLLVIEW"
                    autoScroll
                    onOpen={() => {
                      setGenderOpen(false);
                      setMaritalOpen(false);
                      setOccupationOpen(false);
                    }}
                    style={{
                      borderRadius: 16,
                      borderColor: residentialOpen ? '#3B82F6' : errors.residentialStatus ? '#f43f5e' : '#e5e7eb',
                      backgroundColor: '#fff',
                      minHeight: 48,
                    }}
                    textStyle={{ fontSize: 16, color: '#1f2937' }}
                    placeholderStyle={{ color: placeholderTextColor }}
                    dropDownContainerStyle={{ borderRadius: 16, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                    selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                    selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.residentialStatus}</Text>
                </View>
                {/* Occupation Type */}
                <View style={{ zIndex: occupationOpen ? 50 : 1 }} className="w-full md:w-1/2 px-2 mb-6">
                  <Text className="font-semibold text-slate-700 mb-1">Occupation Type*</Text>
                  <DropDownPicker
                    open={occupationOpen}
                    setOpen={setOccupationOpen}
                    value={form.occupation}
                    setValue={callback => {
                      const value = typeof callback === 'function' ? callback(form.occupation) : callback;
                      handleChange('occupation', value);
                    }}
                    items={occupationItems}
                    placeholder="Select Occupation"
                    listMode="SCROLLVIEW"
                    autoScroll
                    onOpen={() => {
                      setGenderOpen(false);
                      setMaritalOpen(false);
                      setResidentialOpen(false);
                    }}
                    style={{
                      borderRadius: 16,
                      borderColor: occupationOpen ? '#3B82F6' : errors.occupation ? '#f43f5e' : '#e5e7eb',
                      backgroundColor: '#fff',
                      minHeight: 48,
                    }}
                    textStyle={{ fontSize: 16, color: '#1f2937' }}
                    placeholderStyle={{ color: placeholderTextColor }}
                    dropDownContainerStyle={{ borderRadius: 16, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                    selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                    selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                    dropDownDirection="TOP"
                  />
                  <Text className="min-h-[18px] text-rose-500 text-sm">{errors.occupation}</Text>
                </View>
              </View>
              {/* Next Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                className="w-full mt-10 rounded-xl shadow-md overflow-hidden"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}