# Blomsterhallen (admingränssnitt)
Detta repo innehåller en klientapplikation (SPA) skapad med ramverken Vue.js och Tailwind CSS.

Klientapplikationen konsumerar en REST-webbtjänst för att logga in registrerade användare som, väl inloggade, har möjlighet att se och hanterar data om företaget Blomsterhallens olika produkter och de kategorier som produkterna tillhör. Det är även möjligt för inloggade användare att registrera nya användarkonton. 

Om en icke inloggad användare försöker komma åt de delar av klientapplikationen som kräver inloggning, omdirigeras användaren till startsidan för inloggning.

Inställning för URL till REST-webbtjänst görs i filen *src/config.js*.  
