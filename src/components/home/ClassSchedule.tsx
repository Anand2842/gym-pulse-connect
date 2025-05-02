
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const classes = [
  {
    name: "Morning Yoga",
    time: "6:00 AM - 7:00 AM",
    days: ["Monday", "Wednesday", "Friday"],
    trainer: "Ananya Singh",
    level: "All Levels"
  },
  {
    name: "HIIT Workout",
    time: "7:30 AM - 8:30 AM",
    days: ["Tuesday", "Thursday", "Saturday"],
    trainer: "Vikram Mehta",
    level: "Intermediate"
  },
  {
    name: "Strength Training",
    time: "6:00 PM - 7:30 PM",
    days: ["Monday", "Wednesday", "Friday"],
    trainer: "Rahul Verma",
    level: "Beginner to Advanced"
  },
  {
    name: "Zumba",
    time: "6:30 PM - 7:30 PM",
    days: ["Tuesday", "Thursday"],
    trainer: "Meera Kapoor",
    level: "All Levels"
  }
];

const ClassSchedule = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gym-primary" />
            <h3 className="text-xl font-semibold">Weekly Class Schedule</h3>
          </div>
          <span className="text-sm text-gray-500">Updated Weekly</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flow-root">
          <ul className="divide-y divide-gray-100">
            {classes.map((cls, index) => (
              <li key={index} className="py-4 px-2 hover:bg-gray-50 transition-colors duration-150 rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{cls.name}</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {cls.time}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Instructor: {cls.trainer}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {cls.level}
                    </span>
                    <div className="mt-2 text-xs">
                      {cls.days.join(' • ')}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
