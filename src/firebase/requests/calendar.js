import {collection, deleteDoc, doc, getDocs, query, setDoc} from "firebase/firestore";
import {firestore} from "../index";
import {v4 as uuidv4} from "uuid";

export const fetchDates = async () => {
    const q = query(collection(firestore, "dates"));

    const querySnapshot = await getDocs(q);
    let arr = []
    querySnapshot.forEach((doc) => {
        arr.push({id: doc.id, ...doc.data()})
    });
    return arr
}
export const addDate = async (date) => {
    const datesRef = collection(firestore, "dates");
    await setDoc(doc(datesRef, `date_${uuidv4()}`), {
        date
    })
}

export const deleteDate = async (id) => {
    await deleteDoc(doc(firestore, "dates", `${id}`));
}