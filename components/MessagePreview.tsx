
import React from 'react';
import { Mail, Send, CheckCircle, ChevronRight, User } from 'lucide-react';
import { ExtractionResult } from '../types';

interface MessagePreviewProps {
  data: ExtractionResult;
  onSend: (assignee: string) => void;
  sentList: Set<string>;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ data, onSend, sentList }) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Draft Notifications</h3>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {sentList.size} / {data.assignees.length} Sent
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.assignees.map((assignee) => {
          const isSent = sentList.has(assignee.name);
          return (
            <div 
              key={assignee.name}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                isSent ? 'border-emerald-200 bg-emerald-50 opacity-80' : 'border-slate-200 hover:shadow-lg'
              }`}
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSent ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isSent ? <CheckCircle className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 text-lg">{assignee.name}</h4>
                    {assignee.email && <span className="text-sm text-slate-400">&lt;{assignee.email}&gt;</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {assignee.tasks.map((task, idx) => (
                      <div key={idx} className="bg-slate-100 px-3 py-1 rounded-md text-xs font-medium text-slate-600 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-3">
                  <button 
                    onClick={() => onSend(assignee.name)}
                    disabled={isSent}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
                      isSent 
                        ? 'bg-transparent text-emerald-600' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                    }`}
                  >
                    {isSent ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Sent
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Summary
                      </>
                    )}
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Draft Message Preview */}
              {!isSent && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 mx-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Email Draft</p>
                  <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 font-mono whitespace-pre-wrap">
                    {`Hi ${assignee.name},\n\nHere are your tasks for next week:\n\n` + 
                    assignee.tasks.map(t => `• ${t.title} (Due: ${t.dueDate})`).join('\n') +
                    `\n\nBest regards,\nYour WorkPlan Agent`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagePreview;
