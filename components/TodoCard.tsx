'use client'

import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import { XCircleIcon } from '@heroicons/react/24/solid';

type Props = {
    todo: Todo,
    index: number,
    id: TypeColum,
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Props) => {
    return (
        <div
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
            className="bg-white rounded-md space-y-2 drop-sha"
        >
            <div  className="flex justify-between items-center p-5">
                <p> {todo.title} </p>
                <button className="text-red-500 hover:text-red-600">
                <XCircleIcon className="ml-5 h-8 w-8" />
                </button>
            </div>
            {/* {imageUrl && (

            )} */}
        </div>
    )
}

export default TodoCard
