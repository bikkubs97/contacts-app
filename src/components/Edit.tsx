import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/action";

interface EditProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData: {
    firstName: string;
    lastName: string;
    status: boolean;
    id: number;
  };
}


export default function Edit({ setShowEditModal, editData }:EditProps):JSX.Element {
  const [formData, setFormData] = useState({
    firstName: editData.firstName,
    lastName: editData.lastName,
    status: editData.status,
    id: editData.id,
  });
  const dispatch = useDispatch();

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateContact(formData));
    console.log(formData)

    setShowEditModal(false);
  }

  return (
    <div className="fixed top-20 left-0 right-0 border border-blue-600 rounded-md flex-column bg-blue-200  p-5 text-center ]">
      <h2 className="font-bold text-blue-800">Edit contact</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          className="m-1 p-1 border border-blue-600"
          onChange={handleChange}
          value={formData.firstName}
          name="firstName"
          required
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          className="m-1 p-1 border border-blue-600"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          required
        />
        <br />
        <p className="font-bold text-blue-800">Status</p>
        <input
          type="radio"
          name="status"
          value="true"
          checked={formData.status === true}
          onChange={() =>
            handleChange({ target: { name: "status", value: true } })
          }
        />
        <label className="p-1">Active</label>
        <br />
        <input
          type="radio"
          name="status"
          value="false"
          checked={formData.status === false}
          onChange={() =>
            handleChange({ target: { name: "status", value: false } })
          }
        />
        <label className="p-1">Not Active</label>

        <br />
        <button className="border rounded-md bg-blue-600 p-2 mt-5 text-white text-center m-4 hover:bg-blue-800">
          Save Changes
        </button>
        <button
          onClick={() => {
            setShowEditModal(false);
          }}
          type="button"
          className="border rounded-md bg-red-600 p-2 mt-5 text-white text-center m-4 hover:bg-red-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
