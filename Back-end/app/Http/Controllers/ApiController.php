<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Employee;
use App\Models\RFID;

use function PHPUnit\Framework\isNull;

class ApiController extends Controller
{

    use HasFactory;

    public function getAllEmployees()
    {
        // $employees = Employee::get()->toJson(JSON_PRETTY_PRINT);
        // return response($employees, 200);
        return response()->json([
            'employees'  => Employee::all(),
        ], 200);
    }

    public function getemployee($id)
    {
        if (Employee::where('id', $id)->exists()) {
            $employee = Employee::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($employee, 200);
        } else {
            return response()->json([
                "message" => "Employee not found"
            ], 404);
        }
    }

    public function createEmployee(Request $request)
    {
        $employee = new Employee;
        $employee->name = $request->name;
        $employee->gender = $request->gender;
        $employee->city = $request->city;
        $employee->phone = $request->phone;
        $employee->status = $request->status;
        $employee->imageURL = $request->imageURL;
        $employee->tagID = $request->tagID;
        $employee->save();

        return response()->json([
            "message" => "Employee record created"
        ], 201);
    }

    public function updateEmployee(Request $request, $id)
    {
        if (Employee::where('id', $id)->exists()) {
            $employee = Employee::find($id);
            $employee->name = is_null($request->name) ? $employee->name : $request->name;
            $employee->gender = is_null($request->gender) ? $employee->gender : $request->gender;
            $employee->city = is_null($request->city) ? $employee->city : $request->city;
            $employee->phone = is_null($request->phone) ? $employee->phone : $request->phone;
            $employee->status = is_null($request->status) ? $employee->status : $request->status;
            $employee->imageURL = is_null($request->imageURL) ? $employee->imageURL : $request->imageURL;
            $employee->tagID = is_null($request->tagID) ? $employee->tagID : $request->tagID;
            $employee->save();

            return response()->json([
                "message" => "records updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Employee not found"
            ], 404);
        }
    }

    public function deleteEmployee($id)
    {
        if (Employee::where('id', $id)->exists()) {
            $employee = Employee::find($id);
            $employee->delete();

            return response()->json([
                "message" => "records deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Employee not found"
            ], 404);
        }
    }
    
    public function searchByName($name)
    {
        if ($name != '' || !isNull($name)) {
            $employee = Employee::where('name', 'like', '%' . $name . '%')->get();
            return response()->json([
                'employees'  => $employee,
            ], 200);
        }
        else  {
            return response()->json([
                'employees'  => Employee::All(),
            ], 200);
        }
    }
}
