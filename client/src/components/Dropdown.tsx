import React, { useState } from 'react';

interface DropdownProps {
  name: string;
  options: string[];
  initialValue: string;
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, initialValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const toggleDropdown = (e:any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex text-gray-400">
      <button
        className="customBorder text-left py-2 w-[100%] px-3"
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <div className="absolute font-semibold shadow-lg mt-[0%] w-30 h-30 ml-[70%] p-3 border-[#3A244A] border-2 rounded-3xl bg-white text-[#3A244A]">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 "
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <input type="hidden" name={name} value={selectedOption} className='text-left' />
    </div>
  );
};

export default Dropdown;