<?php

namespace App\Http\Traits;

trait IfFieldExistsTrait
{
    public function FieldExists($request, $field, $roles) {
        if ($request->$field) {
            return $request->validate([
                $field => $roles
            ]);
        };
    }
}