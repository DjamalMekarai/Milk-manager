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
} from "./cowsControllers";
import { Box, Text } from "@chakra-ui/react";

const Cows = () => {
  const { cowsList, isLoading } = useSelector((state) => state.cows);
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [number, setNumber] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [race, setRace] = useState("");

  // item fields
  const fields = ["Cow ID", "Entry date", "Race"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "text" },
    [fields[1]]: { type: "date" },
    [fields[2]]: {
      type: "options",
      options: ["Holstein", "Montbeliarde"],
    },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    { field: fields[0], type: "text", value: number, setter: setNumber },
    { field: fields[1], type: "date", value: entryDate, setter: setEntryDate },
    {
      field: fields[2],
      type: "options",
      options: ["Holstein", "Montbeliarde"],
      value: race,
      setter: setRace,
    },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (cow) => [
    { field: fields[0], value: cow.number },
    { field: fields[1], value: cow.entryDate },
    { field: fields[2], value: cow.race },
  ];

  const finalCowsList = filterAndOrder(
    cowsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <Box>
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="Add a Cow"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { number, entryDate, race }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="Edit Cow Informations "
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { number, entryDate, race },
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
            Cows List
          </Text>
          <HeaderPage
            textBtn="Add a Cow"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setNumber("");
              setEntryDate("");
              setRace("");
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
          ) : finalCowsList.length > 0 ? (
            <Box padding="3rem 0">
              {finalCowsList.map((cow, index) => (
                <Item
                  key={index}
                  content={contentItem(cow)}
                  updateItem={() => {
                    setNumber(cow.number);
                    setEntryDate(cow.entryDate);
                    setRace(cow.race);
                    setAddUpdate({ type: "update", id: cow.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, cow.id)}
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
                Sorry There are no Cows To show :/
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Cows;
