# 🍺 Open Brewery Explorer

Une application React interactive pour explorer les brasseries aux États-Unis en utilisant l’API [Open Brewery DB](https://www.openbrewerydb.org/).

## 🚀 Fonctionnalités

- Affichage des brasseries sur une **carte interactive** avec [React Leaflet](https://react-leaflet.js.org/)
- Vue **liste en tableau** ou en **cartes**
- **Recherche dynamique** par nom de brasserie
- **Switch** entre la vue carte et la vue liste
- **Pagination** des résultats
- **Détails** d'une brasserie affichés au clic sur un marqueur

## 🧰 Technologies utilisées

- [React js](https://reactjs.org/)
- [Next js](https://nextjs.org/)
- [Axios](https://axios-http.com/)
- Shadcn
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- Tailwind 

## 🗺️ API utilisée

- **Nom :** Open Brewery DB
- **URL :** https://api.openbrewerydb.org/breweries
- **Fonctionnalités de l’API :**
  - Filtrage par nom : `?by_name=`
  - Pagination : `?page=1&per_page=20`
  - Données géolocalisées : latitude / longitude

## 📦 Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Tsiaro05052004/site-de-brasseries.git
   cd open-brewery-app

2. Installation des dépendances
   ```bash
   npm install 
   npm install axios 
   npm install react-leaflet 
   npm install leaflet
   npx shadcn@latest init 

3. Lancer le serveur de développement :
   ```bash
   npm run dev

4. Accéder à l'application sur :
   ```bash
   http://localhost:5173/

