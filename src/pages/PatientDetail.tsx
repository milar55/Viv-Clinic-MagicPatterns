import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, MessageSquareIcon, FileTextIcon, BellIcon, PhoneIcon } from 'lucide-react';
const PatientDetail = () => {
  const {
    id
  } = useParams();
  // Mocked patient data
  const patient = {
    id: id || 'P-4872',
    name: 'Emma Wilson',
    age: 34,
    dob: '04/12/1989',
    gender: 'Female',
    contact: '(555) 123-4567',
    email: 'emma.wilson@example.com',
    address: '123 Main St, Anytown, ST 12345',
    procedure: 'Cesarean Section',
    procedureDate: 'May 15, 2023',
    physician: 'Dr. Jennifer Martinez',
    status: 'critical',
    allergies: ['Penicillin', 'Latex'],
    medications: [{
      name: 'Ibuprofen',
      dosage: '600mg',
      frequency: 'Every 6 hours'
    }, {
      name: 'Oxycodone',
      dosage: '5mg',
      frequency: 'Every 4-6 hours as needed for pain'
    }, {
      name: 'Cephalexin',
      dosage: '500mg',
      frequency: 'Every 8 hours'
    }],
    vitalSigns: [{
      date: 'May 16, 2023 - 08:00',
      temperature: '99.1°F',
      pulse: '78',
      respiration: '16',
      bp: '122/78',
      pain: '6/10'
    }, {
      date: 'May 15, 2023 - 20:00',
      temperature: '99.5°F',
      pulse: '82',
      respiration: '18',
      bp: '128/82',
      pain: '7/10'
    }, {
      date: 'May 15, 2023 - 14:00',
      temperature: '100.2°F',
      pulse: '88',
      respiration: '20',
      bp: '132/84',
      pain: '8/10'
    }],
    notes: [{
      date: 'May 15, 2023 - 16:30',
      author: 'Dr. Martinez',
      content: 'Patient recovering from C-section. Incision appears clean. Pain management adequate but will monitor closely.'
    }, {
      date: 'May 15, 2023 - 12:00',
      author: 'Nurse Johnson',
      content: 'Patient reports increased pain at incision site. Administered pain medication as prescribed.'
    }]
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-sm text-gray-500">
              {patient.id} • {patient.age} years • {patient.procedure}
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Critical
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <PhoneIcon size={16} className="mr-1.5" />
            Call Patient
          </button>
          <Link to={`/chat/${patient.id}`} className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <MessageSquareIcon size={16} className="mr-1.5" />
            Message
          </Link>
          <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <BellIcon size={16} className="mr-1.5" />
            Set Alert
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                Patient Information
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Date of Birth
                </p>
                <p className="text-sm text-gray-900">
                  {patient.dob} ({patient.age} years)
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Gender</p>
                <p className="text-sm text-gray-900">{patient.gender}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Contact</p>
                <p className="text-sm text-gray-900">{patient.contact}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{patient.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Address</p>
                <p className="text-sm text-gray-900">{patient.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Procedure</p>
                <p className="text-sm text-gray-900">{patient.procedure}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Procedure Date
                </p>
                <p className="text-sm text-gray-900">{patient.procedureDate}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Attending Physician
                </p>
                <p className="text-sm text-gray-900">{patient.physician}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Allergies</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.allergies.map((allergy, index) => <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-red-50 text-red-700 border border-red-100">
                      {allergy}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Medications</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {patient.medications.map((medication, index) => <div key={index} className="p-4">
                  <p className="font-medium text-gray-900">{medication.name}</p>
                  <p className="text-sm text-gray-600">
                    {medication.dosage} • {medication.frequency}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between">
              <h2 className="font-semibold text-gray-900">Vital Signs</h2>
              <Link to="/vitals" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Date/Time</th>
                    <th className="px-4 py-2 text-left">Temp</th>
                    <th className="px-4 py-2 text-left">Pulse</th>
                    <th className="px-4 py-2 text-left">Resp</th>
                    <th className="px-4 py-2 text-left">BP</th>
                    <th className="px-4 py-2 text-left">Pain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patient.vitalSigns.map((vital, index) => <tr key={index} className={index === 0 ? 'bg-blue-50' : ''}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {vital.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {vital.temperature}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {vital.pulse}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {vital.respiration}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {vital.bp}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {vital.pain}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between">
              <h2 className="font-semibold text-gray-900">
                Notes & Observations
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Add Note
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {patient.notes.map((note, index) => <div key={index} className="p-4">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {note.author}
                    </p>
                    <p className="text-xs text-gray-500">{note.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{note.content}</p>
                </div>)}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Follow-up Actions</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Send Pain Assessment Questionnaire
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Automated questionnaire to assess current pain levels and
                    medication effectiveness
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Send Now
                </button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Schedule Video Consultation
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Virtual check-in with attending physician
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Schedule
                </button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Generate Progress Report
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Create automated summary of patient recovery progress
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Generate
                </button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-600 font-medium">
                    Escalate to Attending Physician
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Immediately notify Dr. Martinez of critical patient status
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PatientDetail;