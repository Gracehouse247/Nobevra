export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'inProgress' | 'completed' | 'overdue' | 'wontDo' | 'archived' | 'cancelled';

export interface TaskTag {
    id: string;
    name: string;
    colorHex: string;
}

export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface RecurringRule {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    interval: number;
    daysOfWeek?: number[];
    dayOfMonth?: number;
    endDate?: Date;
}

export interface TaskModel {
    id: string;
    userId: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: Date;
    projectId?: string;
    tags: TaskTag[];
    subtasks: Subtask[];
    isRecurring: boolean;
    recurringRule?: RecurringRule;
    estimatedMinutes?: number;
    calendarEventId?: string;
    attachmentUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    alarmEnabled: boolean;
    intentType?: string;
    contactName?: string;
    locationName?: string;
    actionUrl?: string;
    isLocationReminder: boolean;
    latitude?: number;
    longitude?: number;
    radius: number;
    isSynced: boolean;
}

export interface ProjectModel {
    id: string;
    userId: string;
    name: string;
    description?: string;
    colorHex: string;
    icon?: string;
    taskCount: number;
    completedTaskCount: number;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface HabitModel {
    id: string;
    userId: string;
    name: string;
    description?: string;
    icon: string;
    color: string;
    frequency: 'daily' | 'weekly';
    daysOfWeek: number[];
    reminderTime?: string; // "HH:MM"
    category: string;
    streak: number;
    longestStreak: number;
    lastCompleted?: Date;
    completionHistory: Record<string, boolean>;
    createdAt: Date;
    isArchived: boolean;
    cue?: string;
    targetValue?: number;
    unit?: string;
    quantitativeHistory?: Record<string, number>;
}

export interface UserData {
    id?: string;
    uid: string;
    email: string;
    name: string;
    photoUrl?: string;
    avatar_url?: string;
    lastSync?: any;
    gamification?: GamificationModel;
    subscriptionStatus: 'active' | 'past_due' | 'cancelled' | 'expired';
    plan: 'explorer' | 'pulse' | 'elite' | 'admin' | 'payg';
    selectedGoals?: string[];
    productivityLevel?: string;
    motivationStyle?: string;
    businessType?: string;
    brand_logo_url?: string;
    brand_signature_url?: string;
    brand_color?: string;
    preferred_currency?: string;
    display_name?: string;
    business_name?: string;
    onboarding_completed?: boolean;
    onboarding_tour_completed?: boolean;
    first_login_at?: string;
    last_login_at?: string;
    subscription_expires_at?: string | null;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
}

export interface NoteModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    contentJson?: string;
    folderId?: string;
    voiceUrl?: string;
    taskIds: string[];
    tags: string[];
    isPinned: boolean;
    color?: string;
    linkedNoteIds: string[];
    backlinkNoteIds: string[];
    audioPath?: string;
    isDeleted: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type MindMapNodeType = 'central' | 'child' | 'aiSuggestion';

export interface MindMapNode {
    id: string;
    title: string;
    category?: string;
    positionDx: number;
    positionDy: number;
    type: MindMapNodeType;
    childIds: string[];
    description?: string;
    sources: string[];
    isExpanded: boolean;
    weight?: number; // 0.0 to 1.0, determines line thickness
    sourceUrls: string[]; // specific web links
    researchDepth: number; // 1 to 5, for tiered research
    iconCodePoint?: number;
    colorHex?: string;
    linkedTaskId?: string;
    linkedNoteId?: string;
    confidenceScore?: number; // 0 to 100
}

export interface MindMapModel {
    id: string;
    userId: string;
    title: string;
    centralTopic: string;
    nodes: MindMapNode[];
    visualTheme: string;
    darkModeCanvas: boolean;
    nodeSpacing: number;
    lineThickness: number;
    smartAutoArrange: boolean;
    snapToGrid: boolean;
    linkedProjectId?: string;
    isPublic: boolean;
    collaboratorIds: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type NotificationType = 'task_reminder' | 'habit_streak' | 'ai_insight' | 'system' | 'achievement';

export interface NotificationModel {
    id: string;
    userId: string;
    title: string;
    body: string;
    type: NotificationType;
    isRead: boolean;
    data?: Record<string, any>;
    createdAt: Date;
}

export interface TimeBlockModel {
    id: string;
    userId: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    type: 'task' | 'meeting' | 'focus' | 'personal' | 'custom';
    linkedTaskId?: string;
    linkedNoteId?: string;
    colorHex?: string;
    isRecurring: boolean;
    recurringRule?: RecurringRule;
    cognitiveLoad?: number; // 1-10
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface GamificationModel {
    uid: string;
    xp: number;
    level: number;
    unlockedBadges: string[];
    invoicesSent: number;
    paymentsReceived: number;
    receiptsScanned: number;
    currentStreak: number;
    lastActivityDate?: Date;
}

export interface IdentityData {
    fullName: string;
    jobTitle: string;
    companyName: string;
    email: string;
    phone: string;
    website?: string;
    address?: string;
    socialLinks?: { platform: string; url: string }[];
    socials?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    bio?: string;
    qrCodeUrl?: string;
    avatarUrl?: string;
    brandColor?: string;
    fontColor?: string;
    templateId?: string;
    fontFamily?: string;
    fontTitle?: string;
    fontSizeName?: number;
    fontSizeTitle?: number;
    fontSizeFactor?: number;
    layout?: {
        logo?: { x: number; y: number };
        content?: { x: number; y: number };
        qr?: { x: number; y: number };
        avatar?: { x: number; y: number };
    };
    created_at?: string;
    updated_at?: string;
    is_public?: boolean;
    scan_count?: number;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export interface Invoice {
    id: string;
    invoice_number: string;
    status: 'paid' | 'overdue' | 'viewed' | 'draft' | 'sent';
    issue_date: string;
    due_date: string;
    currency_code: string;
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    notes?: string;
    pdf_url?: string;
    invoice_items: LineItem[];
    teams?: {
        brand_logo_url?: string;
        business_name?: string;
    };
    clients?: {
        name?: string;
        email?: string;
    };
}
