import React from 'react';
import { FileTextIcon, StarIcon, ClockIcon } from 'lucide-react';
const DocumentTemplate = ({
  patient
}) => {
  const templates = [{
    id: 1,
    name: 'Post-Surgical Progress Note',
    description: 'Standard template for documenting patient progress after gynecological surgery',
    category: 'Progress Notes',
    starred: true,
    lastUsed: '2 days ago'
  }, {
    id: 2,
    name: 'Wound Assessment',
    description: 'Detailed template for wound evaluation and documentation',
    category: 'Assessment',
    starred: true,
    lastUsed: '5 days ago'
  }, {
    id: 3,
    name: 'Pain Management Plan',
    description: 'Template for creating personalized pain management protocols',
    category: 'Care Plans',
    starred: false,
    lastUsed: '1 week ago'
  }, {
    id: 4,
    name: 'Discharge Instructions - Cesarean Section',
    description: 'Comprehensive discharge instructions for C-section patients',
    category: 'Discharge',
    starred: false,
    lastUsed: '2 weeks ago'
  }, {
    id: 5,
    name: 'Prenatal Visit Summary',
    description: 'Form for documenting routine prenatal check-ups',
    category: 'Prenatal Care',
    starred: false,
    lastUsed: '3 weeks ago'
  }, {
    id: 6,
    name: 'Postpartum Follow-up',
    description: 'Template for documenting postpartum recovery progress',
    category: 'Postpartum',
    starred: false,
    lastUsed: '1 month ago'
  }];
  return <div>
      <div className="mb-4">
        <div className="relative">
          <input type="text" placeholder="Search templates..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => <div key={template.id} className="border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                    <FileTextIcon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                </div>
                <button className={`p-1 rounded-full ${template.starred ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}>
                  <StarIcon size={16} fill={template.starred ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {template.description}
              </p>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <ClockIcon size={12} className="mr-1" />
                <span>Last used {template.lastUsed}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 flex justify-end">
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Use Template
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};
export default DocumentTemplate;