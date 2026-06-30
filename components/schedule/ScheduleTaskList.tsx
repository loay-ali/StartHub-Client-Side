import { ScheduleTask, TaskPriority } from "./types";

interface Props {
  date: Date;
  tasks: ScheduleTask[];
}

const colors = {
  [TaskPriority.ImportantUrgent]: "bg-red-100 text-red-700",

  [TaskPriority.ImportantNotUrgent]: "bg-yellow-100 text-yellow-700",

  [TaskPriority.NotImportantUrgent]: "bg-blue-100 text-blue-700",

  [TaskPriority.NotImportantNotUrgent]: "bg-gray-100 text-gray-700",
};

export default function ScheduleTaskList({ date, tasks }: Props) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Tasks</h2>
      <h3 className="mb-6 text-gray-500">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h3>

      {tasks.length === 0 && (
        <div className="text-gray-400">No tasks for this day</div>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-5 w-5"
              />

              <span>{task.title}</span>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                colors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
