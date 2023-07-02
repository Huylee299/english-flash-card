import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "./component/default";
import PrivateRoute from "./router/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Lessons from "./component/view/content/lessons/Lessons";
import Navbar from "./component/view/navbar/Navbar";
import AddLessons from "./component/view/content/lessons/create/CreateLesson";
import CreateLessonComponent from "./component/view/content/lessons/edit/EditLesson";
import LearningLesson from "./component/view/content/lessons/learn/LearningLesson";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
const App = () => {
  return (
    
      <BrowserRouter>
      <AuthContextProvider>
        
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route exact path="/" element={<Default/>}/>
            <Route exact path="/lessons" element={<Lessons/>}/>
            <Route exact path="/lessons/learning/:name" element={<LearningLesson/>}/> 
            <Route exact path="/lessons" element={<Lessons/>}/>
            <Route exact path="/lessons/edit/:name" element={<CreateLessonComponent/>}/>
          </Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/create" element={<AddLessons/>}/>
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>

  );
}

export default App;
