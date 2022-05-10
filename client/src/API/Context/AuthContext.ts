import { createContext } from "react";
import { AuthContext } from "../interfaces/AuthContext";

let AuthContext = createContext<AuthContext>(null!);