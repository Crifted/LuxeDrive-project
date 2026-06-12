<?php
namespace Database\Seeders;
use App\Models\Car;
use Illuminate\Database\Seeder;
class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            [
                'make' => 'Bugatti', 'model' => 'Chiron Super Sport', 'year' => 2023, 'price' => 3850000,
                'power' => '1600 pk', 'accel' => '2,4 s', 'topspeed' => '440 km/u', 'status' => 'available',
                'image' => '/cars/chironsuper.jpg',
                'description' => 'Het absolute toppunt van Franse ingenieurskunst. Een 8.0L quad-turbo W16 die 1600 pk levert.',
            ],
            [
                'make' => 'Ferrari', 'model' => 'SF90 Stradale', 'year' => 2024, 'price' => 625000,
                'power' => '1000 pk', 'accel' => '2,5 s', 'topspeed' => '340 km/u', 'status' => 'available',
                'image' => '/cars/sf90.jpg',
                'description' => "Ferrari's eerste plug-in hybride supercar. Een V8 met drie elektromotoren voor 1000 pk.",
            ],
            [
                'make' => 'Lamborghini', 'model' => 'Revuelto', 'year' => 2024, 'price' => 540000,
                'power' => '1015 pk', 'accel' => '2,5 s', 'topspeed' => '350 km/u', 'status' => 'available',
                'image' => '/cars/revoltu.jpg',
                'description' => 'De opvolger van de Aventador. Een nieuwe V12 hybride-aandrijflijn.',
            ],
            [
                'make' => 'McLaren', 'model' => '765LT', 'year' => 2022, 'price' => 415000,
                'power' => '765 pk', 'accel' => '2,8 s', 'topspeed' => '330 km/u', 'status' => 'sold',
                'image' => '/cars/j65lt.jpg',
                'description' => 'Longtail-filosofie in zijn puurste vorm. Geobsedeerd met gewicht en aerodynamica.',
            ],
            [
                'make' => 'Koenigsegg', 'model' => 'Jesko Absolut', 'year' => 2023, 'price' => 3200000,
                'power' => '1600 pk', 'accel' => '2,5 s', 'topspeed' => '480+ km/u', 'status' => 'available',
                'image' => '/cars/jesko.jpg',
                'description' => 'Ontworpen om de snelste productieauto ooit te zijn. Zweedse precisie zonder compromis.',
            ],
            [
                'make' => 'Pagani', 'model' => 'Huayra Roadster BC', 'year' => 2021, 'price' => 3500000,
                'power' => '802 pk', 'accel' => '2,8 s', 'topspeed' => '383 km/u', 'status' => 'available',
                'image' => '/cars/pagani.jpg',
                'description' => 'Een rijdend kunstwerk uit Modena. Elk paneel met de hand afgewerkt.',
            ],
        ];
        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}