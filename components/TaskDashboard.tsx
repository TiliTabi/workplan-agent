
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExtractionResult, Task } from '../types';
import { AlertCircle, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';

interface TaskDashboardProps {
  data: ExtractionResult;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({ data }) => {
  const chartData = data.assignees.map(a => ({
    name: a.name,
    count: a.tasks.length,
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`
  }));

  const totalTasks = data.assignees.reduce((acc, a) => acc + a.tasks.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Next Week Tasks</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalTasks}</p>
          <div className="flex items-center gap-1 mt-4 text-indigo-600 text-xs font-semibold">
            <Clock className="w-4 h-4" /> Ready for dispatch
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Team Members Involved</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data.assignees.length}</p>
          <div className="flex items-center gap-1 mt-4 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> All identified
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Workload Summary</p>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {data.summary}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Task Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#6366f1', '#a855f7', '#ec4899', '#f97316', '#10b981'][index % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
