import React, { useState } from 'react';
import { BotIcon, ChevronDownIcon, ChevronUpIcon, PlayIcon } from 'lucide-react';
const QuestionnaireBot = ({
  patientName,
  procedure,
  onStartQuestionnaire
}) => {
  const [expandedQuestionnaire, setExpandedQuestionnaire] = useState(null);
  const questionnaires = [{
    id: 'pain',
    title: 'Post-Cesarean Pain Assessment',
    description: 'Evaluates pain levels, location, and characteristics',
    questions: ['On a scale of 0-10, how would you rate your pain right now?', 'Where is the pain located?', 'How would you describe the pain? (Sharp, dull, throbbing, etc.)', 'What makes the pain better or worse?', 'How is the pain affecting your daily activities?', 'Have the prescribed pain medications been effective?', 'Have you needed to take additional pain medication?', 'Is the pain getting better, worse, or staying the same?'],
    time: '3-5 min'
  }, {
    id: 'wound',
    title: 'Wound/Incision Check',
    description: 'Assesses healing progress and potential complications',
    questions: ['How does your incision site look today?', 'Is there any redness around the incision?', 'Is there any swelling around the incision?', 'Have you noticed any fluid or discharge from the wound?', 'Is the area around the incision warm to touch?', 'Are the wound edges well-approximated (closed together)?'],
    time: '2-4 min'
  }, {
    id: 'postpartum',
    title: 'Postpartum Assessment',
    description: 'Evaluates recovery after childbirth',
    questions: ['How would you describe your bleeding/discharge?', 'Are you experiencing any breast pain or engorgement?', 'How is your mood today?', 'Are you having any difficulty with breastfeeding?', 'Have you been able to rest adequately?', 'Do you have support at home for you and the baby?'],
    time: '3-4 min'
  }];
  const toggleQuestionnaire = id => {
    if (expandedQuestionnaire === id) {
      setExpandedQuestionnaire(null);
    } else {
      setExpandedQuestionnaire(id);
    }
  };
  const handleStartQuestionnaire = questionnaire => {
    if (onStartQuestionnaire) {
      onStartQuestionnaire(questionnaire);
      setExpandedQuestionnaire(null);
    }
  };
  return <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <BotIcon size={16} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-900">Clinical Assistant</h3>
          <p className="text-xs text-blue-700">Automated patient follow-up</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          Hello, I'm your clinical assistant for {procedure} follow-up. I can
          help collect information about {patientName}'s recovery and alert the
          clinical team if needed.
        </p>
        <h4 className="font-medium text-gray-900 mt-4 mb-2">
          Available Questionnaires
        </h4>
        <div className="space-y-2">
          {questionnaires.map(q => <div key={q.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="px-3 py-2 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100" onClick={() => toggleQuestionnaire(q.id)}>
                <div>
                  <p className="font-medium text-sm text-gray-900">{q.title}</p>
                  <p className="text-xs text-gray-500">
                    {q.questions.length} questions • {q.time}
                  </p>
                </div>
                {expandedQuestionnaire === q.id ? <ChevronUpIcon size={16} className="text-gray-400" /> : <ChevronDownIcon size={16} className="text-gray-400" />}
              </div>
              {expandedQuestionnaire === q.id && <div className="px-3 py-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">{q.description}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-gray-700">
                      Sample questions:
                    </p>
                    <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                      {q.questions.slice(0, 3).map((question, index) => <li key={index}>{question}</li>)}
                      {q.questions.length > 3 && <li className="text-gray-400">
                          ...and {q.questions.length - 3} more
                        </li>}
                    </ul>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Responses will be documented in patient record
                    </p>
                    <button onClick={() => handleStartQuestionnaire(q)} className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700">
                      <PlayIcon size={12} className="mr-1" />
                      Start
                    </button>
                  </div>
                </div>}
            </div>)}
        </div>
      </div>
    </div>;
};
export default QuestionnaireBot;