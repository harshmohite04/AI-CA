import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import Stepper from '../../components/Stepper';
import { Ionicons } from '@expo/vector-icons';

const placeholderTextColor = '#a0aec0';

const documentFields = [
  { label: 'PAN Card', name: 'panCard' },
  { label: 'Aadhaar Card', name: 'aadhaarCard' },
  { label: 'Form 16 / Salary Slips', name: 'form16' },
  { label: 'Bank Statements (PDF or synced)', name: 'bankStatements' },
  { label: 'Investment Proofs (LIC, PPF, ELSS)', name: 'investmentProofs' },
  { label: 'Medical Insurance Receipts', name: 'medicalInsurance' },
  { label: 'Donation Receipts', name: 'donationReceipts' },
  { label: 'GSTR filings', name: 'gstrFilings' },
  { label: 'Purchase/Sales invoices', name: 'purchaseSalesInvoices' },
  { label: 'TDS Challans', name: 'tdsChallans' },
  { label: 'Previous Year ITR Acknowledgements', name: 'previousItr' },
];

const initialState: Record<string, DocumentPicker.DocumentPickerAsset | null> = documentFields.reduce((acc, field) => {
  acc[field.name] = null;
  return acc;
}, {} as Record<string, DocumentPicker.DocumentPickerAsset | null>);


const FilePickerField = ({ label, onPick, selectedFile }: { label: string; onPick: () => void; selectedFile: DocumentPicker.DocumentPickerAsset | null; }) => {
    
    const fileName = selectedFile?.name ?? '';

    return (
        <View className="w-full md:w-1/2 px-2 mb-6">
            <Text className="font-semibold text-slate-700 mb-1">{label}</Text>
            <TouchableOpacity onPress={onPick} className="w-full h-14 px-4 rounded-xl border border-dashed border-indigo-400 bg-indigo-50 flex-row items-center justify-between">
                <Text className="text-indigo-700 font-medium" numberOfLines={1}>{fileName || 'Select File'}</Text>
                <Ionicons name="cloud-upload-outline" size={24} color="#4f46e5" />
            </TouchableOpacity>
             {fileName && <Text className="text-xs text-green-600 mt-1">{fileName} selected</Text>}
        </View>
    );
};


export default function DocumentUploadsScreen() {
    const [files, setFiles] = useState(initialState);
    const navigation = useNavigation();
    
    const steps = ['Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'];
    const currentStep = 8;

    const handleFilePick = async (fieldName: string) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "image/*"],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                setFiles(prev => ({ ...prev, [fieldName]: result.assets[0] }));
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleSubmit = () => {
        // Here you would typically upload files
        // For now, we'll just navigate
        // @ts-ignore
        navigation.navigate('HomeScreen'); // Or a summary screen
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
                            <Text className="text-center font-extrabold text-3xl text-slate-800 mb-2 tracking-tight">Document Uploads</Text>
                            <Text className="text-center text-slate-500 mb-10 text-base">Upload supporting documents to speed up your filing process.</Text>
                            
                            <View className="mb-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                                <Text className="text-xl font-bold text-indigo-700 mb-6">Upload Documents</Text>
                                <View className="flex-row flex-wrap -mx-2">
                                    {documentFields.map((field) => (
                                        <FilePickerField
                                            key={field.name}
                                            label={field.label}
                                            onPick={() => handleFilePick(field.name)}
                                            selectedFile={files[field.name]}
                                        />
                                    ))}
                                </View>
                            </View>
                            
                            {/* Buttons */}
                            <View className="flex-row gap-4 mt-10">
                                <TouchableOpacity activeOpacity={0.8} className="flex-1 py-3 rounded-xl bg-slate-200" onPress={handleBack}>
                                    <Text className="text-slate-700 font-bold text-lg text-center">Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.85} className="flex-1 rounded-xl shadow-md overflow-hidden" onPress={handleSubmit}>
                                    <LinearGradient colors={["#4f46e5", "#06b6d4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="py-3 w-full items-center justify-center">
                                        <Text className="text-white font-extrabold text-lg text-center">Finish</Text>
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