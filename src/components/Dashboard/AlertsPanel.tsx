import React from 'react';
import { AlertCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const AlertsPanel = () => {
  const alerts = [{
    id: 1,
    patient: 'Emma Wilson',
    patientId: 'P-4872',
    message: 'Reported severe pain (8/10) after cesarean section',
    time: '10 mins ago',
    severity: 'high'
  }, {
    id: 2,
    patient: 'Sophia Chen',
    patientId: 'P-3291',
    message: 'Fever of 101.3°F following hysterectomy',
    time: '32 mins ago',
    severity: 'high'
  }, {
    id: 3,
    patient: 'Isabella Rodriguez',
    patientId: 'P-7634',
    message: 'Missed medication dose for 2 consecutive days',
    time: '1 hour ago',
    severity: 'medium'
  }, {
    id: 4,
    patient: 'Olivia Johnson',
    patientId: 'P-5142',
    message: 'Incision site shows signs of infection',
    time: '2 hours ago',
    severity: 'high'
  }, {
    id: 5,
    patient: 'Ava Brown',
    patientId: 'P-6023',
    message: 'Reported dizziness after standing',
    time: '3 hours ago',
    severity: 'medium'
  }];
  return <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">Critical Alerts</h2>
        <Link to="/alerts" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View all <ArrowRightIcon size={14} className="ml-1" />
        </Link>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.map(alert => <div key={alert.id} className={`px-4 py-3 ${alert.severity === 'high' ? 'bg-red-50' : ''}`}>
            <div className="flex items-start">
              <div className={`mt-0.5 p-1 rounded-full ${alert.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                <AlertCircleIcon size={14} className={alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {alert.patient}
                    </p>
                    <p className="text-xs text-gray-500">{alert.patientId}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
              </div>
            </div>
            <div className="mt-2 flex space-x-2 justify-end">
              <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                Dismiss
              </button>
              <Link to={`/patient/${alert.patientId}`} className="px-2 py-1 text-xs bg-blue-600 rounded text-white hover:bg-blue-700">
                View Patient
              </Link>
            </div>
          </div>)}
      </div>
    </div>;
};
export default AlertsPanel;