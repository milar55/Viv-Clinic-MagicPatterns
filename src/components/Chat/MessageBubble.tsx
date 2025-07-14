import React from 'react';
import { AlertTriangleIcon, BotIcon, UserIcon, HeartPulseIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
const MessageBubble = ({
  message
}) => {
  const renderMessageContent = () => {
    return <>
        <p className="text-sm">{message.content}</p>
        {message.options && <div className="mt-2 flex flex-wrap gap-2">
            {message.options.map((option, index) => <button key={index} className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                {option}
              </button>)}
          </div>}
        {message.metadata && <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center text-xs text-gray-500">
              <ClockIcon size={12} className="mr-1" />
              <span>{message.metadata.time}</span>
            </div>
            {message.metadata.status && <div className="flex items-center text-xs text-green-600 mt-1">
                <CheckCircleIcon size={12} className="mr-1" />
                <span>{message.metadata.status}</span>
              </div>}
          </div>}
      </>;
  };
  const renderMessageBubble = () => {
    switch (message.type) {
      case 'system':
        return <div className="flex justify-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
              <AlertTriangleIcon size={12} className="mr-1" />
              {message.content}
            </div>
          </div>;
      case 'bot':
        return <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <BotIcon size={16} className="text-blue-600" />
            </div>
            <div className="max-w-[75%] bg-blue-50 rounded-lg rounded-tl-none px-4 py-2">
              {renderMessageContent()}
            </div>
          </div>;
      case 'patient':
        return <div className="flex items-start justify-end">
            <div className="max-w-[75%] bg-gray-100 rounded-lg rounded-tr-none px-4 py-2">
              {renderMessageContent()}
            </div>
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
              <UserIcon size={16} className="text-gray-600" />
            </div>
          </div>;
      case 'staff':
        return <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <HeartPulseIcon size={16} className="text-green-600" />
            </div>
            <div className="max-w-[75%] bg-green-50 rounded-lg rounded-tl-none px-4 py-2">
              {renderMessageContent()}
            </div>
          </div>;
      case 'questionnaire':
        return <div className="border border-blue-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-blue-50 px-4 py-2 flex items-center">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <BotIcon size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {message.title}
                </p>
                <p className="text-xs text-blue-600">{message.subtitle}</p>
              </div>
            </div>
            <div className="px-4 py-3">{renderMessageContent()}</div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="mb-4">
      {renderMessageBubble()}
      <div className="mt-1 text-xs text-gray-400 px-10">
        {message.timestamp}
      </div>
    </div>;
};
export default MessageBubble;