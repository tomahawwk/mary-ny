import React, { FC, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Props {
  onEnd(value: boolean): void;
}

const DragDropComponent: FC<Props> = ({onEnd}) => {
  const [endGame, setEndGame] = useState<boolean>(false);
  const initialColumns: any = {
    todo: {
      id: 'todo',
      list: [
        { id: '4', content: 'Замышляю', actived: false },
        { id: '3', content: 'Что', actived: false },
        { id: '2', content: 'Клянусь', actived: false },
        { id: '6', content: 'Шоппинг', actived: false },
        { id: '5', content: 'Только', actived: false },
        { id: '1', content: 'Торжественно', actived: false }
      ]
    },
    done: {
      id: 'done',
      list: []
    }
  };

  const [columns, setColumns] = useState<any>(initialColumns);

  const correctOrderIds = ['1', '2', '3', '4', '5', '6']; 
  const checkCorrectOrder = (list: { id: string; content: string; actived: boolean }[]) => {
    return list.map(item => item.id).join(',') === correctOrderIds.join(',');
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList: any = Array.from(start.list);
      const [movedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, movedItem);

      const newColumn = {
        id: start.id,
        list: newList
      };

      setColumns((prev: any) => ({
        ...prev,
        [newColumn.id]: newColumn
      }));

      // Проверка порядка в колонке "done"
      if (newColumn.id === 'done' && checkCorrectOrder(newList)) {
        setEndGame(true);
        onEnd(true);
      }
    } else {
      const newStartList = Array.from(start.list);
      const [movedItem]: any = newStartList.splice(source.index, 1);

      // Устанавливаем actived в true, если элемент перетащен в колонку "done"
      if (destination.droppableId === 'done') {
        setTimeout(()=>{
          if(!movedItem.actived) movedItem.actived = true;
        }, 400)
      }

      const newEndList: any = Array.from(end.list);
      newEndList.splice(destination.index, 0, movedItem);

      const newStartColumn = {
        id: start.id,
        list: newStartList
      };

      const newEndColumn = {
        id: end.id,
        list: newEndList
      };

      setColumns((prev: any) => ({
        ...prev,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn
      }));

      // Проверка порядка в колонке "done"
      if (newEndColumn.id === 'done' && checkCorrectOrder(newEndList)) {
        console.log('Correct order in Done column!');
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full gap-sm">
        {/* Колонка "todo" */}
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-[rgba(255,255,255,0.2)] rounded-sm p-[15px] w-1/2"
            >
              {columns.todo.list.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="item"
                    >
                      <div className="front">?</div>
                      <div className="back">{item.content}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Колонка "done" */}
        <Droppable droppableId="done">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-[rgba(255,255,255,0.3)] rounded-sm p-[15px] w-1/2"
            >
              {columns.done.list.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`item active ${item.actived ? "actived" : ""} ${endGame ? " calm" : ""}`}
                    >
                      <div className="front">?</div>
                      {item.actived ? <div className="back backend">{item.content}</div> : <div className="front">?</div>}
                      <div className="back">{item.content}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default DragDropComponent;
