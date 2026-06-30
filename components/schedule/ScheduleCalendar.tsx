"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  taskDates: string[];
}

export default function ScheduleCalendar({
  selectedDate,
  onSelect,
  taskDates,
}: Props) {
  const today = new Date();

  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="px-4">
        
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) onSelect(date);
        }}
        showOutsideDays
        captionLayout="label"
        modifiers={{
          hasTasks: (date) => taskDates.includes(formatDate(date)),
          past: (date) => date < todayWithoutTime,
        }}
        modifiersClassNames={{
          selected: "schedule-selected",
          today: "schedule-today",
          past: "schedule-past",
          hasTasks: "schedule-task-day",
        }}
      />
    </div>
  );
}
