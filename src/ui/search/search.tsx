import React from "react";
import { MdSearch } from "react-icons/md";
interface SearchProps {
  placeholder: string;
}
const search = ({ placeholder }: SearchProps) => {
  return (
    <div className="flex items-center p-2  bg-[#55CE63] text-white rounded-md placeholder-white w-40">
      <MdSearch className="searchIcon" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none outline-none forPlaceholder"
      />
    </div>
  );
};

export default search;
