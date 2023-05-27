import formatTodoForAI from "./formatTodoForAI";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodoForAI(board);
    console.log('FORMATED TODOS to send --', todos);
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ todos }),
    });

    const GPTdata = await res.json();
    const { content } = GPTdata;

    return content;
}

export default fetchSuggestion;