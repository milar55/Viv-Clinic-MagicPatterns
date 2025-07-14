import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ClipboardIcon, AlertCircleIcon } from 'lucide-react';
const SoapNoteGenerator = ({
  interaction,
  patientId
}) => {
  const [note, setNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // Pre-populate the form with data from the interaction
  useEffect(() => {
    if (interaction) {
      setIsGenerating(true);
      // Simulate API call to generate SOAP note
      setTimeout(() => {
        // Generate SOAP note based on interaction data
        const generatedNote = generateSoapNote(interaction);
        setNote(generatedNote);
        setIsGenerating(false);
      }, 1500);
    }
  }, [interaction]);
  const handleChange = (section, value) => {
    setNote(prev => ({
      ...prev,
      [section]: value
    }));
  };
  const handleGenerateNote = () => {
    setIsGenerating(true);
    // Simulate API call to generate SOAP note
    setTimeout(() => {
      const generatedNote = generateSoapNote(interaction);
      setNote(generatedNote);
      setIsGenerating(false);
    }, 1500);
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call to submit to EHR
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };
  return <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              SOAP Note Generator
            </h2>
            <p className="text-sm text-gray-500">
              {interaction ? <>
                  Based on {interaction.type} with {interaction.patientName} on{' '}
                  {interaction.date}
                </> : 'Create a new clinical note in SOAP format'}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex space-x-3">
            <button onClick={handleGenerateNote} disabled={isGenerating} className={`px-4 py-2 text-sm font-medium rounded-md ${isGenerating ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              {isGenerating ? 'Generating...' : 'Regenerate Note'}
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting || isSubmitted} className={`px-4 py-2 text-sm font-medium rounded-md ${isSubmitting || isSubmitted ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted to EHR' : 'Submit to EHR'}
            </button>
          </div>
        </div>
      </div>
      {isSubmitted && <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
          <CheckCircleIcon size={20} className="text-green-600 mr-2" />
          <span className="text-green-800">
            Note successfully submitted to Electronic Health Record
          </span>
        </div>}
      {isGenerating ? <div className="p-8 flex flex-col items-center justify-center">
          <div className="animate-pulse mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <ClipboardIcon size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Generating SOAP Note
          </h3>
          <p className="text-gray-500">
            Analyzing patient data and interaction details...
          </p>
        </div> : <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  S - Subjective
                </label>
                <span className="text-xs text-gray-500">
                  Patient's reported symptoms and concerns
                </span>
              </div>
              <textarea value={note.subjective} onChange={e => handleChange('subjective', e.target.value)} className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Document patient's reported symptoms, concerns, and history..." />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  O - Objective
                </label>
                <span className="text-xs text-gray-500">
                  Measurable, observable data
                </span>
              </div>
              <textarea value={note.objective} onChange={e => handleChange('objective', e.target.value)} className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Document vital signs, test results, physical examination findings..." />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  A - Assessment
                </label>
                <span className="text-xs text-gray-500">
                  Clinical analysis and diagnosis
                </span>
              </div>
              <textarea value={note.assessment} onChange={e => handleChange('assessment', e.target.value)} className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Document your assessment, diagnosis, or differential diagnosis..." />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  P - Plan
                </label>
                <span className="text-xs text-gray-500">
                  Treatment plan and next steps
                </span>
              </div>
              <textarea value={note.plan} onChange={e => handleChange('plan', e.target.value)} className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Document treatment plan, medications, follow-up, patient education..." />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="finalize" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="finalize" className="ml-2 text-sm text-gray-700">
                  I confirm this note is accurate and complete
                </label>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString()} • Dr. Sarah Chen
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
// Helper function to generate SOAP note based on interaction data
const generateSoapNote = interaction => {
  if (!interaction) return {
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  };
  const {
    details
  } = interaction;
  return {
    subjective: `Patient presents for ${interaction.type.toLowerCase()}. ${details?.chiefComplaint ? `Chief complaint: "${details.chiefComplaint}". ` : ''}Patient reports ${interaction.summary}`,
    objective: details?.vitals ? `Vitals: Temperature ${details.vitals.temperature}, Pulse ${details.vitals.pulse} bpm, Respiration ${details.vitals.respiration} breaths/min, BP ${details.vitals.bp}, Pain ${details.vitals.pain}.\n\n${details.findings || ''}` : `${details?.findings || 'No objective data recorded.'}`,
    assessment: details?.assessments ? details.assessments.join('\n') : 'Assessment pending additional information.',
    plan: details?.plans ? details.plans.join('\n') : 'Plan to be determined following complete evaluation.'
  };
};
export default SoapNoteGenerator;