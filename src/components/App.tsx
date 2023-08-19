import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Sidebar from "./Sidebar";
import Contacts from "./Contacts";
import Charts from "./Charts";
import contactsReducer from "../redux/reducer";

const store = createStore(contactsReducer);

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/" element={<Contacts />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
