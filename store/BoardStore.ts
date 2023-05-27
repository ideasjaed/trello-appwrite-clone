import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    newTaskInput: string;
    searchString: string;
    newTaskType: TypeColum;
    image: File | null;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypeColum) => void;
    setNewTaskInput: (input: string) => void;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypeColum) => void;
    setNewTaskType: (columnId: TypeColum) => void;
    setImage: (image: File | null) => void;
  }

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    column: new Map<TypeColum, Column>()
  },

  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",
  image: null,
  setSearchString: (searchString) => set({ searchString }),

  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypeColum) => {
    const newColumns = new Map(get().board.column);
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { column: newColumns } });

    if(todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  setNewTaskInput: (input: string) => set({ newTaskInput: input}),

  setNewTaskType: (columnId: TypeColum) => set({ newTaskType: columnId}),

  updateTodoInDB: async(todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    )
  },

  setImage: (image: File | null) => set({ image }),
}))