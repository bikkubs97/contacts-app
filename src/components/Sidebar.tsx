import { Link } from "react-router-dom";

export default function Sidebar(): JSX.Element {
  return (
    <div className="fixed bottom-0 bg-blue-400 flex w-full md:h-full md:bg-blue-800 md:w-[15vw] md:text-lg z-10">
      <ul className="list-none ">
        <li className="mb-4 p-2 md:mt-4">
          <Link
            to="/contacts"
            className="text-white hover:text-yellow-200 p-4 hover:font-bold"
          >
            Contacts
          </Link>
        </li>
        <li className=" p-2">
          <Link
            to="/charts"
            className="text-white hover:text-yellow-200 p-4 hover:font-bold"
          >
            Charts
          </Link>
        </li>
      </ul>
    </div>
  );
}
