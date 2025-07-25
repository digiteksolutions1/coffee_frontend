import { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";

const ClearForm = ({ onClickFunction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = {
    primary: "#1E90FF", // Bright sky blue
    danger: "#EF4444", // Red for destructive actions
    success: "#10B981", // Green for success
    warning: "#F59E0B", // Orange for warnings
    text: "#333333", // Dark text
    textLight: "#6B7280", // Light gray text
    white: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    onClickFunction();
    // Add your form clearing logic here
    closeModal();
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-100 transform hover:scale-105 active:scale-95 shadow-lg mr-5 cursor-pointer"
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
        }}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear Form
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 transition-all duration-300"
          style={{ backgroundColor: colors.overlay }}
          onClick={closeModal} // Close when clicking overlay
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 relative transform transition-all duration-300 scale-100"
            style={{
              backgroundColor: colors.white,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:bg-gray-100"
              style={{ color: colors.textLight }}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: colors.danger + "20" }}
                >
                  <AlertTriangle
                    className="h-8 w-8"
                    style={{ color: colors.danger }}
                  />
                </div>
              </div>

              <h2
                className="text-xl font-semibold text-center mb-2"
                style={{ color: colors.text }}
              >
                Clear Form Data?
              </h2>

              <p
                className="text-center text-sm leading-relaxed"
                style={{ color: colors.textLight }}
              >
                Are you sure you want to clear all form data? This action cannot
                be undone and all your entered information will be lost.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="px-6 pb-6">
              <div className="flex space-x-3">
                {/* Cancel Button */}
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 border"
                  style={{
                    backgroundColor: "transparent",
                    color: colors.textLight,
                    borderColor: "#E5E7EB",
                  }}
                >
                  Cancel
                </button>

                {/* Confirm Button */}
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: colors.danger,
                    color: colors.white,
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearForm;
