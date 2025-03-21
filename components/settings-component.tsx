"use client"
import { Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { string } from 'zod';


const SettingsScreen = () => (
  <div className="p-4 text-center">
    <h2 className="text-xl font-bold mb-4">Settings</h2>  
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-3 bg-gray-100 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
          </div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

  export { SettingsScreen };