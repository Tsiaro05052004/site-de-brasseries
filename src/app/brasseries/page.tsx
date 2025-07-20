'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { useToast } from '@/hooks/use-toast';
import  ToggleVue  from '@/components/toggleVue';
import  SearchBar  from '@/components/SearchBar';
import  {BrasseriesCard}  from '@/components/BrasseriesCard';
// import { BreweryMap } from '@/components/BreweryMap';
import { LoadingOverlay } from '@/components/loading';

import { useBreweries } from '@/hooks/useBreweries';
import { Brewery, ViewMode } from '@/types/brasseries';

const BrasseriesPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  const { toast } = useToast();

  const {
    breweries,
    loading,
    error,
    pagination,
    searchBreweries,
    loadMore,
    refresh,
  } = useBreweries();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erreur de chargement',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleBrewerySelect = (brewery: Brewery) => {
    setSelectedBrewery(brewery);
    if (viewMode === 'list') setViewMode('map');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Explorez les brasseries américaines
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez plus de 8000 brasseries à travers les États-Unis. Recherchez par nom, filtrez par type et explorez leur localisation sur la carte interactive.
            </p>
          </div>

          <SearchBar onSearch={searchBreweries} loading={loading} />

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {loading && breweries.length === 0 ? (
                'Recherche en cours...'
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    {breweries.length}
                  </span>{' '}
                  brasserie{breweries.length !== 1 ? 's' : ''} trouvée{breweries.length !== 1 ? 's' : ''}
                </>
              )}
            </div>

            <ToggleVue
              currentView={viewMode}
              onViewChange={setViewMode}
              disabled={loading && breweries.length === 0}
            />
          </div>
        </div>

        <LoadingOverlay isLoading={loading && breweries.length === 0} message="Chargement des brasseries...">
          <div className="min-h-[600px]">
            {viewMode === 'list' ? (
              <BrasseriesCard
                breweries={breweries}
                loading={loading}
                pagination={pagination}
                onLoadMore={loadMore}
                onRefresh={refresh}
                onBrewerySelect={handleBrewerySelect}
              />
            ) : (
              <div className="h-[600px] lg:h-[700px]">
                {/*<BreweryMap
                  breweries={breweries}
                  selectedBrewery={selectedBrewery}
                  onBrewerySelect={setSelectedBrewery}
                  loading={loading && breweries.length === 0}
                />*/}
              </div>
            )}
          </div>
        </LoadingOverlay>

        {breweries.length > 0 && (
          <div className="bg-card rounded-lg border p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Statistiques des résultats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(
                breweries.reduce((acc, brewery) => {
                  acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">{type}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Données fournies par{' '}
              <a
                href="https://api.openbrewerydb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                Open Brewery DB
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Application développée avec Next.js, TypeScript, ShadCN UI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrasseriesPage;
