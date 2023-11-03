"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore} from '@/components'
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants'
import { useState, useEffect } from 'react';


export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(202)

  // pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    const result = await fetchCars({
      manufacturer: manufacturer || '',
      year: year || 2022,
      fuel: fuel || '',
      limit: limit || 10,
      model: model || '',
    });

    setAllCars(result);
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])


  const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you may be interested in!</p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
               {allCars?.map((car) => (
               <CarCard car={car} />
               ))}
            </div>

            <ShowMore 
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Uh oh, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
