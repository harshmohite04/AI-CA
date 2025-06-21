import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Stepper from '../../components/Stepper';

const initialState = {
  gstin: '',
  registrationType: '',
  businessNature: '',
  turnover: '',
  salesIntrastate: '',
  salesInterstate: '',
  salesB2B: '',
  salesB2C: '',
  purchasesIntrastate: '',
  purchasesInterstate: '',
  inputGST: '',
  itcEligibility: '',
  gstrData: '',
  hsnSacCodes: '',
  reverseCharge: '',
  lateFees: '',
};

const placeholderTextColor = '#a0aec0';

const InputField = ({ label, value, name, placeholder, onChange, isNumeric = false, hasRupee = false }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void, isNumeric?: boolean, hasRupee?: boolean }) => (
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
        autoCapitalize={name === 'gstin' ? 'characters' : 'none'}
        maxLength={name === 'gstin' ? 15 : undefined}
      />
    </View>
  </View>
);

const TextAreaField = ({ label, value, name, placeholder, onChange }: { label: string, value: string, name: string, placeholder: string, onChange: (name: string, value: string) => void }) => (
    <View className="w-full px-2 mb-6">
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

export default function GSTFilingScreen() {
  const [form, setForm] = useState(initialState);
  const navigation = useNavigation();

  const steps = ['Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'];
  const currentStep = 4;

  const [regTypeOpen, setRegTypeOpen] = useState(false);
  const [bizNatureOpen, setBizNatureOpen] = useState(false);
  const [itcOpen, setItcOpen] = useState(false);
  const [reverseChargeOpen, setReverseChargeOpen] = useState(false);

  const regTypeItems = [{ label: 'Regular', value: 'Regular' }, { label: 'Composition', value: 'Composition' }];
  const bizNatureItems = [{ label: 'Goods', value: 'Goods' }, { label: 'Service', value: 'Service' }, { label: 'Both', value: 'Both' }];
  const yesNoItems = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }];

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  
  const setDropdownValue = (name: string, callback: any) => {
    const value = typeof callback === 'function' ? callback(form[name as keyof typeof initialState]) : callback;
    handleChange(name, value);
  };

  const handleSubmit = () => {
    // Navigate to next screen
    // @ts-ignore
    navigation.navigate('TDSFilingScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };
  
  const onRegTypeOpen = () => {
    setBizNatureOpen(false);
    setItcOpen(false);
    setReverseChargeOpen(false);
  };
  const onBizNatureOpen = () => {
    setRegTypeOpen(false);
    setItcOpen(false);
    setReverseChargeOpen(false);
  };
  const onItcOpen = () => {
    setRegTypeOpen(false);
    setBizNatureOpen(false);
    setReverseChargeOpen(false);
  };
  const onReverseChargeOpen = () => {
    setRegTypeOpen(false);
    setBizNatureOpen(false);
    setItcOpen(false);
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="items-center py-10">
            <View className="w-full max-w-2xl rounded-3xl shadow-2xl px-6 py-10 mx-2" style={{ backgroundColor: '#fefefe' }}>
              <Stepper steps={steps} currentStep={currentStep} />
              <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">GST Filing Details</Text>
              <Text className="text-center text-slate-500 mb-10 text-base">Enter your GST, sales, and purchases details.</Text>

              {/* Registration Section */}
              <View className="mb-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <Text className="text-xl font-bold text-indigo-700 mb-6">Registration Details</Text>
                <View className="flex-row flex-wrap -mx-2">
                  <InputField label="GSTIN" name="gstin" value={form.gstin} onChange={handleChange} placeholder="Enter GSTIN" />
                  <View className="w-full md:w-1/2 px-2 mb-6" style={{ zIndex: regTypeOpen ? 20 : 4 }}>
                    <Text className="font-semibold text-slate-700 mb-1">Type of Registration</Text>
                    <DropDownPicker
                        open={regTypeOpen}
                        setOpen={setRegTypeOpen}
                        value={form.registrationType}
                        setValue={(cb) => setDropdownValue('registrationType', cb)}
                        items={regTypeItems}
                        onOpen={onRegTypeOpen}
                        placeholder="Select Type"
                        listMode="SCROLLVIEW"
                        style={{ borderRadius: 12, borderColor: regTypeOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                        textStyle={{ fontSize: 16, color: '#1f2937' }}
                        placeholderStyle={{ color: placeholderTextColor }}
                        dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                        selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                        selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                     />
                  </View>
                  <View className="w-full md:w-1/2 px-2 mb-6" style={{ zIndex: bizNatureOpen ? 20 : 3 }}>
                     <Text className="font-semibold text-slate-700 mb-1">Business Nature</Text>
                     <DropDownPicker
                        open={bizNatureOpen}
                        setOpen={setBizNatureOpen}
                        value={form.businessNature}
                        setValue={(cb) => setDropdownValue('businessNature', cb)}
                        items={bizNatureItems}
                        onOpen={onBizNatureOpen}
                        placeholder="Select Nature"
                        listMode="SCROLLVIEW"
                        style={{ borderRadius: 12, borderColor: bizNatureOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                        textStyle={{ fontSize: 16, color: '#1f2937' }}
                        placeholderStyle={{ color: placeholderTextColor }}
                        dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                        selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                        selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                     />
                  </View>
                  <InputField label="Turnover" name="turnover" value={form.turnover} onChange={handleChange} placeholder="e.g. 1000000" isNumeric hasRupee />
                </View>
              </View>

              {/* Sales Section */}
              <View className="mb-8 p-5 rounded-2xl bg-sky-50/70 border border-sky-100">
                <Text className="text-xl font-bold text-sky-700 mb-6">Sales Breakup</Text>
                <View className="flex-row flex-wrap -mx-2">
                    <InputField label="Intrastate Sales" name="salesIntrastate" value={form.salesIntrastate} onChange={handleChange} placeholder="e.g. 500000" isNumeric hasRupee />
                    <InputField label="Interstate Sales" name="salesInterstate" value={form.salesInterstate} onChange={handleChange} placeholder="e.g. 200000" isNumeric hasRupee />
                    <InputField label="B2B Sales" name="salesB2B" value={form.salesB2B} onChange={handleChange} placeholder="e.g. 100000" isNumeric hasRupee />
                    <InputField label="B2C Sales" name="salesB2C" value={form.salesB2C} onChange={handleChange} placeholder="e.g. 150000" isNumeric hasRupee />
                </View>
              </View>

              {/* Purchases Section */}
              <View className="mb-8 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <Text className="text-xl font-bold text-emerald-700 mb-6">Purchases & Input GST</Text>
                <View className="flex-row flex-wrap -mx-2">
                    <InputField label="Intrastate Purchases" name="purchasesIntrastate" value={form.purchasesIntrastate} onChange={handleChange} placeholder="e.g. 300000" isNumeric hasRupee />
                    <InputField label="Interstate Purchases" name="purchasesInterstate" value={form.purchasesInterstate} onChange={handleChange} placeholder="e.g. 100000" isNumeric hasRupee />
                    <InputField label="Input GST" name="inputGST" value={form.inputGST} onChange={handleChange} placeholder="e.g. 18000" isNumeric hasRupee />
                     <View className="w-full md:w-1/2 px-2 mb-6" style={{ zIndex: itcOpen ? 20 : 2 }}>
                        <Text className="font-semibold text-slate-700 mb-1">Input Tax Credit (ITC) eligibility</Text>
                        <DropDownPicker
                            open={itcOpen}
                            setOpen={setItcOpen}
                            value={form.itcEligibility}
                            setValue={(cb) => setDropdownValue('itcEligibility', cb)}
                            items={yesNoItems}
                            onOpen={onItcOpen}
                            placeholder="Select"
                            listMode="SCROLLVIEW"
                            style={{ borderRadius: 12, borderColor: itcOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                            textStyle={{ fontSize: 16, color: '#1f2937' }}
                            placeholderStyle={{ color: placeholderTextColor }}
                            dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                            selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                            selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                         />
                     </View>
                </View>
              </View>

              {/* GSTR/HSN Section */}
              <View className="mb-8 p-5 rounded-2xl bg-yellow-50/70 border border-yellow-100">
                <Text className="text-xl font-bold text-yellow-700 mb-6">GSTR & HSN/SAC</Text>
                 <TextAreaField label="GSTR-1 and GSTR-3B data" name="gstrData" value={form.gstrData} onChange={handleChange} placeholder="Paste or upload your GSTR-1/3B data here" />
                 <TextAreaField label="HSN/SAC codes for products/services" name="hsnSacCodes" value={form.hsnSacCodes} onChange={handleChange} placeholder="List HSN/SAC codes here" />
              </View>
              
              {/* Other Section */}
              <View className="p-5 rounded-2xl bg-pink-50/70 border border-pink-100">
                <Text className="text-xl font-bold text-pink-700 mb-6">Other Details</Text>
                 <View className="flex-row flex-wrap -mx-2">
                     <View className="w-full md:w-1/2 px-2 mb-6" style={{ zIndex: reverseChargeOpen ? 20 : 1 }}>
                        <Text className="font-semibold text-slate-700 mb-1">Reverse Charge applicability</Text>
                        <DropDownPicker
                            open={reverseChargeOpen}
                            setOpen={setReverseChargeOpen}
                            value={form.reverseCharge}
                            setValue={(cb) => setDropdownValue('reverseCharge', cb)}
                            items={yesNoItems}
                            onOpen={onReverseChargeOpen}
                            placeholder="Select"
                            listMode="SCROLLVIEW"
                            style={{ borderRadius: 12, borderColor: reverseChargeOpen ? '#3B82F6' : '#e5e7eb', backgroundColor: '#f8fafc', minHeight: 48, }}
                            textStyle={{ fontSize: 16, color: '#1f2937' }}
                            placeholderStyle={{ color: placeholderTextColor }}
                            dropDownContainerStyle={{ borderRadius: 12, borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                            selectedItemContainerStyle={{ backgroundColor: '#3B82F6' }}
                            selectedItemLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                         />
                     </View>
                    <InputField label="Late Fees / Interest if any" name="lateFees" value={form.lateFees} onChange={handleChange} placeholder="e.g. 500" isNumeric hasRupee />
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