import {v4 as uuidv4} from 'uuid';

const apiUrl =  'https://norma.nomoreparties.space/api';

const validateResponse = (result) => {
  return (result.ok) 
    ? result.json() 
    : result.json().then((error) => Promise.reject(error));
};

export const getApiBurgerIngredients = () => {
  return fetch(`${apiUrl}/ingredients`)
    .then(validateResponse)
    .then(data => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
};

export const postApiBurgerOrder = (itemsId) => {
  return fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients": itemsId})
    })
    .then(validateResponse)
};

export const temporaryСompositionBurger = (offerContext) => {
  let tempSelectionBunFirst = offerContext.data.find(elem => elem.type === "bun");

  let tempSelectionBunSecond = offerContext.data.find(elem => elem.type === "bun" && 
      elem._id !== tempSelectionBunFirst._id);

  let tempSelectionSauceFirst = offerContext.data.find(elem => elem.type === "sauce");

  let tempSelectionSauceSecond = offerContext.data.find(elem => elem.type === "sauce" && 
      elem._id !== tempSelectionSauceFirst._id);
      
  let tempSelectionMainFirst = offerContext.data.find(elem => elem.type === "main");

  let tempSelectionMainSecond = offerContext.data.find(elem => elem.type === "main" && 
      elem._id !== tempSelectionMainFirst._id);
  
  return [
    {id: uuidv4(), value: tempSelectionBunSecond},
    {id: uuidv4(), value: tempSelectionSauceSecond},
    {id: uuidv4(), value: tempSelectionMainFirst},
    {id: uuidv4(), value: tempSelectionSauceSecond},
    {id: uuidv4(), value: tempSelectionMainSecond}
  ]
};

