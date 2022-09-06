import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../index";

export const addCategory = async (category) => {
    const categoriesRef = collection(firestore, "categories");
    await setDoc(doc(categoriesRef, `category_${category.id}`), {
        id: category.id,
        title: category.title
    })
}

export const fetchCategories = async () => {
    const q = query(collection(firestore, "categories"))

    const querySnapshot = await getDocs(q);

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));

    return arr
}

export const updateCategory = async (category) => {
    const categoryRef = doc(firestore, "categories", `category_${category.id}`);
    await updateDoc(categoryRef, {
        title: category.title
    });
}

export const deleteCategory = async (id) => {
    await deleteDoc(doc(firestore, "categories", `category_${id}`));
}