import React from 'react';
import { BellIcon, SearchIcon, UserIcon } from 'lucide-react';
const Header = () => {
  return <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <div className="relative max-w-md w-full">
          <input type="text" placeholder="Search patients, documents..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full hover:bg-gray-100">
          <BellIcon size={20} className="text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <UserIcon size={16} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            Dr. Sarah Chen
          </span>
        </div>
      </div>
    </header>;
};
export default Header;