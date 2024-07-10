"use client";
import { Button } from "@/components/ui/button";
import { Movie, MovieResponse } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const URL_API = process.env.NEXT_PUBLIC_URL_API;
const URL_API_IMAGE = process.env.NEXT_PUBLIC_URL_API_IMAGE;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function Page({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>({} as Movie);

  useEffect(() => {
    fetch(
      `${URL_API}movie/${params.id}?api_key=${API_KEY}&language=es-ES&query=`,
    )
      .then((response) => response.json())
      .then((data: MovieResponse) => {
        setMovie(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {movie.id ? (
        <div className="min-h-screen w-full bg-background text-foreground">
          <header className="bg-primary px-4 py-6 text-primary-foreground md:px-6">
            <div className="container mx-auto flex items-center justify-between">
              <Link href={`/`}>
                <h2 className="text-2xl font-bold">Sky Pelis</h2>
              </Link>
              <Button variant="outline" className="rounded-md px-4 py-2">
                Watch Trailer
              </Button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-12 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <img
                  src={`${URL_API_IMAGE}${movie.poster_path}`}
                  width={600}
                  height={900}
                  alt="Movie Poster"
                  className="h-auto w-full rounded-lg object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">{movie.title}</h2>
                  <p className="text-muted-foreground">{movie.overview}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Details</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium">Director:</span> Frank
                      Darabont
                    </li>
                    <li>
                      <span className="font-medium">Stars:</span> Tim Robbins,
                      Morgan Freeman, Bob Gunton
                    </li>
                    <li>
                      <span className="font-medium">Duracion:</span>{" "}
                      {movie.runtime} min
                    </li>
                    <li>
                      <span className="font-medium">
                        Genero:{movie.genres[0].name}
                      </span>{" "}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Awards</h3>
                  <p className="text-muted-foreground">-</p>
                </div>
              </div>
            </div>
          </main>
          <div className="flex flex-col items-center justify-center">
            <div>
              <Button variant="secondary" className="rounded-md px-4 py-2">
                Watch Movie
              </Button>
            </div>
            <div className="aspect-video max-w-[800px]">
              <iframe
                src="https://drive.google.com/file/d/1s3cMGbMgyoa-Art9QsStPDkVLp0O5Fuc/preview"
                width="640"
                height="480"
                allowFullScreen
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-background text-foreground">
          <header className="bg-primary px-4 py-6 text-primary-foreground md:px-6">
            <h2>Movie not found</h2>
          </header>
        </div>
      )}
    </>
  );
}
