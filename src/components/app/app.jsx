import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend} >
          <BurgerIngredients />
          <div className='pr-5 pl-5' />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;