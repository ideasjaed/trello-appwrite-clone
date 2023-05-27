const formatTodoForAI = (board: Board) => {
    const todos = Array.from(board.column.entries());

    const flatArray = todos.reduce((map, [key, value]) => {
        map[key] = value.todos;
        return map;
    }, {} as { [key in TypeColum]: Todo[] });

    const flatArrayCountend = Object.entries(flatArray).reduce(
        (map, [key, value]) => {
            map[key as TypeColum] = value.length;
            return map;
        }, {} as { [key in TypeColum]: number}
    );

    return flatArrayCountend;
}

export default formatTodoForAI;