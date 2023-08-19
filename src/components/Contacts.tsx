import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteContact } from "../redux/action";
import Create from "./Create";
import Edit from "./Edit";
import { useState } from "react";

// Define the shape of the data
interface EditData {
  firstName: string;
  lastName: string;
  status: boolean;
  id: number;
}

export default function Contacts(): JSX.Element {
  // Get the contacts from the store
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();
  // States for controlling the visibility of add and edit modals
  const [showAddModal, setShowAddModal] = useState(false);
  // State for storing data of the contact being edited
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    firstName: "",
    lastName: "",
    status: false,
    id: 0,
  });

  function handleAddContact() {
    setShowAddModal(true);
  }

  function handleEditContact(contact: EditData) {
    setShowEditModal(true);
    setEditData(contact);
  }

  function handleDeleteContact(contact: EditData) {
    dispatch(deleteContact(contact));
  }

  return (
    <>
      <div className="md:ml-[15vw]">
        <h1 className="text-center font-bold p-5 bg-blue-400 text-white">
          Contacts Page
        </h1>
        <button
          onClick={handleAddContact}
          className="border rounded-md bg-blue-400 p-2 mt-5 text-white text-center m-4 hover:bg-blue-800"
        >
          Add Contact
        </button>
        <div className="m-4 md:grid grid-cols-2">
          {contacts.length>0?contacts.map((contact) => (
            <div
              key={contact.id}
              className="border border-blue-600 m-2 p-2 bg-blue-200 font-bold"
            >
              <div>{contact.firstName}</div>
              <div>{contact.lastName}</div>
              <div className="text-orange-600">
                {contact.status ? "Active" : "Not Active"}
              </div>
              <button
                onClick={() => {
                  handleEditContact(contact);
                }}
                className="border rounded-md bg-blue-600 p-2  text-white text-center m-2 hover:bg-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteContact(contact);
                }}
                className="border rounded-md bg-red-600 p-2  text-white text-center m-2 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          )):<div className="flex">
            <img src="close.gif"/>
            <div>
            <h1 className="text-red-600 text-lg font-bold">No contacts Found!</h1>
            <p>Please create contacts using "Add Contact" button</p>
            </div>
            </div>}
        </div>
        {showAddModal && <Create setShowAddModal={setShowAddModal} />}
        {showEditModal && (
          <Edit setShowEditModal={setShowEditModal} editData={editData} />
        )}
      </div>
    </>
  );
}
