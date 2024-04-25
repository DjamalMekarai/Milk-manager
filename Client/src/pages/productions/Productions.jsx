import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader as Loader } from "react-spinners";
import AddUpdateForm from "../../components/AddUpdateForm";
import HeaderPage from "../../components/HeaderPage";
import Item from "../../components/Item";
import {
  addItem,
  updateItem,
  deleteItem,
  filterAndOrder,
} from "./productionsControllers";
import { Box, Text } from "@chakra-ui/react";

const Productions = () => {
  const { productionsList, isLoading } = useSelector(
    (state) => state.productions
  );
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [productionDate, setProductionDate] = useState("");
  const [milkAmount, setMilkAmount] = useState("");

  // item fields
  const fields = ["Production Date", "Liters of milk produced"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "date" },
    [fields[1]]: { type: "text" },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    {
      field: fields[0],
      type: "date",
      value: productionDate,
      setter: setProductionDate,
    },
    {
      field: fields[1],
      type: "text",
      value: milkAmount,
      setter: setMilkAmount,
    },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (production) => [
    { field: fields[0], value: production.productionDate },
    { field: fields[1], value: production.milkAmount },
  ];

  const finalProductionsList = filterAndOrder(
    productionsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <Box>
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="Add New Production"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { productionDate, milkAmount }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="Edit Production"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { productionDate, milkAmount },
              setAddUpdate
            )
          }
          update
        />
      ) : (
        <>
          <Text
            fontSize="4rem"
            color="#333333"
            padding="3rem 0"
            fontWeight="500"
          >
            Milk Production
          </Text>
          <HeaderPage
            textBtn="Add New Production"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setProductionDate("");
              setMilkAmount("");
              setAddUpdate({ type: "add" });
            }}
          />

          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="25rem"
            >
              <Loader size={70} color="#777777" />
            </Box>
          ) : finalProductionsList.length > 0 ? (
            <Box padding="3rem 0">
              {finalProductionsList.map((production, index) => (
                <Item
                  key={index}
                  content={contentItem(production)}
                  updateItem={() => {
                    setProductionDate(production.productionDate);
                    setMilkAmount(production.milkAmount);
                    setAddUpdate({ type: "update", id: production.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, production.id)}
                />
              ))}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="25rem"
            >
              <Text fontSize="2.7rem" color="#333333" opacity="0.3">
                Sorry There are no Productions To show :/
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Productions;
