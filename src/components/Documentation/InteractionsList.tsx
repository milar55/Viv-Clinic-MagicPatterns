import React, { useState } from 'react';
import { SearchIcon, MessageSquareIcon, UserIcon, CalendarIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
const InteractionsList = ({
  patientId,
  onSelectInteraction
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  // Mock interactions data - would be fetched from API in real app
  const interactions = patientId ? getPatientInteractions(patientId) : getAllInteractions();
  const filteredInteractions = interactions.filter(interaction => {
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return interaction.patientName.toLowerCase().includes(searchLower) || interaction.provider.toLowerCase().includes(searchLower) || interaction.type.toLowerCase().includes(searchLower);
    }
    return true;
  }).filter(interaction => {
    // Filter by type
    if (filterType === 'all') return true;
    return interaction.interactionType === filterType;
  }).sort((a, b) => {
    // Sort by selected option
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'patient') {
      return a.patientName.localeCompare(b.patientName);
    } else if (sortBy === 'provider') {
      return a.provider.localeCompare(b.provider);
    }
    return 0;
  });
  return <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
        <div className="relative max-w-md w-full">
          <input type="text" placeholder="Search interactions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Types</option>
              <option value="chat">Chat</option>
              <option value="visit">In-Person</option>
              <option value="telehealth">Telehealth</option>
              <option value="phone">Phone Call</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="recent">Most Recent</option>
              <option value="patient">Patient Name</option>
              <option value="provider">Provider</option>
            </select>
            <ChevronDownIcon size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
      {filteredInteractions.length === 0 ? <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <MessageSquareIcon size={24} className="text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium mb-1">
            No interactions found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div> : <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  {!patientId && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInteractions.map(interaction => <tr key={interaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon size={16} className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {interaction.date}
                          </div>
                          <div className="text-sm text-gray-500">
                            {interaction.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    {!patientId && <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {interaction.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interaction.patientId}
                        </div>
                      </td>}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {interaction.provider}
                      </div>
                      <div className="text-sm text-gray-500">
                        {interaction.providerRole}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${getInteractionTypeStyles(interaction.interactionType)}`}>
                        {interaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {interaction.summary}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                      <button onClick={() => onSelectInteraction(interaction)} className="text-blue-600 hover:text-blue-900 font-medium">
                        Generate Notes
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}
    </div>;
};
// Helper function for styling interaction types
const getInteractionTypeStyles = type => {
  switch (type) {
    case 'chat':
      return 'bg-blue-100 text-blue-800';
    case 'visit':
      return 'bg-green-100 text-green-800';
    case 'telehealth':
      return 'bg-purple-100 text-purple-800';
    case 'phone':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
// Mock data functions
const getAllInteractions = () => {
  return [{
    id: 'I-1001',
    patientId: 'P-4872',
    patientName: 'Emma Wilson',
    provider: 'Dr. Jennifer Martinez',
    providerRole: 'OB/GYN',
    date: '2023-05-16',
    time: '10:30 AM',
    type: 'Post-Op Check',
    interactionType: 'visit',
    summary: 'Patient reported increased pain at incision site with redness and swelling. Fever of 100.2°F noted. Potential SSI suspected.',
    details: {
      chiefComplaint: 'Incision site pain and redness',
      vitals: {
        temperature: '100.2°F',
        pulse: '88',
        respiration: '20',
        bp: '132/84',
        pain: '8/10'
      },
      findings: 'Incision site shows redness, swelling, and is warm to touch. Patient reports throbbing pain.',
      assessments: ['Suspected surgical site infection', 'Post-cesarean section pain'],
      plans: ['Start on broader spectrum antibiotics', 'Increase wound checks', 'Follow-up in 24 hours']
    }
  }, {
    id: 'I-1002',
    patientId: 'P-4872',
    patientName: 'Emma Wilson',
    provider: 'Nurse Johnson',
    providerRole: 'RN',
    date: '2023-05-15',
    time: '3:45 PM',
    type: 'Wound Check',
    interactionType: 'visit',
    summary: 'Routine post-operative wound check. Incision appears to be healing appropriately with minimal redness.',
    details: {
      chiefComplaint: 'Routine follow-up',
      vitals: {
        temperature: '98.6°F',
        pulse: '76',
        respiration: '16',
        bp: '120/78',
        pain: '5/10'
      },
      findings: 'Incision appears clean with minimal redness. No discharge noted.',
      assessments: ['Normal post-operative healing', 'Well-controlled pain'],
      plans: ['Continue current medications', 'Patient education on wound care', 'Follow-up in 2 days']
    }
  }, {
    id: 'I-1003',
    patientId: 'P-3291',
    patientName: 'Sophia Chen',
    provider: 'Dr. William Johnson',
    providerRole: 'OB/GYN',
    date: '2023-05-15',
    time: '9:15 AM',
    type: 'Follow-up Visit',
    interactionType: 'visit',
    summary: 'Post-hysterectomy follow-up. Patient recovering well with minimal discomfort. Cleared for light activities.',
    details: {
      chiefComplaint: 'Post-surgical follow-up',
      vitals: {
        temperature: '98.4°F',
        pulse: '72',
        respiration: '16',
        bp: '118/76',
        pain: '2/10'
      },
      findings: 'Surgical site healing well. No signs of infection.',
      assessments: ['Uncomplicated post-hysterectomy recovery'],
      plans: ['Gradually increase activity', 'Continue pelvic floor exercises', 'Follow-up in 2 weeks']
    }
  }, {
    id: 'I-1004',
    patientId: 'P-7634',
    patientName: 'Isabella Rodriguez',
    provider: 'Dr. Sarah Chen',
    providerRole: 'OB/GYN',
    date: '2023-05-14',
    time: '2:00 PM',
    type: 'Telehealth Consult',
    interactionType: 'telehealth',
    summary: 'Discussed post-cystectomy recovery. Patient experiencing mild discomfort but no concerning symptoms.',
    details: {
      chiefComplaint: 'Mild abdominal discomfort',
      findings: 'Patient reports mild discomfort but is able to perform daily activities. No fever or abnormal discharge reported.',
      assessments: ['Normal post-operative recovery'],
      plans: ['Continue current medications', 'Increase fluid intake', 'In-person follow-up next week']
    }
  }, {
    id: 'I-1005',
    patientId: 'P-4872',
    patientName: 'Emma Wilson',
    provider: 'Clinical Assistant',
    providerRole: 'AI Support',
    date: '2023-05-16',
    time: '8:30 AM',
    type: 'Remote Check-in',
    interactionType: 'chat',
    summary: 'Patient reported severe pain (8/10) at incision site with redness and swelling. Elevated temperature of 100.2°F reported.',
    details: {
      chiefComplaint: 'Severe incision pain and fever',
      findings: 'Patient reports pain rated 8/10 at incision site. Describes redness, swelling, and warmth. Reports temperature of 100.2°F.',
      assessments: ['Potential surgical site infection'],
      plans: ['Escalated to clinical team', 'Scheduled same-day appointment']
    }
  }, {
    id: 'I-1006',
    patientId: 'P-5142',
    patientName: 'Olivia Johnson',
    provider: 'Nurse Williams',
    providerRole: 'RN',
    date: '2023-05-15',
    time: '11:30 AM',
    type: 'Phone Consultation',
    interactionType: 'phone',
    summary: 'Discussed post-procedure care and medication management. Patient reports good progress with minimal discomfort.',
    details: {
      chiefComplaint: 'Routine check-in',
      findings: 'Patient reports minimal discomfort and is following medication schedule appropriately.',
      assessments: ['Good post-procedure recovery'],
      plans: ['Continue current treatment plan', 'Follow-up appointment next week']
    }
  }];
};
const getPatientInteractions = patientId => {
  return getAllInteractions().filter(interaction => interaction.patientId === patientId);
};
export default InteractionsList;