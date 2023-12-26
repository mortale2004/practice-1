import "./SearchBox.css";
import { Search } from 'lucide-react';


const SearchBox = () => {
    return (
        <div className="searchBox">
            <input type="search" placeholder='Search Here...'/>
            <Search />
        </div>
    )
}

export default SearchBox
