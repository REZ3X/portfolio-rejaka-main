import React from 'react';
import { IconProps } from './IconSet';
import { CloseIcon } from './IconSet';

interface ModalHeaderProps {
  title: string;
  Icon: React.FC<IconProps>;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, Icon, onClose }) => {
  return (
    <div className="sticky top-0 z-10 border-b border-[#5d4a5c] bg-gradient-to-r from-[#3a2939] to-[#2e1e2e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-[#e6a2ce] to-[#c678a4] rounded-full mr-3"></div>
        <div className="flex items-center">
          <Icon size={28} className="mr-3 shadow-lg" />
          <h2 className="text-[#f4c6e2] text-xl font-medium">{title}</h2>
        </div>
      </div>
      <button
        onClick={onClose}
        className="px-3 py-1 text-sm bg-[#4e3a4d] text-[#e6a2ce] border border-[#5d4a5c] hover:bg-[#5d4a5c] rounded-full transition-all hover:shadow-md flex items-center gap-1.5 group"
      >
        <span>Close</span>
        <CloseIcon className="opacity-80 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default ModalHeader;