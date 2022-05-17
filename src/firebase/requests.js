import {collection, doc, getDocs, query, setDoc, where, orderBy, limit, startAt} from "firebase/firestore";
import db from "./index";


export async function AddProduct(product, imgUrl) {
    const productsRef = collection(db, "products");
    await setDoc(doc(productsRef, `product_${product.id}`), {
        id: product.id,
        title: product.title,
        description: product.description,
        price: Number(product.price),
        weight: Number(product.weight),
        categoryId: Number(product.categoryId),
        imgUrl
    })
}

export const fetchProducts = async (categoryId, order, lmt) => {
    let q
    if (categoryId)
        q = query(collection(db, "products"), where("categoryId", "==", categoryId))
    else
        q = query(collection(db, "products"),orderBy("price"), limit(lmt), startAt(2000))

    const querySnapshot = await getDocs(q);

    const arr = []

    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}
export const fetchCategories = async () => {
    const q = query(collection(db, "categories"))

    const querySnapshot = await getDocs(q);

    const arr = []

    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}