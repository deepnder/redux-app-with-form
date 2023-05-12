import { Provider } from "react-redux";
import store from "./components/store";
import Homepage from "./Homepage";


function App() {

  return (
  <>
  <Provider store={store}>
<Homepage/>
  </Provider>
  </>
  );
}

export default App;
