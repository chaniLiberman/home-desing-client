import React, { ChangeEvent, FormEvent, useState } from "react";
import { searchProducts } from "../services/productsService";

interface SearchBarProps {
    onSearch: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await searchProducts(searchQuery);
            const data = response.data;
            onSearch(data);
        } catch (error) {
            console.error('Error during search:', error);
            // Handle the error gracefully, perhaps by displaying an error message to the user
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-5">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products by title"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                        חיפוש
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;