import React, { useEffect, useState } from "react";
import style from "./CountriesList.module.css";

export default function CountriesList() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(
                    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(response)
                const data = await response.json();
                setCountries(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, []);

    const filtered = countries.filter(c =>
        c.common.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className={style.container}>
            <input
                type="text"
                placeholder="Search for countries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={style.search}
            />
            <div className={`${style.grid} countryCard`}>
                {filtered.map((c, i) => (
                    <div className={style.card} key={i}>
                        <img src={c.png} alt={c.common} />
                        <p>{c.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
