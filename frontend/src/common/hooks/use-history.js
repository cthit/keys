import HistoryContext from "../context/HistoryContext";
import { useContext } from "react";

function useHistory() {
    return useContext(HistoryContext);
}

export default useHistory;
