"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // If using Next.js
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";// Replace with actual path
import { Calendar, ChevronDown } from "lucide-react";
const CalendarDropdown = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Function to format time (HH:MM AM/PM)
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to format the date
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatTime(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      {/* Button to toggle calendar visibility */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center justify-between border py-2 px-4 rounded-md text-gray-700 bg-white shadow-md w-[200px]"
      >
         <Calendar size={20} />
        
        {/* Show time if no date is selected, otherwise show the selected date */}
        <div className="flex items-center space-x-2">
          <p className="font-semibold">
            {selectedDate ? formatDate(selectedDate) : currentTime}
          </p>
        </div>
        <ChevronDown size={20} />
        {/* <Image src={ChevronDown} alt="Chevron Down" className="w-4 h-4 ml-1" /> */}
      </button>

      {/* Calendar (conditionally rendered) */}
      {showCalendar && (
        <div className="absolute z-50 mt-2 bg-white border rounded-md shadow-lg p-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline // Keeps the calendar open
            calendarClassName="custom-datepicker"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
