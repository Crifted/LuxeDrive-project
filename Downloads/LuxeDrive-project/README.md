# LuxeDrive — Exclusive Automobiles Platform

> Praktijksimulatie Webdeveloper · Yonder · 2025–2026  
> **Team:** Marco & Abasin

Een volledig webplatform voor de aan- en verkoop van exclusieve hypercars en supercars (Bugatti, Ferrari, Lamborghini, Koenigsegg, McLaren, Pagani).

---

## Inhoudsopgave

- [Live demo (standalone)](#-snel-bekijken-zonder-installatie)
- [Tech stack](#-tech-stack)
- [Projectstructuur](#-projectstructuur)
- [Installatie](#-installatie)
- [API endpoints](#-api-endpoints)
- [Beveiliging](#-beveiliging)
- [Team](#-team--taakverdeling)

---

## Functionaliteiten

- Publieke **collectiepagina** met filters op merk, prijs en status
- **Detailpagina** per auto met foto, specs en omschrijving
- Beveiligde **admin-omgeving** met login via Laravel Sanctum
- Volledige **CRUD**: auto's toevoegen, bewerken en verwijderen
- **REST API** (Laravel 11) met MySQL database
- **Next.js 14** frontend die de API consumeert
- **Standalone versie** — volledig werkend in één HTML-bestand (geen server nodig)

---

## Tech Stack

| Laag           | Technologie                     |
|----------------|---------------------------------|
| Frontend       | Next.js 14 (React), CSS         |
| Backend        | Laravel 11 (PHP), REST API      |
| Database       | MySQL                           |
| Auth           | Laravel Sanctum (bearer tokens) |
| Versiebeheer   | Git / GitHub                    |

---

## Projectstructuur

```
LuxeDrive-project/
├── luxedrive/
│   ├── frontend/               # Next.js app
│   │   ├── app/
│   │   │   ├── page.js         # Homepage met collectie
│   │   │   ├── cars/[id]/      # Detailpagina per auto
│   │   │   ├── admin/login/    # Admin login
│   │   │   └── admin/dashboard/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── lib/
│   │   │   └── api.js          # Centrale API-client
│   │   └── public/
│   │       └── cars/           # Auto-afbeeldingen
│   └── standalone/
│       └── LuxeDrive.html      # Volledige site in 1 bestand
└── luxedrive-api/              # Laravel backend
    ├── app/
    │   ├── Http/Controllers/Api/
    │   │   ├── CarController.php
    │   │   └── AuthController.php
    │   ├── Http/Resources/
    │   │   └── CarResource.php
    │   └── Models/
    │       ├── Car.php
    │       └── User.php
    ├── database/
    │   ├── migrations/         # cars-tabel
    │   └── seeders/            # Admin-user + 6 auto's
    └── routes/
        └── api.php
```

---

## Snel bekijken (zonder installatie)

Open **`luxedrive/standalone/LuxeDrive.html`** direct in je browser.

Dit is de volledige site in één bestand: browse, filter, detail, admin-login en CRUD. Data wordt bewaard in je browser (localStorage).

**Demo inloggegevens:**
```
E-mail:     admin@luxedrive.nl
Wachtwoord: luxedrive2026
```

---

## Installatie

### Vereisten

- PHP 8.2+, Composer
- Node.js 18+, npm
- MySQL

### 1. Backend (Laravel)

```bash
cd luxedrive-api
composer install
cp .env.example .env
php artisan key:generate
```

Maak een MySQL-database `luxedrive` aan en zet de gegevens in `.env`:

```env
DB_DATABASE=luxedrive
DB_USERNAME=root
DB_PASSWORD=jouw_wachtwoord
```

```bash
php artisan migrate --seed   # tabellen aanmaken + 6 auto's + admin
php artisan serve            # draait op http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd luxedrive/frontend
npm install
```

Maak een `.env.local` bestand aan:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

```bash
npm run dev   # draait op http://localhost:3000
```

Open **http://localhost:3000** in je browser.  
Admin: **http://localhost:3000/admin/login**

---

## API Endpoints

| Methode | Endpoint          | Auth | Omschrijving              |
|---------|-------------------|------|---------------------------|
| GET     | `/api/cars`       | —    | Alle auto's (met filters) |
| GET     | `/api/cars/{id}`  | —    | Één auto                  |
| POST    | `/api/login`      | —    | Inloggen → token          |
| POST    | `/api/logout`     | ✓    | Uitloggen                 |
| POST    | `/api/cars`       | ✓    | Auto toevoegen            |
| PUT     | `/api/cars/{id}`  | ✓    | Auto bewerken             |
| DELETE  | `/api/cars/{id}`  | ✓    | Auto verwijderen          |

**Filters op `GET /api/cars`:**
```
?make=Ferrari
?status=available
?min_price=0&max_price=1500000
```

---

## Beveiliging

- Schrijf-acties (POST/PUT/DELETE) vereisen een geldig **Sanctum bearer token**
- Wachtwoorden worden **gehasht** opgeslagen (`bcrypt` via Laravel)
- Publiek kan alleen lezen (GET); beheer vereist login
- CORS is geconfigureerd voor de lokale Next.js frontend

---

## Team & Taakverdeling

| Naam   | Bijdrage                                      |
|--------|-----------------------------------------------|
| Marco  | Frontend (Next.js), styling, standalone build |
| Abasin | Backend (Laravel API), database, authenticatie|

---

## Examen

GitHub Classroom: https://classroom.github.com/a/qD1kwWh-
