import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { TsReactTest } from "screens/project-list/try-use-array";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
