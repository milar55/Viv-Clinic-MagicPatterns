import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, CheckCircleIcon, ClockIcon, UserIcon } from 'lucide-react';
import AlertsPanel from '../components/Dashboard/AlertsPanel';
import PatientList from '../components/Dashboard/PatientList';
const Dashboard = () => {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">
            Add Patient
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">248</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <UserIcon size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <span className="font-medium">+3.2%</span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Pending Responses</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-md">
              <ClockIcon size={20} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-yellow-600 flex items-center">
            <span className="font-medium">12</span>
            <span className="ml-1">requiring follow-up</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">7</p>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <AlertTriangleIcon size={20} className="text-red-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <span className="font-medium">3</span>
            <span className="ml-1">escalated to MD</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Completed Follow-ups</p>
              <p className="text-2xl font-bold text-gray-900">189</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <CheckCircleIcon size={20} className="text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <span className="font-medium">+14</span>
            <span className="ml-1">today</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientList />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
    </div>;
};
export default Dashboard;