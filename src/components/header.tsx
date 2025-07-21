'use client';

import { Beer, Github, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <Beer className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Open Brewery Explorer
              </h1>
              <p className="text-sm text-muted-foreground">
                Découvrez les meilleures brasseries des États-Unis
              </p>
            </div>
          </div>

          {/* Liens de navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://api.openbrewerydb.org/breweries"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <BookText className="w-4 h-4" />
                Documentation API: OpenBreweryDB
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/Tsiaro05052004/site-de-brasseries.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Beer className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
