import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `When responding, welcome the user always as Jaz Lino and say welcome to the Trello App Clone by Jazz Lino!
                Limit the response to 100 characters`,
            },
            {
                role: "user",
                content: `Hola, proporcione un resumen de los siguientes tareas.
                Cuente cuántas tareas pendientes hay en cada categoría, como Por hacer, en curso y finalizadas,
                ¡entonces dígale al usuario que tenga un día productivo! aquí están los datos: ${JSON.
                stringify(
                    todos
                )}`,
            },
        ],
    });

    const { data } = response;

    return NextResponse.json(data.choices[0].message);
}