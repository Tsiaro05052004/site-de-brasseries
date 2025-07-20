'use client';

import React from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrasseriesCard } from './BrasseriesCard';
import { LoadingSpinner } from './loading';
import { Brewery, PaginationState } from '@/types/brasseries';

interface BreweryListProps {
  breweries: Brewery[];
  loading: boolean;
  pagination: PaginationState;
  onLoadMore: () => void;
  onRefresh: () => void;
  onBrewerySelect?: (brewery: Brewery) => void;
}

export const BreweryList: React.FC<BreweryListProps> = ({
  breweries,
  loading,
  pagination,
  onLoadMore,
  onRefresh,
  onBrewerySelect
}) => {
  const hasMore = breweries.length >= pagination.page * pagination.perPage;

  if (breweries.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl">🍺</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Aucune brasserie trouvée
          </h3>
          <p className="text-muted-foreground">
            Essayez d'ajuster vos filtres ou d'explorer une autre région.
          </p>
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Résumé */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {loading && breweries.length === 0 ? (
            'Chargement des brasseries...'
          ) : (
            <>
              <span className="font-semibold text-foreground">{breweries.length}</span>{' '}
              brasserie{breweries.length > 1 ? 's' : ''} trouvée{breweries.length > 1 ? 's' : ''}
              {pagination.page > 1 && (
                <span className="ml-2">(Page {pagination.page})</span>
              )}
            </>
          )}
        </div>

        <Button variant="ghost" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {breweries.map((brewery) => (
          <div key={brewery.id} className="animate-fade-in">
            <BrasseriesCard Brewery={brewery} onClick={() => onBrewerySelect?.(brewery)} />
          </div>
        ))}
      </div>

      {/* Skeleton si chargement initial */}
      {loading && breweries.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* Bouton "Charger plus" */}
      {hasMore && !loading && (
        <div className="text-center pt-4">
          <Button variant="outline" onClick={onLoadMore} className="px-8 py-3">
            <ChevronDown className="w-4 h-4 mr-2" />
            Charger plus de brasseries
          </Button>
        </div>
      )}

      {/* Indicateur de chargement lors de scroll */}
      {loading && breweries.length > 0 && (
        <div className="text-center py-4">
          <LoadingSpinner size="md" />
          <p className="text-sm text-muted-foreground mt-2">
            Chargement en cours...
          </p>
        </div>
      )}

      {/* Fin des résultats */}
      {!hasMore && breweries.length > 0 && !loading && (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">
            Vous avez vu toutes les brasseries disponibles.
          </p>
        </div>
      )}
    </div>
  );
};
