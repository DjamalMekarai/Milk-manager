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
} from "./birthsControllers";
import { Box, Text } from "@chakra-ui/react";

const Births = () => {
  const { birthsList, isLoading } = useSelector((state) => state.births);
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [birthDate, setBirthDate] = useState("");
  const [momNumber, setMomNumber] = useState("");

  // item fields
  const fields = ["Date of birth", "Parent Cow Number"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "date" },
    [fields[1]]: { type: "text" },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    { field: fields[0], type: "date", value: birthDate, setter: setBirthDate },
    { field: fields[1], type: "text", value: momNumber, setter: setMomNumber },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (birth) => [
    { field: fields[0], value: birth.birthDate },
    { field: fields[1], value: birth.momNumber },
  ];

  const finalBirthsList = filterAndOrder(
    birthsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <Box>
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="New cow birth"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { birthDate, momNumber }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="Edit birth informations "
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { birthDate, momNumber },
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
            Cows Births List
          </Text>
          <HeaderPage
            textBtn="Add New Birth"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setBirthDate("");
              setMomNumber("");
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
          ) : finalBirthsList.length > 0 ? (
            <Box padding="3rem 0">
              {finalBirthsList.map((birth, index) => (
                <Item
                  key={index}
                  content={contentItem(birth)}
                  updateItem={() => {
                    setBirthDate(birth.birthDate);
                    setMomNumber(birth.momNumber);
                    setAddUpdate({ type: "update", id: birth.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, birth.id)}
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
                No births to show :/
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Births;
