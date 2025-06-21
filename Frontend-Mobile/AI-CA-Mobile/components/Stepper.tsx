import React from 'react';
import { View, Text, ScrollView } from 'react-native';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <View className="mb-12">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'flex-start' }}>
        <View className="flex-row items-center">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            let circleStyle = 'bg-indigo-100 border-indigo-100';
            let textStyle = 'text-indigo-500';
            let labelStyle = 'text-gray-400';

            if (isActive) {
              circleStyle = 'bg-[#4F46E5] border-[#4F46E5]';
              textStyle = 'text-white';
              labelStyle = 'text-[#4F46E5]';
            } else if (isCompleted) {
              circleStyle = 'bg-green-500 border-green-500';
              textStyle = 'text-white';
              labelStyle = 'text-[#4F46E5]';
            }

            return (
              <React.Fragment key={stepNumber}>
                <View className="flex-col items-center">
                  <View className={`w-9 h-9 rounded-full items-center justify-center border-2 ${circleStyle}`}>
                    {isCompleted ? <Text className="text-white font-extrabold text-lg">✓</Text> : <Text className={`font-extrabold text-lg ${textStyle}`}>{stepNumber}</Text>}
                  </View>
                  <Text className={`mt-2 text-xs font-bold ${labelStyle}`}>{label}</Text>
                </View>
                {stepNumber < steps.length && <View className="h-0.5 w-6 bg-indigo-100 mx-2" />}
              </React.Fragment>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
} 