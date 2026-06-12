<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    /**
     * Shape the JSON returned to the frontend.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'make'        => $this->make,
            'model'       => $this->model,
            'year'        => $this->year,
            'price'       => $this->price,
            'power'       => $this->power,
            'accel'       => $this->accel,
            'topspeed'    => $this->topspeed,
            'status'      => $this->status,
            'image'       => $this->image,
            'description' => $this->description,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
