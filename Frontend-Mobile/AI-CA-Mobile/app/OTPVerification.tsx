import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OTPVerification = () => {
  const router = useRouter();
  const { email = '', redirectPath = '/(tabs)/HomeScreen' } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let interval: any;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtp(newOtp);
    if (error) setError('');
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimer(30);
    // TODO: Implement actual OTP resend logic here
    Alert.alert('OTP Resent', `A new OTP has been sent to ${email}`);
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all digits');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Replace with actual OTP verification
      if (otpString === '123456') { // Demo only
        router.replace(((typeof redirectPath === 'string' && redirectPath) ? redirectPath : '/(tabs)/HomeScreen') as any);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
      <View className="px-4 max-w-md w-full self-center">
        {/* Header */}
        <View className="items-center mb-8 mt-8">
          <Text className="text-2xl font-bold text-indigo-900 mb-2 text-center uppercase">OTP</Text>
          <Text className="text-xs text-gray-400 text-center mb-6">OTP SUCCESSFULLY SENT TO{"\n"}<Text className="font-medium text-gray-500">{email}</Text></Text>
        </View>
        {/* OTP Form */}
        <View className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mt-4">
          <View className="flex-row justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                value={digit}
                onChangeText={value => handleInputChange(index, value)}
                onKeyPress={e => handleKeyPress(index, e)}
                onSubmitEditing={() => index < 5 && inputRefs.current[index + 1]?.focus()}
                keyboardType="number-pad"
                maxLength={1}
                className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg ${error ? 'border-red-300' : 'border-gray-300'} bg-gray-50`}
                returnKeyType="next"
                selectTextOnFocus
              />
            ))}
          </View>
          {error ? <Text className="mb-2 text-sm text-red-600 text-center">{error}</Text> : null}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className="bg-indigo-500 rounded-lg h-14 justify-center items-center w-full mb-4"
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-bold">Submit</Text>
            )}
          </TouchableOpacity>
          {/* Resend OTP */}
          <View className="mt-2 items-center">
            {!canResend ? (
              <Text className="text-xs text-gray-400 tracking-widest">RESEND OTP IN  00:{timer.toString().padStart(2, '0')}</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text className="text-xs font-bold text-yellow-500 tracking-widest">RESEND</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPVerification;
