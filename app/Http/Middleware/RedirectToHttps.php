<?php

namespace App\Http\Middleware;

use Closure;

class RedirectToHttps
{
    /**
     * Redirect To Https
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->secure() == false) {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request);
    }
}