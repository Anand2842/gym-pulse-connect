
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

const Workout = () => {
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '', weight: '' }
  ]);
  
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  
  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };
  
  const removeExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };
  
  const updateExercise = (index: number, field: string, value: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { 
      ...updatedExercises[index], 
      [field]: value 
    };
    setExercises(updatedExercises);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast.success("Workout logged successfully!");
    
    // Reset form
    setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
    setDuration('');
    setNotes('');
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Workout Logger</h1>
          <p className="text-gray-600">Track your exercises and progress</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Log Today's Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="duration">Workout Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Exercises</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addExercise}
                        className="h-8"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Exercise
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {exercises.map((exercise, index) => (
                        <div key={index} className="border rounded-md p-4 relative">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExercise(index)}
                            disabled={exercises.length === 1}
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`exercise-${index}`}>Exercise Name</Label>
                              <Input
                                id={`exercise-${index}`}
                                value={exercise.name}
                                onChange={(e) => updateExercise(index, 'name', e.target.value)}
                                className="mt-1"
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label htmlFor={`sets-${index}`}>Sets</Label>
                                <Input
                                  id={`sets-${index}`}
                                  type="number"
                                  min="1"
                                  value={exercise.sets}
                                  onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                                  className="mt-1"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`reps-${index}`}>Reps</Label>
                                <Input
                                  id={`reps-${index}`}
                                  type="number"
                                  min="1"
                                  value={exercise.reps}
                                  onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                                  className="mt-1"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`weight-${index}`}>Weight (kg)</Label>
                                <Input
                                  id={`weight-${index}`}
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  value={exercise.weight}
                                  onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1"
                      placeholder="Optional notes about your workout"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gym-primary hover:bg-blue-600">
                    Save Workout
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Tips & Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Workout Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Stay Consistent</h3>
                  <p className="text-sm text-gray-600">
                    Consistency is key to seeing results from your workouts.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Track Your Progress</h3>
                  <p className="text-sm text-gray-600">
                    Keep track of weights, sets, and reps to see your improvement over time.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Rest & Recovery</h3>
                  <p className="text-sm text-gray-600">
                    Allow muscles to recover with adequate rest between workouts.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Common Exercises</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Bench Press</li>
                    <li>• Squats</li>
                    <li>• Deadlifts</li>
                    <li>• Pull-ups</li>
                    <li>• Shoulder Press</li>
                    <li>• Lunges</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Workout;
