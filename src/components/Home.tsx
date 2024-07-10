"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wk14iX3xDeK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "@/types";
const URL_API = process.env.NEXT_PUBLIC_URL_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [inputSearch, setInputSearch] = useState<string>("");

  //fetch movies

  useEffect(() => {
    fetch(
      `${URL_API}movie/popular?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false`,
    )
      .then((response) => response.json())
      .then((data: MovieResponse) => {
        setMovies(data.results);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (inputSearch !== "") {
      fetch(
        `${URL_API}search/movie?query=${inputSearch}&api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false`,
      )
        .then((response) => response.json())
        .then((data: MovieResponse) => {
          setMovies(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [inputSearch]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <Link
            href="#"
            className="text-xl font-bold text-primary"
            prefetch={false}
          >
            Sky Pelis
          </Link>
          <div className="relative max-w-md flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon className="h-5 w-5" />
            </div>
            <Input
              value={inputSearch}
              type="search"
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded-full bg-muted py-2 pl-10 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="rounded-lg bg-black/80 p-4">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="genre">
                <AccordionTrigger className="text-base">Genre</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="genre-action" /> Action
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="genre-comedy" /> Comedy
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="genre-drama" /> Drama
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="genre-sci-fi" /> Sci-Fi
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="genre-horror" /> Horror
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="year">
                <AccordionTrigger className="text-base">Year</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="year-2020" /> 2020 - Present
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="year-2015" /> 2015 - 2019
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="year-2010" /> 2010 - 2014
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="year-2000" /> 2000 - 2009
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="year-before" /> Before 2000
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rating">
                <AccordionTrigger className="text-base">
                  Rating
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="rating-4" /> 4 stars and above
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="rating-3" /> 3 stars and above
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="rating-2" /> 2 stars and above
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox id="rating-1" /> 1 star and above
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies?.map((movie: Movie) => (
                <div
                  key={movie.id}
                  className="group overflow-hidden rounded-lg bg-muted"
                >
                  <Link
                    href={`/pelis/${movie.id}`}
                    className="relative block"
                    prefetch={false}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                      }
                      alt="Movie Poster"
                      width={300}
                      height={450}
                      className="h-[450px] w-full object-cover transition-opacity group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="text-white">
                        <h3 className="line-clamp-2 text-lg font-semibold">
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="rounded-full bg-primary px-2 py-1">
                            PG-13
                          </span>
                          <span>{movie.release_date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-background py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground md:px-6">
          &copy; 2024 Sky Pelis. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
