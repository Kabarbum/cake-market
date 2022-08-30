import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";
import {firestore} from "./index";


export const fetchProducts = async (lmt, categoryId = 0) => {

    const q = categoryId === 0
        ? query(collection(firestore, "products"), limit(lmt))
        : query(collection(firestore, "products"), where("categoryId", "==", categoryId), limit(lmt))


    const querySnapshot = await getDocs(q);

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}

export const fetchMoreProducts = async (categoryId, order, lmt, lastVisible) => {
    let q
    if (categoryId === 0) {
        q = query(collection(firestore, "products"),
            orderBy(order[0], order[1]),
            startAfter(lastVisible),
            limit(lmt)
        )
    } else {
        q = query(collection(firestore, "products"),
            where("categoryId", "==", categoryId),
            orderBy(order[0], order[1]),
            startAfter(lastVisible),
            limit(lmt)
        )
    }

    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty)
        return []

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}

export const fetchCategories = async () => {
    const q = query(collection(firestore, "categories"))

    const querySnapshot = await getDocs(q);

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));

    return arr
}

export const fetchFillings = async () => {

    const q = query(collection(firestore, "fillings"))

    const querySnapshot = await getDocs(q);

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}

export const fetchDates = async () => {
    const q = query(collection(firestore, "dates"));

    const querySnapshot = await getDocs(q);
    let arr = []
    querySnapshot.forEach((doc) => {
        arr.push({id: doc.id, ...doc.data()})
    });
    return arr
}