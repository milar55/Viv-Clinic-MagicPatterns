import React, { useState } from 'react';
import { XIcon, SaveIcon, EditIcon, PrinterIcon, CheckIcon, AlertTriangleIcon } from 'lucide-react';
const ChatSummary = ({
  summary,
  onSave,
  onClose
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const handleEdit = () => {
    setIsEditing(true);
    setEditedSummary({
      ...summary
    });
  };
  const handleSave = () => {
    onSave(editedSummary);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedSummary(summary);
  };
  const handleEditKeyFindings = (index, value) => {
    const newKeyFindings = [...editedSummary.keyFindings];
    newKeyFindings[index] = value;
    setEditedSummary({
      ...editedSummary,
      keyFindings: newKeyFindings
    });
  };
  const handleEditRecommendations = (index, value) => {
    const newRecommendations = [...editedSummary.recommendations];
    newRecommendations[index] = value;
    setEditedSummary({
      ...editedSummary,
      recommendations: newRecommendations
    });
  };
  return <div className="h-full flex flex-col">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Clinical Summary
        </h2>
        <div className="flex space-x-2">
          {isEditing ? <>
              <button onClick={handleCancel} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                <XIcon size={16} />
              </button>
              <button onClick={handleSave} className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md">
                <CheckIcon size={16} />
              </button>
            </> : <>
              <button onClick={handleEdit} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                <EditIcon size={16} />
              </button>
              <button onClick={onSave} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md">
                <SaveIcon size={16} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                <PrinterIcon size={16} />
              </button>
              <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                <XIcon size={16} />
              </button>
            </>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              Patient Information
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Name:</span>
                <span className="text-sm font-medium">
                  {summary.patientName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">ID:</span>
                <span className="text-sm font-medium">{summary.patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Procedure:</span>
                <span className="text-sm font-medium">{summary.procedure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date & Time:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleDateString()} {summary.timestamp}
                </span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangleIcon size={16} className="text-red-500 mr-2" />
              <h3 className="font-medium text-gray-900">Key Findings</h3>
            </div>
            <ul className="space-y-2">
              {isEditing ? editedSummary.keyFindings.map((finding, index) => <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <input type="text" value={finding} onChange={e => handleEditKeyFindings(index, e.target.value)} className="flex-1 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1" />
                    </li>) : summary.keyFindings.map((finding, index) => <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span className="text-sm">{finding}</span>
                    </li>)}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {isEditing ? editedSummary.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <input type="text" value={rec} onChange={e => handleEditRecommendations(index, e.target.value)} className="flex-1 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1" />
                    </li>) : summary.recommendations.map((rec, index) => <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>)}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Clinical Notes</h3>
            {isEditing ? <textarea value={editedSummary.clinicalNotes} onChange={e => setEditedSummary({
            ...editedSummary,
            clinicalNotes: e.target.value
          })} className="w-full h-24 text-sm border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" /> : <p className="text-sm">{summary.clinicalNotes}</p>}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Generated by AI Assistant • {new Date().toLocaleString()}
          </div>
          <div className="flex space-x-2">
            <button onClick={onClose} className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={onSave} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save to Patient Record
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatSummary;