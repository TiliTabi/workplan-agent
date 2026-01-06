# WorkPlan Agent Design Document

## 1. Project Overview
WorkPlan Agent is a React-based application designed to streamline team task management. It allows users to upload project plans (Excel/CSV), extracts task information using AI, and facilitates personalized notifications for team members.

## 2. Architecture
The application is built using:
-   **Frontend**: React (Vite) with TypeScript.
-   **Styling**: Tailwind CSS.
-   **Services**:
    -   `excelService`: Handles parsing of uploaded spreadsheet files.
    -   `geminiService`: Uses Google Gemini AI to analyze the raw data and structure it into actionable tasks and assignees.
-   **State Management**: React `useState` for application flow (Idle -> Parsing -> Analyzing -> Reviewing).

## 3. Core Features

### 3.1 File Upload
-   **Component**: `FileUploader.tsx`
-   **Functionality**: Accepts valid .xlsx, .xls, and .csv files. Provides visual feedback and validation.

### 3.2 Excel Parsing
-   **Service**: `excelService.ts` (inferred)
-   **Functionality**: Reads the raw binary data from the uploaded file and converts it into a text-based format suitable for AI analysis.

### 3.3 AI Analysis
-   **Service**: `geminiService.ts`
-   **Functionality**: sends the parsed data to the Gemini API to identify tasks, dates, priorities, and assignees. Returns structured JSON data.

### 3.4 Task Dashboard
-   **Component**: `TaskDashboard.tsx`
-   **Functionality**: visualizes the extraction results.
    -   Summary statistics (Total tasks, Involved members).
    -   Workload summary text.
    -   Bar chart showing task distribution per assignee.

### 3.5 Notification System
-   **Component**: `MessagePreview.tsx`
-   **Functionality**:
    -   Generates draft emails/messages for each assignee.
    -   Allows manual "sending" (simulated in the current version).
    -   Visual indication of sent status.

## 4. Data Models

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
}
```

### AssigneeSummary
```typescript
interface AssigneeSummary {
  name: string;
  email?: string;
  tasks: Task[];
}
```

### ExtractionResult
```typescript
interface ExtractionResult {
  summary: string;
  assignees: AssigneeSummary[];
}
```
