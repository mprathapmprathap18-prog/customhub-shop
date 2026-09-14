import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400 focus-within:shadow-sm border border-slate-200/80 rounded-full px-3.5 py-1.5 transition duration-150">
            <input 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                className="text-xs sm:text-sm flex-1 outline-none bg-transparent placeholder-slate-400 text-slate-700" 
                type="text" 
                placeholder="Search custom mugs, t-shirts, gifts, frames..." 
            />
            <button type="submit" className="text-slate-500 hover:text-amber-600 transition pl-1.5 flex items-center" title="Search">
                <SearchIcon sx={{ fontSize: 20 }} />
            </button>
        </form>
    );
};

export default Searchbar;
