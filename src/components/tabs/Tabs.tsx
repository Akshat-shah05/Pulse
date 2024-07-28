'use client'
import { useState } from 'react';

const Tabs = ({ tabs }: any) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab: any) => (
          <button
            key={tab.label}
            className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm cursor-pointer focus:outline-none ${
              activeTab === tab.label ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.map((tab: any) =>
          activeTab === tab.label ? <div key={tab.label}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
};

export default Tabs;