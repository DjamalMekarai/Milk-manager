import {
  startLoading,
  addProduction,
  updateProduction,
  deleteProduction,
} from "../../features/productions/productionsSlice";

// add a new production
export const addItem = (dispatch, itemInfos, setAddUpdate) => {
  if (!itemInfos.productionDate || !itemInfos.milkAmount) {
    window.alert("Please provide all fields!");
  } else {
    dispatch(startLoading());

    fetch("/api/productions", {
      method: "POST",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((production) => dispatch(addProduction(production)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// update a production
export const updateItem = (dispatch, id, itemInfos, setAddUpdate) => {
  if (!itemInfos.productionDate || !itemInfos.milkAmount) {
    window.alert("Please provide all fields!");
  } else {
    dispatch(startLoading());

    fetch(`/api/productions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((production) => dispatch(updateProduction(production)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// delete a production
export const deleteItem = (dispatch, id) => {
  if (window.confirm("You sure you wan to delete this production")) {
    dispatch(startLoading());

    fetch(`/api/productions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((production) => dispatch(deleteProduction(production)))
      .catch((err) => {
        console.log(err);
      });
  }
};

const fetchFeilds = (arabicFieldName) => {
  switch (arabicFieldName) {
    case "Production Date":
      return "productionDate";
    case "Liters of milk produced":
      return "milkAmount";
    default:
      return "";
  }
};

// filter and order the productionList
export const filterAndOrder = (
  productionsList,
  filterByField,
  filterByValue,
  orderByValue
) => {
  let newProductionList = [...productionsList];

  if (filterByField) {
    newProductionList = newProductionList.filter((production) =>
      production[fetchFeilds(filterByField)].includes(filterByValue)
    );
  }

  if (orderByValue) {
    newProductionList.sort((production1, production2) =>
      production1[fetchFeilds(orderByValue)] >
      production2[fetchFeilds(orderByValue)]
        ? 1
        : production1[fetchFeilds(orderByValue)] <
          production2[fetchFeilds(orderByValue)]
        ? -1
        : 0
    );
  }

  return newProductionList;
};
