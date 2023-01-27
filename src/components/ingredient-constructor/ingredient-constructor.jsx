import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-constructor.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { SELECTION_INGREDIENT_REORDER, SELECTION_INGREDIENT_DELETE } from '../../services/actions/selection';
import { useDrag, useDrop } from "react-dnd";

const IngredientConstructor = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['sort_ingredient'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
      item.index = hoverIndex;
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

  const preventDefault = (e) => e.preventDefault();

  return (
    <div ref={ref} className={`${styles.main_layer} pr-2`} style={{ opacity }} data-handler-id={handlerId} onDrop={preventDefault}>
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

IngredientConstructor.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired
}; 

export default IngredientConstructor;
