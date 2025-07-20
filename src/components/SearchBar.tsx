"use client";

import { useState } from "react";
import { searchBreweries } from "@/app/route/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Brewery = {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchBreweries(query);
      setResults(data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Rechercher une brasserie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleSearch}>Rechercher</Button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid gap-4">
          {results.map((brewery) => (
            <Card key={brewery.id}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{brewery.name}</h3>
                <p className="text-sm">
                  {brewery.city}, {brewery.state}, {brewery.country}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
