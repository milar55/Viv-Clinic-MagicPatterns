import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, MessageSquareIcon, FileTextIcon, SettingsIcon, BellIcon, LogOutIcon, ChevronRightIcon } from 'lucide-react';
const Sidebar = () => {
  const location = useLocation();
  const [showChatSubmenu, setShowChatSubmenu] = useState(false);
  const [showDocSubmenu, setShowDocSubmenu] = useState(false);
  // Critical patients that need attention - would come from API in real app
  const criticalPatients = [{
    id: 'P-4872',
    name: 'Emma Wilson',
    status: 'critical'
  }, {
    id: 'P-3291',
    name: 'Sophia Chen',
    status: 'warning'
  }];
  const recentChats = [{
    id: 'P-4872',
    name: 'Emma Wilson',
    time: '10:47 AM'
  }, {
    id: 'P-3291',
    name: 'Sophia Chen',
    time: '9:23 AM'
  }, {
    id: 'P-7634',
    name: 'Isabella Rodriguez',
    time: 'Yesterday'
  }];
  const recentDocumentations = [{
    id: 'D-1234',
    patientId: 'P-4872',
    patientName: 'Emma Wilson',
    type: 'Postoperative Visit',
    provider: 'Dr. Martinez',
    time: '2 hours ago'
  }, {
    id: 'D-1235',
    patientId: 'P-3291',
    patientName: 'Sophia Chen',
    type: 'Follow-up',
    provider: 'Dr. Johnson',
    time: 'Yesterday'
  }, {
    id: 'D-1236',
    patientId: 'P-7634',
    patientName: 'Isabella Rodriguez',
    type: 'Consultation',
    provider: 'Dr. Chen',
    time: '2 days ago'
  }];
  const mainNavItems = [{
    icon: HomeIcon,
    label: 'Dashboard',
    path: '/'
  }, {
    icon: UsersIcon,
    label: 'Patients',
    path: '/patients'
  }, {
    icon: MessageSquareIcon,
    label: 'Chat',
    path: '/chat/P-4872',
    hasSubmenu: true,
    showSubmenu: showChatSubmenu,
    toggleSubmenu: () => setShowChatSubmenu(!showChatSubmenu)
  }, {
    icon: FileTextIcon,
    label: 'Documentation',
    path: '/documentation',
    hasSubmenu: true,
    showSubmenu: showDocSubmenu,
    toggleSubmenu: () => setShowDocSubmenu(!showDocSubmenu)
  }, {
    icon: BellIcon,
    label: 'Alerts',
    path: '/alerts'
  }, {
    icon: SettingsIcon,
    label: 'Settings',
    path: '/settings'
  }];
  const isPathActive = path => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  return <aside className="bg-white w-16 md:w-64 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600 hidden md:block">
          Viv Health
        </h1>
        <h1 className="text-xl font-bold text-blue-600 md:hidden">MC</h1>
      </div>
      <nav className="flex-1 pt-4 overflow-y-auto">
        <ul>
          {mainNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isPathActive(item.path);
          return <li key={index} className="relative">
                {item.hasSubmenu ? <button onClick={item.toggleSubmenu} className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <div className="flex items-center">
                      <Icon size={20} className="min-w-[20px]" />
                      <span className="ml-4 hidden md:block">{item.label}</span>
                    </div>
                    <ChevronRightIcon size={16} className={`hidden md:block transition-transform ${item.showSubmenu ? 'transform rotate-90' : ''}`} />
                  </button> : <Link to={item.path} className={`flex items-center px-4 py-3 text-sm transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Icon size={20} className="min-w-[20px]" />
                    <span className="ml-4 hidden md:block">{item.label}</span>
                  </Link>}
                {item.hasSubmenu && item.showSubmenu && item.label === 'Chat' && <ul className="bg-gray-50 hidden md:block">
                      <li className="pl-12 pr-4 py-2 border-l-2 border-blue-500">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Critical Patients
                        </h3>
                        <ul className="mt-1 space-y-1">
                          {criticalPatients.map(patient => <li key={patient.id}>
                              <Link to={`/chat/${patient.id}`} className={`block py-1 text-sm rounded ${location.pathname === `/chat/${patient.id}` ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}>
                                {patient.name}
                                {patient.status === 'critical' && <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>}
                                {patient.status === 'warning' && <span className="ml-2 inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>}
                              </Link>
                            </li>)}
                        </ul>
                      </li>
                      <li className="pl-12 pr-4 py-2 border-l-2 border-transparent">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Recent Chats
                        </h3>
                        <ul className="mt-1 space-y-1">
                          {recentChats.map(chat => <li key={chat.id}>
                              <Link to={`/chat/${chat.id}`} className={`block py-1 text-sm rounded ${location.pathname === `/chat/${chat.id}` ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}>
                                <div className="flex justify-between items-center">
                                  <span>{chat.name}</span>
                                  <span className="text-xs text-gray-400">
                                    {chat.time}
                                  </span>
                                </div>
                              </Link>
                            </li>)}
                        </ul>
                      </li>
                    </ul>}
                {item.hasSubmenu && item.showSubmenu && item.label === 'Documentation' && <ul className="bg-gray-50 hidden md:block">
                      <li className="pl-12 pr-4 py-2 border-l-2 border-blue-500">
                        <Link to="/documentation" className={`block py-1 text-sm rounded ${location.pathname === '/documentation' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}>
                          All Interactions
                        </Link>
                      </li>
                      <li className="pl-12 pr-4 py-2 border-l-2 border-transparent">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Recent Documentation
                        </h3>
                        <ul className="mt-1 space-y-1">
                          {recentDocumentations.map(doc => <li key={doc.id}>
                              <Link to={`/documentation/${doc.patientId}`} className={`block py-1 text-sm rounded ${location.pathname === `/documentation/${doc.patientId}` ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}>
                                <div className="flex flex-col">
                                  <span>{doc.patientName}</span>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                      {doc.type}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {doc.time}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </li>)}
                        </ul>
                      </li>
                    </ul>}
              </li>;
        })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <Link to="/logout" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <LogOutIcon size={20} className="min-w-[20px]" />
          <span className="ml-4 hidden md:block">Logout</span>
        </Link>
      </div>
    </aside>;
};
export default Sidebar;