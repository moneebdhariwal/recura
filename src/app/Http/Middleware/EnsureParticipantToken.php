<?php

namespace App\Http\Middleware;

use App\Models\Participant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureParticipantToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->query('token');

        if (!$token) {
            return redirect()->route('landing');
        }

        $participant = Participant::where('session_token', $token)->first();

        if ($participant) {
            $request->attributes->set('participant', $participant);
        }

        return $next($request);
    }
}
