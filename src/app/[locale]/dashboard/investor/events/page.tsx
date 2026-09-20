"use client";

import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FiCalendar, FiMapPin, FiClock, FiEdit3 } from "react-icons/fi";

export default function EventsPage() {
  const [eventDate, setEventDate] = useState<Date | null>(new Date());

  const [eventTime, setEventTime] = useState<Date | null>(new Date());

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-white shadow-xl">
        <h1 className="text-5xl font-extrabold">Create Startup Event</h1>

        <p className="mt-4 max-w-3xl text-xl text-teal-100">
          Organize networking events, startup meetings, and investment
          opportunities.
        </p>
      </div>

      {/* Title + Date */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Title */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
              <FiEdit3 size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Event Title</h2>

              <p className="text-gray-500">Name of your event</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Startup Investment Summit"
            className="
              w-full
              rounded-2xl
              border
              p-5
              text-xl
              outline-none
              transition
              focus:border-teal-600
            "
          />
        </div>

        {/* Date */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
              <FiCalendar size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Event Date</h2>

              <p className="text-gray-500">Choose the event date</p>
            </div>
          </div>

          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select event date"
            wrapperClassName="w-full"
            className="
              w-full
              rounded-2xl
              border
              p-5
              text-xl
              outline-none
              transition
              focus:border-teal-600
            "
          />
        </div>
      </div>

      {/* Location */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
            <FiMapPin size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Event Location</h2>

            <p className="text-gray-500">
              Specify where the event will take place
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <select
            className="
              rounded-2xl
              border
              p-5
              text-lg
              outline-none
              focus:border-teal-600
            "
          >
            <option>Country</option>
            <option>Egypt</option>
            <option>Saudi Arabia</option>
            <option>UAE</option>
          </select>

          <select
            className="
              rounded-2xl
              border
              p-5
              text-lg
              outline-none
              focus:border-teal-600
            "
          >
            <option>Governorate</option>
            <option>Cairo</option>
            <option>Giza</option>
            <option>Alexandria</option>
          </select>

          <input
            type="text"
            placeholder="City"
            className="
              rounded-2xl
              border
              p-5
              text-lg
              outline-none
              focus:border-teal-600
            "
          />
        </div>
      </div>

      {/* Time */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
            <FiClock size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Event Time</h2>

            <p className="text-gray-500">Select the event start time</p>
          </div>
        </div>

        <DatePicker
          selected={eventTime}
          onChange={(date) => setEventTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          wrapperClassName="w-full"
          className="
            w-full
            rounded-2xl
            border
            p-5
            text-xl
            outline-none
            transition
            focus:border-teal-600
          "
        />
      </div>

      {/* Description */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-3xl font-bold">Event Description</h2>

        <p className="mb-6 text-gray-500">
          Describe your event and its purpose.
        </p>

        <textarea
          rows={7}
          placeholder="Describe your startup event..."
          className="
            w-full
            rounded-2xl
            border
            p-5
            text-lg
            outline-none
            transition
            focus:border-teal-600
          "
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          className="
            rounded-2xl
            bg-teal-700
            px-10
            py-4
            text-xl
            font-semibold
            text-white
            shadow-lg
            transition
            hover:-translate-y-1
            hover:bg-teal-800
          "
        >
          Create Event
        </button>
      </div>
    </div>
  );
}
