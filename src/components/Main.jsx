import React, { useState, useEffect } from 'react';

const Main = () => {
    const movies = [ //array iniziale
        { title: 'Inception', genre: 'Fantascienza' },
        { title: 'Il Padrino', genre: 'Thriller' },
        { title: 'Titanic', genre: 'Romantico' },
        { title: 'Batman', genre: 'Azione' },
        { title: 'Interstellar', genre: 'Fantascienza' },
        { title: 'Pulp Fiction', genre: 'Thriller' },
    ];

     //dichiaraz variabili di stato
    const [selectedGenre, setSelectedGenre] = useState(''); //const per la selection genere
    const [filteredMovies, setFilteredMovies] = useState(movies);//memorizza array film filtrati
    const [searchTerm, setSearchTerm] = useState('');//memorizza la stringa di ricerca inserita dall' utente
    const [newMovie, setNewMovie] = useState({ title: '', genre: '' });//const per dati del nuovo film da aggiungere 

    useEffect(() => {
        let filtered = movies;

        if (selectedGenre) {
            filtered = filtered.filter((movie) => movie.genre === selectedGenre); // filtro per selez genere
        }

        if (searchTerm) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredMovies(filtered);
    }, [selectedGenre, searchTerm, movies]);

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleAddMovie = (event) => {
        event.preventDefault();
        // Aggiungi il nuovo film alla lista originale
        movies.push(newMovie);
        // Aggiorna lo stato per riflettere la modifica
        setFilteredMovies([...movies]);
        setNewMovie({ title: '', genre: '' });
    };

    return (
        <div className="container">
            <div className="mb-3">
                <select
                    className="form-select"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                >
                    <option value="">Tutti i generi</option>
                    {[...new Set(movies.map((movie) => movie.genre))].map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca per titolo..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <ul className="list-group">
                {filteredMovies.map((movie, index) => (
                    <li className="list-group-item" key={index}>
                        {movie.title} ({movie.genre})
                    </li>
                ))}
            </ul>

            <form className="mt-3" onSubmit={handleAddMovie}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Titolo"
                        value={newMovie.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="genre"
                        className="form-control"
                        placeholder="Genere"
                        value={newMovie.genre}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Aggiungi film
                </button>
            </form>
        </div>
    );
};

export default Main;
