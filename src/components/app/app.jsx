import React, { useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getApiBurgerIngredients, temporaryСompositionBurger } from '../../services/utils/data';
import { OfferContext, SelectionContext, OrderNumberContext } from '../../services/burger-context';

const App = () => {
  const[offerContext, setOfferContext] = useState('');
  const[selectionContext, setSelectionContext] = useState('');
  const[orderNum, setOrderNum] = useState(0);

  const[isLoading, setLoading] = useState(false);
  const[hasError, setError] = useState(false);

  React.useEffect(() => {
    setError(false);
    setLoading(true);

    getApiBurgerIngredients()
      .then(setOfferContext)
      .catch(e =>  {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (offerContext !== '') {
      setSelectionContext(temporaryСompositionBurger(offerContext));
    }
  }, [offerContext]);

  return (
    <OfferContext.Provider value={{offerContext, setOfferContext}}> 
     <SelectionContext.Provider value={{selectionContext, setSelectionContext}}> 
       <OrderNumberContext.Provider value={{orderNum, setOrderNum}}> 
         <div className={styles.app}>
           <AppHeader />
           {isLoading && <p>Загрузка...</p>}
           {hasError && <p>Произошла ошибка</p>}
           {!isLoading &&
             !hasError &&
             offerContext &&
             offerContext.data && offerContext.data.length > 0 &&
             <main className={styles.content}>
               <BurgerIngredients />
               <div className='pr-5 pl-5' />
               <BurgerConstructor />
             </main>
           }
         </div>
       </OrderNumberContext.Provider> 
     </SelectionContext.Provider> 
    </OfferContext.Provider> 
  );
}

export default App;