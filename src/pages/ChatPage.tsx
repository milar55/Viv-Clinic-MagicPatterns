import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, SendIcon, PlusIcon, FileTextIcon, ImageIcon, ClipboardIcon, ChevronRightIcon, CheckCircleIcon, AlertTriangleIcon, ClockIcon } from 'lucide-react';
import MessageBubble from '../components/Chat/MessageBubble';
import QuestionnaireBot from '../components/Chat/QuestionnaireBot';
import ChatSummary from '../components/Chat/ChatSummary';
const ChatPage = () => {
  const {
    id
  } = useParams();
  const [message, setMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [activeSummary, setActiveSummary] = useState(null);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(null);
  const messagesEndRef = useRef(null);
  // Mocked patient data
  const patient = {
    id: id || 'P-4872',
    name: 'Emma Wilson',
    procedure: 'Cesarean Section',
    status: 'critical'
  };
  // Mocked chat messages
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'system',
    content: 'Post-procedure follow-up started',
    timestamp: '10:30 AM'
  }, {
    id: 2,
    type: 'bot',
    content: `Hello Emma, this is your post-cesarean section follow-up. How are you feeling today?`,
    timestamp: '10:31 AM',
    options: ['Good', 'Fair', 'Poor']
  }, {
    id: 3,
    type: 'patient',
    content: 'Not great. I am having quite a bit of pain.',
    timestamp: '10:35 AM'
  }, {
    id: 4,
    type: 'bot',
    content: `I'm sorry to hear that. On a scale of 0-10, with 10 being the worst pain imaginable, how would you rate your pain right now?`,
    timestamp: '10:35 AM',
    options: ['0-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)']
  }, {
    id: 5,
    type: 'patient',
    content: '8',
    timestamp: '10:36 AM'
  }, {
    id: 6,
    type: 'bot',
    content: `That's a high level of pain. Where is the pain located?`,
    timestamp: '10:36 AM',
    options: ['Incision site', 'Abdomen', 'Back', 'Other']
  }, {
    id: 7,
    type: 'patient',
    content: 'Incision site',
    timestamp: '10:37 AM'
  }, {
    id: 8,
    type: 'bot',
    content: `Is there any redness, swelling, or discharge from the incision site?`,
    timestamp: '10:37 AM',
    options: ['Yes', 'No', 'Not sure']
  }, {
    id: 9,
    type: 'patient',
    content: 'Yes, it looks red and a bit swollen',
    timestamp: '10:38 AM'
  }, {
    id: 10,
    type: 'system',
    content: 'ALERT: Potential incision infection detected. Escalating to clinical team.',
    timestamp: '10:38 AM'
  }, {
    id: 11,
    type: 'staff',
    content: "Hello Emma, this is Nurse Johnson. I see that you are experiencing pain at your incision site, with redness and swelling. I'm going to notify Dr. Martinez immediately. In the meantime, please take your temperature if possible and avoid touching the incision site.",
    timestamp: '10:40 AM'
  }, {
    id: 12,
    type: 'patient',
    content: 'My temperature is 100.2°F',
    timestamp: '10:45 AM'
  }, {
    id: 13,
    type: 'staff',
    content: 'Thank you for checking. Dr. Martinez has been notified and would like to see you today. We will call you shortly to arrange an appointment. Please continue taking your prescribed antibiotics.',
    timestamp: '10:47 AM'
  }]);
  // Quick response templates for nurses
  const quickResponses = ['How are you managing your pain today?', 'Have you been taking your medications as prescribed?', 'Are you experiencing any new symptoms?', 'Can you describe any changes to your incision site?', 'Do you have any questions about your recovery?'];
  // Questionnaire templates
  const questionnaireTemplates = [{
    id: 'pain',
    title: 'Pain Assessment',
    description: 'Comprehensive pain evaluation questionnaire',
    questions: ['On a scale of 0-10, how would you rate your pain?', 'Where is the pain located?', 'How would you describe the pain? (Sharp, dull, throbbing, etc.)', 'What makes the pain better or worse?', 'How is the pain affecting your daily activities?']
  }, {
    id: 'medication',
    title: 'Medication Adherence',
    description: 'Track medication usage and side effects',
    questions: ['Have you been taking all prescribed medications?', 'Have you missed any doses in the last 24 hours?', 'Are you experiencing any side effects?', 'Do you have any questions about your medications?']
  }, {
    id: 'wound',
    title: 'Wound Check',
    description: 'Assess healing progress and complications',
    questions: ['How does your incision site look today?', 'Is there any redness, swelling, or warmth?', 'Have you noticed any discharge from the wound?', 'Are you able to keep the wound clean and dry?', 'Have you been changing dressings as instructed?']
  }, {
    id: 'mobility',
    title: 'Mobility Assessment',
    description: 'Evaluate movement and activity levels',
    questions: ['How much are you able to move around today?', 'Are you experiencing any dizziness when standing?', 'Have you been able to perform daily activities?', 'Are you following the recommended activity restrictions?']
  }];
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'staff',
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  const handleQuickResponse = response => {
    const newMessage = {
      id: messages.length + 1,
      type: 'staff',
      content: response,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newMessage]);
  };
  const handleStartQuestionnaire = questionnaire => {
    setActiveQuestionnaire(questionnaire);
    // Add system message about starting questionnaire
    const systemMessage = {
      id: messages.length + 1,
      type: 'system',
      content: `Starting ${questionnaire.title} questionnaire`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    // Add first question
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: questionnaire.questions[0],
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      questionnaireId: questionnaire.id,
      questionIndex: 0
    };
    setMessages([...messages, systemMessage, botMessage]);
  };
  const handleGenerateSummary = () => {
    // Create a summary of the conversation
    const summary = {
      id: Date.now(),
      title: `Chat Summary - ${new Date().toLocaleDateString()}`,
      patientName: patient.name,
      patientId: patient.id,
      procedure: patient.procedure,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      keyFindings: ['Patient reported severe pain (8/10) at incision site', 'Incision site shows redness and swelling', 'Patient has elevated temperature (100.2°F)', 'Possible surgical site infection'],
      recommendations: ['Urgent in-person evaluation by physician', 'Continue prescribed antibiotics', 'Monitor temperature every 4 hours', 'Apply cold compress to reduce swelling'],
      clinicalNotes: 'Patient showing signs consistent with early surgical site infection. Escalated to Dr. Martinez for same-day evaluation. Patient advised on wound care and medication adherence.'
    };
    setActiveSummary(summary);
    setShowSummary(true);
  };
  const handleSaveSummary = () => {
    // Show confirmation message
    const systemMessage = {
      id: messages.length + 1,
      type: 'system',
      content: `Clinical summary saved to patient record`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, systemMessage]);
    setShowSummary(false);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div className="flex flex-col h-full -m-4 md:-m-6">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/patient/${patient.id}`} className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="font-medium text-gray-900">{patient.name}</h1>
            <p className="text-xs text-gray-500">
              {patient.procedure} • {patient.id}
            </p>
          </div>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
            Critical
          </span>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleGenerateSummary} className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            <ClipboardIcon size={16} className="mr-1.5" />
            <span className="hidden sm:inline">Generate Summary</span>
          </button>
          <Link to={`/documentation/${patient.id}`} className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <FileTextIcon size={16} className="mr-1.5" />
            <span className="hidden sm:inline">Documentation</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex">
        <div className={`flex-1 overflow-y-auto p-4 bg-gray-50 ${showSummary ? 'hidden md:block md:w-1/2' : 'w-full'}`}>
          <div className="max-w-3xl mx-auto space-y-4">
            <QuestionnaireBot patientName={patient.name} procedure={patient.procedure} onStartQuestionnaire={handleStartQuestionnaire} />
            {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {showSummary && <div className="flex-1 overflow-y-auto p-4 bg-white border-l border-gray-200">
            <ChatSummary summary={activeSummary} onSave={handleSaveSummary} onClose={() => setShowSummary(false)} />
          </div>}
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {quickResponses.map((response, index) => <button key={index} onClick={() => handleQuickResponse(response)} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 whitespace-nowrap">
                  {response}
                </button>)}
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="relative group">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                <PlusIcon size={20} />
              </button>
              <div className="absolute bottom-full left-0 mb-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
                <div className="p-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
                    Questionnaires
                  </h4>
                  {questionnaireTemplates.map((q, index) => <button key={index} onClick={() => handleStartQuestionnaire(q)} className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-left hover:bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{q.title}</p>
                        <p className="text-xs text-gray-500">
                          {q.questions.length} questions
                        </p>
                      </div>
                      <ChevronRightIcon size={14} className="text-gray-400" />
                    </button>)}
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
              <ImageIcon size={20} />
            </button>
            <div className="flex-1 relative">
              <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message or select a questionnaire..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" rows={1} />
            </div>
            <button onClick={handleSendMessage} disabled={!message.trim()} className={`p-2 rounded-full ${message.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400'}`}>
              <SendIcon size={20} />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="flex items-center text-xs text-gray-500">
              <ClockIcon size={12} className="mr-1" />
              <span>
                Last message:{' '}
                {messages[messages.length - 1]?.timestamp || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatPage;