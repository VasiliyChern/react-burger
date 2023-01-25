const apiUrl =  'https://norma.nomoreparties.space/api';

const validateResponse = (result) => {
  return (result.ok) 
    ? result.json() 
    : result.json().then((error) => Promise.reject(error));
};

function request(url, options) {
    return fetch(url, options).then(validateResponse)
};

export const getApiBurgerIngredients = () => {
  return request(`${apiUrl}/ingredients`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
};

export const postApiBurgerOrder = (itemsId) => {
  return request(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients": itemsId})
    })
};
