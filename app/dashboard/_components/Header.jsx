"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Search from "../../../assets/Sidebar/search-normal.png"
import Calender from "../../../assets/Header/calendar-2.png"
import MessageQuestion from "../../../assets/Header/message-question.png"
import Notification from "../../../assets/Header/notification.png"
import Userprofile from "../../../assets/Header/userprofile.png"
import { ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  const [user, setUser] = useState({ name: "Guest", email: "No email" });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Hide calendar after selecting a date
  };




  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update state with user details
    }
  }, []);
    return (
      <div className="border-b-2 border-[#DBDBDB] w-full">
      <header className="flex justify-between items-center bg-white my-[7px] mx-5">
      <div className="relative w-full max-w-sm md:px-0 ml-10">
        <Image
          src={Search}
          alt="Search Icon"
          className="absolute inset-y-0 left-6 md:left-3 h-5 w-5 my-auto"
        />
        <input
          type="text"
          placeholder="Search for anything..."
          className="pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none bg-[#F5F5F5] text-[#787486]"
        />
      </div>
        <div className="flex items-center space-x-8">
        
         <div className="relative">
      {/* Calendar Button */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center  py-2 px-4 rounded-md text-gray-700"
      >
        <Image src={Calender} alt="Calendar" className="w-6 h-6" />
        <p className="">
          {selectedDate ? selectedDate.toDateString() : ""}
        </p>
      </button>

      {/* Date Picker (Visible on Click) */}
      {showCalendar && (
        <div className="absolute mt-2 z-10 bg-white shadow-md p-2 rounded-md">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline // Show calendar inline
          />
        </div>
      )}
    </div>
         
         
         <Image
         src={MessageQuestion}
         alt="MessageQuestion"
         className="w-[24px] h-[24px]"
         />
         <Image
         src={Notification}
         alt="Notification"
         className="w-[24px] h-[24px]"
         />
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="text-sm font-medium">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Image
              src={Userprofile}
              alt="User profile"
              className="w-10 h-10 rounded-full border"
            />
            <ChevronDown/>
          </div>
        </div>
      </header>
      </div>
    );
  };
  
  export default Header;
  