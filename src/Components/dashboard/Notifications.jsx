import { Bell, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const notificationsData = [
  {
    id: 1,
    category: "Investor",
    text: "Michael Chen viewed your profile",
    time: "5h ago",
    isRead: false,
  },
  {
    id: 2,
    category: "Pitches",
    text: "You sent a pitch to Accel Partners",
    time: "1d ago",
    isRead: false,
  },
  {
    id: 3,
    category: "Investor",
    text: "Sequoia Capital showed interest",
    time: "2d ago",
    isRead: false,
  },
  {
    id: 4,
    category: "Investor",
    text: "Another investor viewed your profile",
    time: "3d ago",
    isRead: true,
  },
  {
    id: 5,
    category: "Pitches",
    text: "Another pitch was sent",
    time: "3d ago",
    isRead: false,
  },
  {
    id: 6,
    category: "Pitches",
    text: "Pitch viewed by investor",
    time: "3d ago",
    isRead: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <>
      {/*  Bell */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center"
      >
        <Bell className="w-8 h-8 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 🌫 Backdrop */}
      {/* while open complete remaining screen blur and wehen we click any where it close the slider */}
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/30 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/*  Right Slide Drawer */}
      <motion.div
        className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50"
        initial={{ x: "100%" }} //right ouside of screen
        animate={{ x: open ? 0 : "100%" }}
        transition={{
          type: "spring", /// smooth + natural motion
          stiffness: 260,
          damping: 30,
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-lgfont-semibold">Notifications</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-red-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filters  buttons*/}
        <div className="flex gap-2 p-3 border-b">
          {["All", "Investor", "Pitches"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-sm rounded-full transition
                ${
                  filter === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-200"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`relative  pl-8 pr-4 py-3 cursor-pointer border-b border-gray-400
                  ${n.isRead ? "bg-white" : "bg-indigo-100"}
                  hover:bg-indigo-300 
                `}
              >
                {!n.isRead && (
                  <span className="absolute top-1/2 -translate-y-1/2 left-2 w-2 h-2 bg-green-500 rounded-full animate-pulse "></span>
                )}
                <p className="text-sm">{n.text}</p>
                <span className="text-xs text-gray-600">{n.time}</span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Notifications;
