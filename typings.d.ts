
interface Board {
    column: Map<TypeColum, Column>
}

type TypeColum = "todo" | "inprogress" | "done";

interface Column {
    id: TypeColum,
    todos: Todo[]
}

interface Todo {
    $id: string,
    $createAt: string,
    title: string,
    status: TypeColum,
    image?: Image,
}

interface Image {
    bucketId: string,
    fileId: string,
}