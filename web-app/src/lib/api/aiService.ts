import apiClient from './apiClient';

/**
 * Service for interacting with Nobevra AI backend features.
 */
export const aiNoteService = {
    summarizeNote: async (content: string) => {
        const response = await apiClient.post('/ai/summarize-note', { content });
        return response.data.summary;
    },
    extractTasks: async (content: string) => {
        const response = await apiClient.post('/ai/extract-note-tasks', { content });
        return response.data.tasks;
    },
    queryNote: async (noteContent: string, query: string) => {
        const response = await apiClient.post('/ai/query-note', { noteContent, query });
        return response.data.answer;
    }
};

export const aiTaskService = {
    getTaskBreakdown: async (taskTitle: string, description?: string) => {
        const response = await apiClient.post('/ai/task-breakdown', { title: taskTitle, description });
        return response.data.steps;
    },
    getBurnoutStatus: async (userId: string) => {
        const response = await apiClient.post('/ai/burnout-status', { userId });
        return response.data;
    },
    suggestCategorization: async (taskTitle: string) => {
        const response = await apiClient.post('/ai/suggest-categorization', { title: taskTitle });
        return response.data.category;
    },
    parseVoiceTask: async (transcript: string) => {
        const response = await apiClient.post('/ai/voice-task-parse', { transcript });
        return response.data; // Expected: { title, priority, dueDate, tags }
    }
};



export const aiHabitService = {
    getHabitInsights: async (userId: string) => {
        const response = await apiClient.post('/ai/habit-insights', { userId });
        return response.data;
    },
    getHabitRecovery: async (habitTitle: string, streak: number) => {
        const response = await apiClient.post('/ai/habit-recovery', { title: habitTitle, streak });
        return response.data.advice;
    }
};

export const insightService = {
    getMotivationalInsight: async (goals?: string[]) => {
        const response = await apiClient.post('/ai/motivational-insight', { goals });
        return response.data.insight;
    },
    getWeeklyReport: async (stats: any) => {
        const response = await apiClient.post('/ai/weekly-report', stats);
        return response.data;
    },
    getBehavioralAnalysis: async (data: any) => {
        const response = await apiClient.post('/ai/behavioral-analysis', data);
        return response.data;
    }
};

