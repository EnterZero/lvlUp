import { useState } from 'react';
import games from './data'; 

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // Durchsuchen Sie die Spiele nach Titeln, die das Suchkriterium enthalten
    const results = games.filter((game) =>
      game.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="relative sm:ml-6 my-2">
      <input
        type="search"
        className="text-center bg-purple-white shadow rounded border-0 p-0.5"
        placeholder="Search for game"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg mt-1">
        {searchResults.map((game) => (
          <div key={game.id} className="p-2">
         <img src={game.image} alt={game.title} className="h-8 w-auto" />
         <span className="ml-2">{game.title}</span>
 </div>
 ))}

      </div>
    </div>
  );
}
