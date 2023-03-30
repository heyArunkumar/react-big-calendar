import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Modal, DatePicker, DatePickerProps, Typography } from "antd";
import "./ReactCalendarNew.scss";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState<any>(events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const handleSelect = ({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const title = "New Event name";
    setEventsData([
      ...eventsData,
      {
        start: new Date(startDate),
        end: new Date(endDate),
        title,
      },
    ]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("date", date, dateString);
  };

  const dayPropGetter = (date: any) => {
    console.log("date", date);

    if (
      moment(date).format("dddd") === "Sunday" ||
      moment(date).format("dddd") === "Saturday"
      //  || 
      // moment(date).format("LT") < "10:00 PM"
    ) {
      return {
        className: "disabled-day",
        disabled: true,
      };
    }
    return {};
  };

  return (
    <div className="react-event-calendar">
      <div className="event-calendar-heading">
        <div className="calendar-header">
          <Typography>My calendar</Typography>
        </div>
        <div className="calendar-button">
          <Button onClick={() => setIsModalOpen(true)}>
            + Book Appointment
          </Button>
        </div>
      </div>

      <Calendar
        views={["day", "work_week", "month", "week"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        eventPropGetter={(event) => {
          return { style: { backgroundColor: "#edfef6",color:'#444545',fontWeight:'bold',borderLeft:'4px solid #1abc71' } };
        }}
        dayPropGetter={dayPropGetter}
        
      />

      <Modal
        title="Book Appointment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
        <DatePicker
          showTime
          format="MM/D/YYYY HH:mm"
          onChange={onChange}
          onOk={(value) => setStartDate(value)}
        />
        </div>
        <div>
        <DatePicker
          showTime
          format="MM/D/YYYY HH:mm"
          onChange={onChange}
          onOk={(value) => setEndDate(value)}
        />
        </div>
      </Modal>
    </div>
  );
}
