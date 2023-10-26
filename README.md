# DT193G Projekt - Klientapplikation (SPA)
Detta repo innehåller en klientapplikation skapad med ramverken Vue.js och Tailwind CSS.

Klientapplikationen konsumerar en REST-webbtjänst för att logga in registrerade användare som, väl inloggade, har möjlighet att se och hanterar data om företaget Blomsterhallens olika produkter och de kategorier som produkterna tillhör. Det är även möjligt för inloggade användare att registrera nya användarkonton. 

Om en icke inloggad användare försöker komma åt de delar av klientapplikationen som kräver inloggning, omdirigeras användaren till startsidan för inloggning.

Inställning för URL till den REST-webbtjänst som ska konsumeras görs i filen *src/config.js*.  
Nuvarande inställning går till lokal server http://127.0.0.1:8000/.