'use client';
import { Brewery } from '@/types/brasseries';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchAllBreweries } from '@/app/route/api'; 
import { MapPin } from 'lucide-react';


export const BrasseriesCard = () => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const data = await fetchAllBreweries();
        setBreweries(data);
      } catch (error) {
        console.error('Erreur lors du chargement des brasseries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  if (loading) {
    return <p className="text-center text-muted-foreground">Chargement des brasseries...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {breweries.map((brewery) => (
        <Card key={brewery.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{brewery.name}</CardTitle>
            <p className="text-sm text-muted-foreground capitalize">{brewery.brewery_type}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{brewery.city}, {brewery.state}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                Visiter le site
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
