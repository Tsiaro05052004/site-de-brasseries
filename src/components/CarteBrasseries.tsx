'use client';

import React from 'react';
import { MapPin, Phone, Globe, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brewery } from '@/types/brasseries'; 

interface CarteBrasseriesProps {
  brewery: Brewery;
  onClick?: () => void;
}

const getBreweryTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    micro: 'bg-green-600 text-white',
    nano: 'bg-blue-600 text-white',
    regional: 'bg-orange-500 text-white',
    brewpub: 'bg-primary text-primary-foreground',
    large: 'bg-secondary text-secondary-foreground',
    planning: 'bg-muted text-muted-foreground',
    bar: 'bg-accent text-accent-foreground',
    contract: 'bg-red-600 text-white',
    proprietor: 'bg-lime-600 text-white',
    closed: 'bg-muted text-muted-foreground'
  };
  return colors[type] || 'bg-secondary text-secondary-foreground';
};

const formatBreweryType = (type: string): string => {
  const types: Record<string, string> = {
    micro: 'Micro-brasserie',
    nano: 'Nano-brasserie',
    regional: 'Brasserie régionale',
    brewpub: 'Brewpub',
    large: 'Grande brasserie',
    planning: 'En projet',
    bar: 'Bar à bières',
    contract: 'Sous contrat',
    proprietor: 'Propriétaire',
    closed: 'Fermée'
  };
  return types[type] || type;
};

export const CarteBrasseries: React.FC<CarteBrasseriesProps> = ({ brewery, onClick }) => {
  const fullAddress = [
    brewery.address_1,
    brewery.city,
    brewery.state_province,
    brewery.postal_code
  ].filter(Boolean).join(', ');

  return (
    <Card 
      className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-background border"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-bold leading-tight line-clamp-2 text-foreground">
            {brewery.name}
          </CardTitle>
          <Badge 
            className={`${getBreweryTypeColor(brewery.brewery_type)} text-xs font-semibold`}
          >
            {formatBreweryType(brewery.brewery_type)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {fullAddress && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
            <span className="text-sm text-muted-foreground leading-relaxed">
              {fullAddress}
            </span>
          </div>
        )}

        {brewery.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{brewery.phone}</span>
          </div>
        )}

        {brewery.website_url && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <a 
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary-glow transition-colors duration-200 truncate"
              onClick={(e) => e.stopPropagation()}
            >
              Visiter le site
            </a>
          </div>
        )}

        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Voir les détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
