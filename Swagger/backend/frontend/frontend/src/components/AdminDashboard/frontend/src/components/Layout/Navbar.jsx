import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import CandidateManager from '../components/AdminDashboard/CandidateManager';
import PaymentMonitor from '../components/AdminDashboard/PaymentMonitor';
import Analytics from '../components/AdminDashboard/Analytics';
import ResultsExport from '../components/AdminDashboard/ResultsExport';

export default function AdminPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('analytics');

  if (!token || user?.role !== 'admin') {
    router.push('/');
    return null;
  }

  const tabs = [
    { id: 'analytics', label: '📊 Analytics', component: Analytics },
    { id: 'candidates', label: '👥 Candidates', component: CandidateManager },
    { id: 'payments', label: '💳 Payments', component: PaymentMonitor },
    { id: 'export', label: '📥 Export', component: ResultsExport }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.email}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
