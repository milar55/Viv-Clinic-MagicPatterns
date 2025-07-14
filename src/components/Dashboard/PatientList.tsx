import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, MessageSquareIcon, FileTextIcon } from 'lucide-react';
const PatientList = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const patients = [{
    id: 'P-4872',
    name: 'Emma Wilson',
    age: 34,
    procedure: 'Cesarean Section',
    date: 'May 15, 2023',
    status: 'critical',
    lastContact: '10 mins ago'
  }, {
    id: 'P-3291',
    name: 'Sophia Chen',
    age: 42,
    procedure: 'Total Hysterectomy',
    date: 'May 12, 2023',
    status: 'warning',
    lastContact: '32 mins ago'
  }, {
    id: 'P-7634',
    name: 'Isabella Rodriguez',
    age: 39,
    procedure: 'Ovarian Cystectomy',
    date: 'May 10, 2023',
    status: 'stable',
    lastContact: '1 hour ago'
  }, {
    id: 'P-5142',
    name: 'Olivia Johnson',
    age: 45,
    procedure: 'Endometrial Ablation',
    date: 'May 8, 2023',
    status: 'warning',
    lastContact: '2 hours ago'
  }, {
    id: 'P-6023',
    name: 'Ava Brown',
    age: 29,
    procedure: 'Childbirth',
    date: 'May 7, 2023',
    status: 'stable',
    lastContact: '3 hours ago'
  }, {
    id: 'P-9127',
    name: 'Charlotte Davis',
    age: 51,
    procedure: 'Laparoscopic Myomectomy',
    date: 'May 5, 2023',
    status: 'stable',
    lastContact: '1 day ago'
  }];
  const getStatusBadge = status => {
    switch (status) {
      case 'critical':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Critical
          </span>;
      case 'warning':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Needs Attention
          </span>;
      case 'stable':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Stable
          </span>;
      default:
        return null;
    }
  };
  return <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
        <h2 className="font-semibold text-gray-900">Recent Patients</h2>
        <div className="flex space-x-2">
          <select value={filterBy} onChange={e => setFilterBy(e.target.value)} className="text-sm border border-gray-300 rounded px-2 py-1">
            <option value="all">All Patients</option>
            <option value="critical">Critical</option>
            <option value="warning">Needs Attention</option>
            <option value="stable">Stable</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-300 rounded px-2 py-1">
            <option value="recent">Most Recent</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Procedure</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Contact</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map(patient => <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <Link to={`/patient/${patient.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {patient.name}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {patient.age} years • {patient.id}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {patient.procedure}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {patient.date}
                </td>
                <td className="px-4 py-3">{getStatusBadge(patient.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {patient.lastContact}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link to={`/chat/${patient.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <MessageSquareIcon size={16} />
                    </Link>
                    <Link to={`/documentation/${patient.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <FileTextIcon size={16} />
                    </Link>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm">
        <span className="text-gray-600">Showing 6 of 248 patients</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-blue-600 rounded bg-blue-600 text-white hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>;
};
export default PatientList;