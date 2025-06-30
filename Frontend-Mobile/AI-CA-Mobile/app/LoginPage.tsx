import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, navigate to home page
      // In real app, you would handle authentication here
      router.replace('/(tabs)/HomeScreen');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100 justify-center"
    >
      <View className="px-4">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-indigo-600 justify-center items-center mb-4">
            <Ionicons name="person-outline" size={32} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-base text-gray-500 mt-1">Sign in to your account to continue</Text>
        </View>

        {/* Login Form */}
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Email Field */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <View className={`flex-row items-center border rounded-lg bg-gray-50 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
              <View className="pl-3">
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="flex-1 h-12 px-3 text-base text-gray-900"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
          </View>

          {/* Password Field */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className={`flex-row items-center border rounded-lg bg-gray-50 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
              <View className="pl-3">
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              </View>
              <TextInput
                className="flex-1 h-12 px-3 text-base text-gray-900"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-3">
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center" accessibilityRole="checkbox" accessibilityState={{ checked: rememberMe }}>
              <Ionicons name={rememberMe ? "checkbox" : "square-outline"} size={20} color={rememberMe ? '#22c55e' : '#4B5563'} />
              <Text className="ml-2 text-gray-600">Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text className="text-indigo-600 font-medium">Forgot password?</Text>
            </TouchableOpacity>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className="bg-indigo-600 rounded-lg h-14 justify-center items-center"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-base font-bold">Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-gray-500">Don't have an account?{' '}</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-indigo-600 font-bold">Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage; 