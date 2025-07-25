import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import colors from "../../utils/colors";
import { Navigate } from "react-router";
import { Coffee, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import Logout from "../../components/Logout";
import ExpandableClientForm from "../../components/ExpandClientForm";
import ClearForm from "../../components/ClearForm";

export default function Dashboard() {
  const [notes, setNotes] = useState(Array(135).fill("").join("\n"));
  const [isNotesExpanded, setIsNotesExpanded] = useState(true);

  const toggleNotes = () => {
    setIsNotesExpanded(!isNotesExpanded);
  };
  const resetNotes = () => {
    setNotes(Array(135).fill("").join("\n"));
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      {/* Navbar */}
      <header
        className="w-full py-4 px-6 flex items-center justify-between shadow-md"
        style={{
          backgroundColor: "white",
          borderBottom: `1px solid ${colors.lightGray}`,
        }}
      >
        <div className="flex items-center">
          <Coffee className="h-6 w-6 mr-2" style={{ color: colors.primary }} />
          <h1 className="text-xl font-medium" style={{ color: colors.text }}>
            Online Virtual Coffee
          </h1>
        </div>
        <div className="flex items-center">
          <Logout />
        </div>
      </header>
      <div className="flex flex-1 relative">
        {/* Main content area with expandable client form */}
        <main className="flex-1 p-6">
          <ExpandableClientForm sideNotes={notes} notesReset={resetNotes} />
        </main>

        {/* Notes toggle button */}
        <button
          onClick={toggleNotes}
          className="fixed top-18 right-0 z-10 p-2 rounded-l-md shadow-md transition-all duration-300 border-1"
          style={{
            backgroundColor: "white",
            color: colors.primary,
            transform: isNotesExpanded ? "translateX(-380px)" : "translateX(0)",
          }}
        >
          {isNotesExpanded ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>

        {/* Right sidebar with notes */}
        <aside
          className="transition-all duration-300 border-l flex flex-col"
          style={{
            width: isNotesExpanded ? "380px" : "0",
            opacity: isNotesExpanded ? 1 : 0,
            overflow: "hidden",
            borderColor: colors.lightGray,
            backgroundColor: "white",
          }}
        >
          {/* Notes header */}
          <div
            className="p-4 border-b"
            style={{ borderColor: colors.lightGray }}
          >
            <h2
              className="font-medium text-center"
              style={{ color: colors.text }}
            >
              Notes
            </h2>
          </div>

          {/* Notes content - styled like lined paper */}
          <div className="flex-1 p-4">
            <div
              className="h-full w-full rounded-md overflow-hidden"
              style={{
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className="w-full h-full p-4 resize-none outline-none"
                style={{
                  color: colors.text,
                  lineHeight: "1.5rem",
                  backgroundImage: `
                    linear-gradient(transparent, transparent 1.4rem, ${colors.lineColor} 1.4rem, ${colors.lineColor} 1.5rem, transparent 1.5rem)
                  `,
                  backgroundSize: "100% 1.5rem",
                  paddingTop: "1.5rem", // Start below the first line
                  backgroundColor: "transparent",
                  backgroundAttachment: "local",
                }}
              ></textarea>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
