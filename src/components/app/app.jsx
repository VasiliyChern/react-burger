import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { apiUrl } from '../utils/data';

const App = () => {
  const[isLoading, setLoading] = React.useState(false);
  const[hasError, setError] = React.useState(false);
  const[apiData, setApiData] = React.useState(null);

  React.useEffect(() => {
    getApiIngredients();
  }, []);

  const getApiIngredients = () => {
    setError(false);
    setLoading(true);

    fetch(apiUrl)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(new Error(`Ошибка при выполнении запроса данных. Информация об ошибке ${res.status} (${res.statusText})`))
        }
      })
      .then(data => {
        setApiData(data); 
      })
      .catch(e => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && <p>Загрузка...</p>}
      {hasError && <p>Произошла ошибка</p>}
      {!isLoading &&
        !hasError &&
        apiData &&
        apiData.data && apiData.data.length > 0 &&
        <main className={styles.content}>
          <BurgerIngredients data={apiData.data} />
          <div className='pr-5 pl-5' />
          <BurgerConstructor data={apiData.data} />
        </main>
      }
    </div>
  );
}

export default App;