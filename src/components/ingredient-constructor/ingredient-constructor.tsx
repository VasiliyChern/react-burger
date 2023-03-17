import { useDispatch } from '../../hooks/hooks';
import { useRef } from 'react';
import styles from './ingredient-constructor.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { SELECTION_INGREDIENT_REORDER, SELECTION_INGREDIENT_DELETE } from '../../services/constants/selection';
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from 'dnd-core'
import { TIngredientReducerType } from '../../services/types/types-burger';

type TIngredientConstructorProps = {
  item: TIngredientReducerType;
  index: number;
} 

const IngredientConstructor = ({ item, index }: TIngredientConstructorProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['sort_ingredient'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(itemfly: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = itemfly.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: SELECTION_INGREDIENT_REORDER,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      itemfly.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sort_ingredient',
    item: () => ({ item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
 
  if (item.type !== 'bun') drag(drop(ref));

  return (
    <div ref={ref} className={`${styles.main_layer} pr-2`} style={{ opacity }} data-handler-id={handlerId}>
      <div className='mr-2'>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} 
        handleClose = {() =>
          dispatch({
            type: SELECTION_INGREDIENT_DELETE,
            payload: index
          })
        }
      />
    </div>
  )
};

export default IngredientConstructor;
