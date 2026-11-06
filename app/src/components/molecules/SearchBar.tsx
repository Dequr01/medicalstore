import React from 'react';
import { useApp } from '../../context/AppContext';

export const SearchBar: React.FC<{ placeholder?: string; onSearch?: (q: string) => void }> = ({
  placeholder = 'Search by drug name, NDC, brand, or clinical category...',
  onSearch
}) => {
  const { searchQuery, setSearchQuery, setConsumerRoute } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setConsumerRoute('shop-medicines');
    }
  };

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <span className="material-symbols-outlined text-[20px] text-[#005c55]">search</span>
      </div>
      <input
        type="search"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-full border border-[#bdc9c6]/80 bg-white/95 py-2 pl-10 pr-10 text-sm text-[#131b2e] shadow-sm transition-all focus:border-[#005c55] focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 backdrop-blur"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6e7977] hover:text-[#131b2e]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
};
