"use client";

import { useState } from "react";

import ScheduleCalendar from "@/components/schedule/ScheduleCalendar";
import ScheduleTaskList from "@/components/schedule/ScheduleTaskList";
import { ScheduleTask, TaskPriority } from "@/components/schedule/types";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2026-06-30"));

  const tasksByDate: Record<string, ScheduleTask[]> = {
    "2026-06-24": [
      {
        id: 1,
        title: "Prepare monthly report",
        completed: true,
        priority: TaskPriority.ImportantUrgent,
      },
      {
        id: 2,
        title: "Interview frontend candidate",
        completed: false,
        priority: TaskPriority.ImportantNotUrgent,
      },
    ],

    "2026-06-28": [
      {
        id: 3,
        title: "Client meeting",
        completed: false,
        priority: TaskPriority.ImportantUrgent,
      },
    ],

    "2026-06-30": [
      {
        id: 4,
        title: "Review invoices",
        completed: false,
        priority: TaskPriority.NotImportantUrgent,
      },
      {
        id: 5,
        title: "Archive old files",
        completed: false,
        priority: TaskPriority.NotImportantNotUrgent,
      },
    ],
  };

  const selectedKey = selectedDate.toISOString().split("T")[0];

  const tasks = tasksByDate[selectedKey] ?? [];

  const taskDates = Object.keys(tasksByDate);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0F172A]">Schedule</h1>

        <p className="mt-3 text-xl text-[#64748B]">
          Manage your daily tasks and schedule.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        {/* Calendar */}
        <div className="rounded-3xl border border-[#D1FAE5] bg-white p-6 shadow-sm">
          <ScheduleCalendar
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            taskDates={taskDates}
          />
        </div>

        {/* Tasks */}
        <div className="rounded-3xl border border-[#D1FAE5] bg-white p-8 shadow-sm">
          <ScheduleTaskList date={selectedDate} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
