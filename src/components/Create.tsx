import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/action";

interface CreateProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Create({ setShowAddModal }: CreateProps) : JSX.Element {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    status: "false",
  });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newContact = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      active: formData.status,
      id: Math.random(),
    }; // Dispatch the action to add a new contact
    dispatch(addContact(newContact));
    setShowAddModal(false);
  }

  return (
    <div className="fixed top-20 left-0 right-0 border border-blue-600 rounded-md flex-column bg-blue-200  p-5 text-center ]">
      <h2 className="font-bold text-blue-800">Crate contacts</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          placeholder="First Name"
          className="m-1 p-1 border border-blue-600"
          required
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          className="m-1 p-1 border border-blue-600"
          required
        />
        <br />
        <p className="font-bold text-blue-800">Status</p>
        <input
          type="radio"
          name="active"
          value={formData.status}
          onChange={handleChange}
        />
        <label className="p-1">Active</label>
        <br />
        <input
          type="radio"
          name="active"
          value={formData.status}
          onChange={handleChange}
        />
        <label className="p-1">Inactive</label>
        <br />
        <button className="border rounded-md bg-blue-600 p-2 mt-5 text-white text-center m-4 hover:bg-blue-800">
          Save Contact
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAddModal(false);
          }}
          className="border rounded-md bg-red-600 p-2 mt-5 text-white text-center m-4 hover:bg-red-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
