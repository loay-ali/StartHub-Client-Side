export enum TaskPriority {
  ImportantUrgent = "Important & Urgent",

  ImportantNotUrgent = "Important & Not Urgent",

  NotImportantUrgent = "Not Important & Urgent",

  NotImportantNotUrgent = "Not Important & Not Urgent",
}

export interface ScheduleTask {
  id: number;
  title: string;
  completed: boolean;
  priority: TaskPriority;
}

export interface ScheduleCalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  taskDates: string[];
}
