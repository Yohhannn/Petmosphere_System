<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Handle preflight OPTIONS request
        if ($request->getMethod() == "OPTIONS") {
            return response()
                ->json(['status' => 'ok'])
                ->header('Access-Control-Allow-Origin', 'http://localhost:5174')  // You can replace '*' with 'http://localhost:5174' for more security
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Max-Age', '3600'); // Optional: Add max age for caching preflight requests
        }

        // Add CORS headers for all other requests
        $response = $next($request);
        
        // These headers will be added to every response
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5174');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        
        return $response;
    }
}
