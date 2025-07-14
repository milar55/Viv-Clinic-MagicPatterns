import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, FileTextIcon, ClipboardCheckIcon, SendIcon, DownloadIcon, PrinterIcon, ListIcon, ClipboardIcon, CheckCircleIcon, PlusIcon, CalendarIcon, UserIcon, MessageSquareIcon } from 'lucide-react';
import DocumentGenerator from '../components/Documentation/DocumentGenerator';
import DocumentTemplate from '../components/Documentation/DocumentTemplate';
import InteractionsList from '../components/Documentation/InteractionsList';
import SoapNoteGenerator from '../components/Documentation/SoapNoteGenerator';
const DocumentationPage = () => {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('interactions');
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [showSoapGenerator, setShowSoapGenerator] = useState(false);
  // Mocked patient data
  const patient = {
    id: id || 'P-4872',
    name: 'Emma Wilson',
    age: 34,
    procedure: 'Cesarean Section',
    procedureDate: 'May 15, 2023',
    status: 'critical'
  };
  const handleInteractionSelect = interaction => {
    setSelectedInteraction(interaction);
    setShowSoapGenerator(true);
  };
  const handleBackToInteractions = () => {
    setShowSoapGenerator(false);
    setSelectedInteraction(null);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/patient/${patient.id}`} className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
            {id && <p className="text-sm text-gray-500">
                {patient.name} • {patient.id} • {patient.procedure}
              </p>}
          </div>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'interactions' && !showSoapGenerator && <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <CalendarIcon size={16} className="mr-1.5" />
              Filter by Date
            </button>}
          {showSoapGenerator && <>
              <button onClick={handleBackToInteractions} className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <ArrowLeftIcon size={16} className="mr-1.5" />
                Back to Interactions
              </button>
              <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <PrinterIcon size={16} className="mr-1.5" />
                Print
              </button>
            </>}
          {!showSoapGenerator && <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <PlusIcon size={16} className="mr-1.5" />
              New Documentation
            </button>}
        </div>
      </div>
      {!showSoapGenerator ? <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button onClick={() => setActiveTab('interactions')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'interactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <div className="flex items-center">
                  <ListIcon size={16} className="mr-1.5" />
                  Recent Interactions
                </div>
              </button>
              <button onClick={() => setActiveTab('generator')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'generator' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <div className="flex items-center">
                  <FileTextIcon size={16} className="mr-1.5" />
                  Document Generator
                </div>
              </button>
              <button onClick={() => setActiveTab('templates')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'templates' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <div className="flex items-center">
                  <ClipboardCheckIcon size={16} className="mr-1.5" />
                  Templates
                </div>
              </button>
            </nav>
          </div>
          <div className="p-4">
            {activeTab === 'interactions' && <InteractionsList patientId={id} onSelectInteraction={handleInteractionSelect} />}
            {activeTab === 'generator' && <DocumentGenerator patient={patient} />}
            {activeTab === 'templates' && <DocumentTemplate patient={patient} />}
          </div>
        </div> : <SoapNoteGenerator interaction={selectedInteraction} patientId={id} />}
    </div>;
};
export default DocumentationPage;