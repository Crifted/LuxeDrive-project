<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * GET /api/cars
     * Public listing with optional filters: make, year, status, min_price, max_price.
     */
    public function index(Request $request)
    {
        $query = Car::query();

        if ($request->filled('make')) {
            $query->where('make', $request->string('make'));
        }
        if ($request->filled('year')) {
            $query->where('year', $request->integer('year'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->integer('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->integer('max_price'));
        }

        $cars = $query->orderByDesc('created_at')->get();

        return CarResource::collection($cars);
    }

    /**
     * GET /api/cars/{car}
     * Public single car.
     */
    public function show(Car $car)
    {
        return new CarResource($car);
    }

    /**
     * POST /api/cars   (protected)
     */
    public function store(Request $request)
    {
        $data = $this->validateCar($request);

        $car = Car::create($data);

        return (new CarResource($car))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * PUT/PATCH /api/cars/{car}   (protected)
     */
    public function update(Request $request, Car $car)
    {
        $data = $this->validateCar($request, $car->id);

        $car->update($data);

        return new CarResource($car);
    }

    /**
     * DELETE /api/cars/{car}   (protected)
     */
    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(['message' => 'Auto verwijderd.'], 200);
    }

    /**
     * Shared validation rules.
     */
    private function validateCar(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'make'        => ['required', 'string', 'max:100'],
            'model'       => ['required', 'string', 'max:150'],
            'year'        => ['required', 'integer', 'min:1950', 'max:2100'],
            'price'       => ['required', 'integer', 'min:0'],
            'power'       => ['nullable', 'string', 'max:50'],
            'accel'       => ['nullable', 'string', 'max:50'],
            'topspeed'    => ['nullable', 'string', 'max:50'],
            'status'      => ['required', 'in:available,sold'],
            'image'       => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
        ]);
    }
}
