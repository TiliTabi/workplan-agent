
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import FileUploader from './components/FileUploader';
import TaskDashboard from './components/TaskDashboard';
import MessagePreview from './components/MessagePreview';
import { parseExcelFile } from './services/excelService';
import { analyzeWorkPlan } from './services/geminiService';
import { AppState, ExtractionResult } from './types';
import { RefreshCcw, CheckCircle2, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [sentList, setSentList] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setState(AppState.PARSING_EXCEL);
      setError(null);
      
      const rawData = await parseExcelFile(file);
      
      setState(AppState.ANALYZING_AI);
      const extracted = await analyzeWorkPlan(rawData);
      
      setResult(extracted);
      setState(AppState.REVIEWING);
    } catch (err) {
      console.error(err);
      setError("Failed to process file. Make sure it has task dates and assignees.");
      setState(AppState.IDLE);
    }
  };

  const handleSend = useCallback((name: string) => {
    // In a real app, this would trigger an API call to an email service or Slack
    setSentList(prev => new Set(prev).add(name));
  }, []);

  const handleReset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setSentList(new Set());
    setError(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {state === AppState.IDLE && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Get your team ready for <span className="text-indigo-600">next week.</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Upload your project plan or spreadsheet. Our AI agent will extract upcoming tasks 
                and prepare personalized notifications for everyone.
              </p>
            </div>
            <FileUploader onFileSelect={handleFileSelect} isLoading={false} />
          </div>
        )}

        {(state === AppState.PARSING_EXCEL || state === AppState.ANALYZING_AI) && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCcw className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800">
                {state === AppState.PARSING_EXCEL ? "Reading Spreadsheet..." : "AI Intelligence at Work..."}
              </h3>
              <p className="text-slate-500 mt-2">
                Scanning tasks, dates, and team members. This will take just a moment.
              </p>
            </div>
          </div>
        )}

        {state === AppState.REVIEWING && result && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Weekly Task Roundup</h2>
                <p className="text-slate-500">Review and dispatch tasks for the upcoming week.</p>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" /> Start Over
              </button>
            </div>

            <TaskDashboard data={result} />
            
            <MessagePreview 
              data={result} 
              onSend={handleSend} 
              sentList={sentList}
            />

            {sentList.size === result.assignees.length && (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-4">
                <div className="inline-flex bg-emerald-100 p-4 rounded-full text-emerald-600 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">All Set!</h3>
                <p className="text-emerald-700 max-w-md mx-auto">
                  Every team member has been notified about their tasks for the coming week.
                  The work plan is fully synchronized.
                </p>
                <button 
                  onClick={handleReset}
                  className="mt-4 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Process Another Plan
                </button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border border-red-200 rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-8">
            <div className="bg-red-100 p-2 rounded-full text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">Analysis Error</p>
              <p className="text-sm text-slate-500">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
