# 🏎️ LuxeDrive — Exclusive Auto Reseller Platform

Een volledig webplatform voor de aan- en verkoop van luxe en sportauto's
(Ferrari, Bugatti, Lamborghini, McLaren, Koenigsegg, Pagani).

> Praktijksimulatie Webdeveloper — Yonder · Marco & Abasin · 2025–2026

---

## ✨ Functionaliteiten

- **Publieke collectie** met filters (merk, prijs, status)
- **Detailpagina** per auto met specs en omschrijving
- **Beveiligde admin-omgeving** met login (Laravel Sanctum tokens)
- **Volledige CRUD**: auto's toevoegen, bewerken en verwijderen
- **REST API** (Laravel) met **MySQL** database
- **Next.js (React)** frontend die de API consumeert

---

## 🧱 Tech stack

| Laag       | Technologie                          |
|------------|--------------------------------------|
| Frontend   | Next.js 14 (React), CSS              |
| Backend    | Laravel 11 (PHP), REST API           |
| Database   | MySQL                                |
| Auth       | Laravel Sanctum (bearer tokens)      |
| Versiebeheer | Git / GitHub                       |

---

## 📂 Projectstructuur

```
luxedrive/
├── backend/          # Laravel API (drop-in bestanden)
│   ├── app/Models/                Car.php, User.php
│   ├── app/Http/Controllers/Api/  CarController.php, AuthController.php
│   ├── app/Http/Resources/        CarResource.php
│   ├── routes/api.php
│   ├── database/migrations/       cars-tabel
│   ├── database/seeders/          admin-user + 6 auto's
│   └── config/cors.php
├── frontend/         # Next.js app
│   ├── app/                       home, cars/[id], admin/login, admin/dashboard
│   ├── components/Navbar.js
│   └── lib/api.js                 API-client
├── standalone/
│   └── LuxeDrive.html             ⚡ Volledige site in 1 bestand (zonder setup)
└── docs/
    ├── ERD.md                     Database-diagram
    └── database.sql               SQL-schema + seed
```

---

## ⚡ Snel bekijken (zonder installatie)

Open **`standalone/LuxeDrive.html`** in je browser.
Dit is de volledige site (browse, filter, detail, admin-login + CRUD) in één bestand.
Data blijft bewaard in je browser. Inloggen:

```
E-mail:     admin@luxedrive.nl
Wachtwoord: luxedrive2026
```

---

## 🚀 Volledige versie draaien (Laravel + MySQL + Next.js)

### 1. Backend (Laravel)

> Deze map bevat de **kernbestanden**. Maak eerst een verse Laravel-app en
> kopieer onze bestanden erin (zo krijg je alle framework-scaffolding).

```bash
# verse Laravel app aanmaken
composer create-project laravel/laravel luxedrive-api
cd luxedrive-api

# Sanctum installeren (voor de admin-login)
composer require laravel/sanctum
php artisan install:api

# Kopieer nu onze bestanden uit backend/ over de nieuwe app heen:
#   app/Models/Car.php
#   app/Http/Controllers/Api/CarController.php
#   app/Http/Controllers/Api/AuthController.php
#   app/Http/Resources/CarResource.php
#   routes/api.php
#   database/migrations/2026_06_11_000001_create_cars_table.php
#   database/seeders/CarSeeder.php
#   database/seeders/DatabaseSeeder.php
#   config/cors.php
#   (en app/Models/User.php zodat HasApiTokens actief is)

# .env instellen
cp .env.example .env        # of gebruik onze backend/.env.example als referentie
php artisan key:generate
```

Maak een MySQL-database `luxedrive` aan en zet de DB-gegevens in `.env`.
Daarna:

```bash
php artisan migrate --seed     # tabellen + admin-user + 6 auto's
php artisan serve              # draait op http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev                        # draait op http://localhost:3000
```

Open **http://localhost:3000**.
Admin: **http://localhost:3000/admin/login**

---

## 🔌 API endpoints

| Methode | Endpoint            | Auth | Omschrijving              |
|---------|---------------------|------|---------------------------|
| GET     | `/api/cars`         | —    | Lijst (met filters)       |
| GET     | `/api/cars/{id}`    | —    | Eén auto                  |
| POST    | `/api/login`        | —    | Inloggen → token          |
| POST    | `/api/logout`       | ✅   | Uitloggen                 |
| POST    | `/api/cars`         | ✅   | Auto toevoegen            |
| PUT     | `/api/cars/{id}`    | ✅   | Auto bewerken             |
| DELETE  | `/api/cars/{id}`    | ✅   | Auto verwijderen          |

Filters op `GET /api/cars`: `?make=Ferrari&status=available&min_price=0&max_price=1500000`

---

## 🔐 Beveiliging (datacomponent)

- De database is afgeschermd: **schrijf-acties (POST/PUT/DELETE) vereisen een geldig token**
  via `auth:sanctum`.
- Wachtwoorden worden **gehasht** opgeslagen (`Hash::make` / `hashed` cast).
- Publiek kan alleen **lezen** (GET); beheer kan alleen na **login**.

---

## 👥 Team & taakverdeling

- **Marco** — _(vul in: bv. frontend / Next.js)_
- **Abasin** — _(vul in: bv. backend / Laravel + API)_

## 📋 Examen-link

GitHub Classroom: https://classroom.github.com/a/qD1kwWh-
