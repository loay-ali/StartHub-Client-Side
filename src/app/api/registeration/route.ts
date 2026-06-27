import config from "@/constants/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || '';

    const response = await fetch(config.apiUrl +'/registration/register?token='+ token,{
        method: 'POST',
        credentials: 'include'
    });

    if( response.status == 201 ) {
        return response;
    }

    return new Response(JSON.stringify({token:''}));
}