
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AssigneeSummary {
  name: string;
  email?: string;
  tasks: Task[];
}

export interface ExtractionResult {
  summary: string;
  assignees: AssigneeSummary[];
}

export enum AppState {
  IDLE = 'IDLE',
  PARSING_EXCEL = 'PARSING_EXCEL',
  ANALYZING_AI = 'ANALYZING_AI',
  REVIEWING = 'REVIEWING',
  DISPATCHED = 'DISPATCHED'
}
