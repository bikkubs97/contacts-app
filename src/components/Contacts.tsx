import { deleteContact } from "../redux/action";
import Create from "./Create";
import Edit from "./Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface EditData {
  firstName: string;
  lastName: string;
  status:boolean;
  id: number;
}


export default function Contacts() :JSX.Element {
  const contacts = useSelector((state:RootState) => state.contacts);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    firstName: "",
    lastName: "",
    active: false,
    id: null,
  });

  function handleAddContact() {
    setShowAddModal(true);
  }
  function handleEditContact(contact :EditData) {
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
          {contacts.map((contact) => (
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
          ))}
        </div>
        {showAddModal && <Create setShowAddModal={setShowAddModal} />}
        {showEditModal && (
          <Edit setShowEditModal={setShowEditModal} editData={editData} />
        )}
      </div>
    </>
  );
}
