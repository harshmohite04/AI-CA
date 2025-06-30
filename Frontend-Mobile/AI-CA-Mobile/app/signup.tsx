import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const SignupPage = () => {
  const router = useRouter();
  const contentStyle = { flex: 1, justifyContent: 'center' as const, paddingHorizontal: 16, paddingVertical: 32 };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'password') checkPasswordStrength(value);
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let feedback = '';
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score === 0) feedback = 'Very weak';
    else if (score === 1) feedback = 'Weak';
    else if (score === 2) feedback = 'Fair';
    else if (score === 3) feedback = 'Good';
    else if (score === 4) feedback = 'Strong';
    else feedback = 'Very strong';
    setPasswordStrength({ score, feedback });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-red-500';
    if (passwordStrength.score <= 2) return 'bg-orange-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    if (passwordStrength.score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (passwordStrength.score < 3) newErrors.password = 'Password is too weak';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreed) newErrors.agreed = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({ pathname: '/OTPVerification', params: { email: formData.email, redirectPath: '/(tabs)/HomeScreen' } });
    }, 2000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={contentStyle}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-indigo-600 justify-center items-center mb-4">
            <Ionicons name="person-outline" size={32} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
          <Text className="text-gray-600">Join us and start your journey today</Text>
        </View>
        {/* Signup Form */}
        <View className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Name Fields */}
          <View className="flex-row gap-4 mb-2">
            <View className="flex-1">
              <Text className="block text-sm font-medium text-gray-700 mb-2">First Name</Text>
              <TextInput
                className={`w-full px-3 py-3 border rounded-lg text-sm mb-1 ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="John"
                value={formData.firstName}
                onChangeText={text => handleChange('firstName', text)}
              />
              {errors.firstName && <Text className="mt-1 text-xs text-red-600">{errors.firstName}</Text>}
            </View>
            <View className="flex-1">
              <Text className="block text-sm font-medium text-gray-700 mb-2">Last Name</Text>
              <TextInput
                className={`w-full px-3 py-3 border rounded-lg text-sm mb-1 ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
              />
              {errors.lastName && <Text className="mt-1 text-xs text-red-600">{errors.lastName}</Text>}
            </View>
          </View>
          {/* Email Field */}
          <View className="mb-2">
            <Text className="block text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <View className="flex-row items-center border rounded-lg bg-gray-50 mb-1 px-1 ${errors.email ? 'border-red-300' : 'border-gray-300'}">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" className="ml-2" />
              <TextInput
                className="flex-1 h-12 px-3 text-base text-gray-900"
                placeholder="john.doe@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
            </View>
            {errors.email && <Text className="mt-1 text-xs text-red-600">{errors.email}</Text>}
          </View>
          {/* Password Field */}
          <View className="mb-2">
            <Text className="block text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="relative flex-row items-center border rounded-lg bg-gray-50 mb-1 px-1 ${errors.password ? 'border-red-300' : 'border-gray-300'}">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" className="ml-2" />
              <TextInput
                className="flex-1 h-12 px-3 text-base text-gray-900"
                placeholder="Create a strong password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-2">
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {/* Password Strength Indicator */}
            {formData.password && (
              <View className="mt-2">
                <View className="flex-row items-center justify-between text-xs text-gray-600 mb-1">
                  <Text>Password strength:</Text>
                  <Text className={`font-medium ${passwordStrength.score <= 1 ? 'text-red-600' : passwordStrength.score <= 2 ? 'text-orange-600' : passwordStrength.score <= 3 ? 'text-yellow-600' : passwordStrength.score <= 4 ? 'text-blue-600' : 'text-green-600'}`}>{passwordStrength.feedback}</Text>
                </View>
                <View className="w-full bg-gray-200 rounded-full h-2">
                  <View className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength.score / 5) * 100}%` }} />
                </View>
              </View>
            )}
            {errors.password && <Text className="mt-1 text-xs text-red-600">{errors.password}</Text>}
          </View>
          {/* Confirm Password Field */}
          <View className="mb-2">
            <Text className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
            <View className={`relative flex-row items-center border rounded-lg bg-gray-50 mb-1 px-1 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}> 
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" className="ml-2" />
              <TextInput
                className="flex-1 h-12 px-3 text-base text-gray-900"
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="px-2">
                <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text className="mt-1 text-xs text-red-600">{errors.confirmPassword}</Text>}
          </View>
          {/* Terms and Conditions */}
          <View className="flex-row items-start mb-4 mt-2">
            <TouchableOpacity onPress={() => setAgreed(!agreed)} className="flex-row items-center mt-1">
              <Ionicons name={agreed ? 'checkbox' : 'square-outline'} size={20} color={agreed ? '#22c55e' : '#4B5563'} />
            </TouchableOpacity>
            <Text className="ml-3 text-sm text-gray-700 flex-1">
              I agree to the <Text className="text-blue-600 font-medium">Terms of Service</Text> and <Text className="text-blue-600 font-medium">Privacy Policy</Text>
            </Text>
          </View>
          {errors.agreed && <Text className="text-xs text-red-600 mb-2">{errors.agreed}</Text>}
          {/* Submit Button */}
          <TouchableOpacity
            className="bg-indigo-600 rounded-lg h-14 justify-center items-center"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color="#fff" />
                <Text className="ml-2 text-white">Creating account...</Text>
              </View>
            ) : (
              <View className="flex-row items-center justify-center">
                <Text className="text-white text-base font-bold">Create Account</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#fff" className="ml-2" />
              </View>
            )}
          </TouchableOpacity>
          {/* Divider */}
          <View className="mt-6">
            <View className="flex-row items-center">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-2 text-gray-500">Or sign up with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
          </View>
          {/* Social Signup Buttons */}
          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white">
              <Ionicons name="logo-google" size={20} color="#ea4335" />
              <Text className="ml-2 text-gray-500 font-medium">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white">
              <Ionicons name="logo-facebook" size={20} color="#1877f3" />
              <Text className="ml-2 text-gray-500 font-medium">Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Sign In Link */}
        <TouchableOpacity className="mt-8" onPress={() => router.replace('/LoginPage')}>
          <Text className="text-center text-gray-600 text-sm">
            Already have an account? <Text className="text-blue-600 font-bold">Sign in here</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupPage;