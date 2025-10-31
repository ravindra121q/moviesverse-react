const SearchBar = ({ value, onChange, placeholder = "Search movies..." }) => {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent px-1 py-2 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
