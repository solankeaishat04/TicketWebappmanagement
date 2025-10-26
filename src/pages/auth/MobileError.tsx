/** @format */

import { IoIosArrowBack } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";

interface MobileErrorProps {
  onClose: () => void;
  onSupport?: () => void;
  message: string;
  code?: string | number;
}

const MobileError = ({ onClose, message, code }: MobileErrorProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start py-[10%] px-4 gap-4 bg-gray-50 z-50 md:hidden">
      {/* Header */}
      <div
        onClick={onClose}
        className="flex items-center gap-3 bg-gray-200 w-full max-w-[95%] p-5 rounded-lg cursor-pointer"
      >
        <div className="bg-white border border-gray-300 p-1 rounded-full">
          <IoIosArrowBack className="text-gray-700" size={18} />
        </div>
        <span className="font-semibold text-base text-gray-800">
          Triage
        </span>
      </div>

      {/* Error Icon */}
      <div className="bg-red-100 border border-red-400 rounded-full p-3 mt-10 flex items-center justify-center text-red-500">
        <BiErrorCircle size={64} />
      </div>

      {/* Title */}
      <h5 className="font-semibold text-lg text-gray-800 mt-3">
        Error Occurred
      </h5>

      {/* Error Message Box */}
      <div className="flex items-center justify-center w-[90%] bg-white py-4 px-3 border border-gray-300 rounded-lg text-center">
        <p className="text-sm text-gray-700">{message}</p>
      </div>

      {/* Error Code */}
      {code && (
        <span className="text-xs text-gray-500 text-center mt-1">
          Error code: {code}
        </span>
      )}

      {/* Retry Button */}
      <button
        onClick={onClose}
        className="w-[244px] h-[48px] bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg mt-10 transition-all"
      >
        Retry
      </button>

     
    </div>
  );
};

export default MobileError;
