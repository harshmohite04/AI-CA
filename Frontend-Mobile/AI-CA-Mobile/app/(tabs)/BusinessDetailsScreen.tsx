import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Stepper from '../../components/Stepper';
import { Ionicons } from '@expo/vector-icons';

const placeholderTextColor = '#a0aec0';

const initialState = {
  businessName: '',
  businessType: '',
  incorporationDate: '',
  natureOfGoods: '',
  booksMaintained: '',
  msmeDetails: '',
};

const InputField = ({ label, value, name, placeholder, onChange }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void }) => (
    <View className="w-full md:w-1/2 px-2 mb-6">
        <Text className="font-semibold text-slate-700 mb-1">{label}</Text>
        <TextInput
            value={value}
            onChangeText={v => onChange(name, v)}
            className="h-12 px-3 rounded-xl border border-slate-300 bg-slate-50 text-base"
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
        />
    </View>
);

const TextAreaField = ({ label, value, name, placeholder, onChange }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void }) => (
    <View className="w-full md:w-1/2 px-2 mb-6">
        <Text className="font-semibold text-slate-700 mb-1">{label}</Text>
        <TextInput
            value={value}
            onChangeText={(v) => onChange(name, v)}
            className="px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-base min-h-[120px]"
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            multiline
            textAlignVertical="top"
        />
    </View>
);


export default function BusinessDetailsScreen() {
    const [form, setForm] = useState(initialState);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [booksMaintainedOpen, setBooksMaintainedOpen] = useState(false);

    const navigation = useNavigation();
    const steps = ['Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'];
    const currentStep = 7;
    const yesNoItems = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }];

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };
    
    const setDropdownValue = (name: string, callback: any) => {
        const value = typeof callback === 'function' ? callback(form[name as keyof typeof initialState]) : callback;
        handleChange(name, value);
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleChange('incorporationDate', selectedDate.toISOString().split('T')[0]);
        }
    };

    const handleSubmit = () => {
        // @ts-ignore
        navigation.navigate('DocumentUploadsScreen');
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
                            <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">Business Details</Text>
                            <Text className="text-center text-slate-500 mb-10 text-base">Enter business details if you are self-employed or an MSME.</Text>
                            
                            <View className="mb-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                                <Text className="text-xl font-bold text-indigo-700 mb-6">Business Information</Text>
                                <View className="flex-row flex-wrap -mx-2">
                                    <InputField label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Enter business name" />
                                    <InputField label="Type of Business" name="businessType" value={form.businessType} onChange={handleChange} placeholder="e.g. Sole Proprietorship, Pvt Ltd, etc." />
                                    <View className="w-full md:w-1/2 px-2 mb-6">
                                        <Text className="font-semibold text-slate-700 mb-1">Date of Incorporation</Text>
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8} className="relative">
                                            <TextInput
                                                value={form.incorporationDate}
                                                editable={false}
                                                placeholder="dd-mm-yyyy"
                                                placeholderTextColor={placeholderTextColor}
                                                className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 text-base"
                                            />
                                            <Ionicons name="calendar-outline" size={22} color="#64748b" style={{ position: 'absolute', right: 12, top: 12 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputField label="Nature of Goods/Services" name="natureOfGoods" value={form.natureOfGoods} onChange={handleChange} placeholder="e.g. Electronics, Consulting, etc." />
                                    <View className="w-full md:w-1/2 px-2 mb-6" style={{ zIndex: 10 }}>
                                        <Text className="font-semibold text-slate-700 mb-1">Books of Accounts maintained?</Text>
                                        <DropDownPicker
                                            open={booksMaintainedOpen}
                                            setOpen={setBooksMaintainedOpen}
                                            value={form.booksMaintained}
                                            setValue={(cb) => setDropdownValue('booksMaintained', cb)}
                                            items={yesNoItems}
                                            placeholder="Select"
                                            listMode="SCROLLVIEW"
                                            style={{ borderRadius: 12, borderColor: booksMaintainedOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                                            textStyle={{ fontSize: 16, color: '#1f2937' }}
                                            placeholderStyle={{ color: placeholderTextColor }}
                                            dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                                            selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                                            selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                                        />
                                    </View>
                                    <TextAreaField label="MSME Registration Details (if any)" name="msmeDetails" value={form.msmeDetails} onChange={handleChange} placeholder="Enter MSME registration details" />
                                </View>
                            </View>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={form.incorporationDate ? new Date(form.incorporationDate) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                            
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