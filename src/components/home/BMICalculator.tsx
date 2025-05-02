
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculation } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (isNaN(heightInM) || isNaN(weightInKg) || heightInM <= 0 || weightInKg <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }
    
    const calculatedBMI = weightInKg / (heightInM * heightInM);
    setBmi(parseFloat(calculatedBMI.toFixed(1)));
    
    // Categorize BMI
    if (calculatedBMI < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setCategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBMI();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Calculation className="h-6 w-6 text-gym-primary" />
        <h3 className="text-xl font-semibold">BMI Calculator</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 170"
            required
            min="50"
            max="250"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            required
            min="20"
            max="300"
          />
        </div>
        
        <Button type="submit" className="w-full bg-gym-primary hover:bg-blue-600">
          Calculate BMI
        </Button>
      </form>
      
      {bmi !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-center mb-2">
            Your BMI: <span className="font-bold text-lg">{bmi}</span>
          </p>
          <p className="text-center text-sm">
            Category: <span className={`font-medium ${
              category === 'Normal weight' ? 'text-green-600' : 
              category === 'Underweight' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>{category}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2 text-center">
            BMI is a screening tool, not a diagnostic tool. Consult with our trainers for a personalized fitness plan.
          </p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
