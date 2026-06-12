# LuxeDrive API — Laravel Backend

REST API voor het LuxeDrive platform, gebouwd met Laravel 11 en MySQL.

Zie de [hoofdpagina README](../README.md) voor volledige documentatie en installatie-instructies.

## Snel starten

```bash
composer install
cp .env.example .env
php artisan key:generate
# Stel DB_* in .env in, maak database 'luxedrive' aan
php artisan migrate --seed
php artisan serve
```

API draait op **http://localhost:8000/api**
