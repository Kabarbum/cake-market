import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
    orderBy,
    limit,
    startAfter,
    deleteDoc
} from "firebase/firestore";
import {firestore, storage} from "./index";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


export function AddProduct(product) {
    const productsImgRef = ref(storage, `products/product_img_${product.id}`)
    const uploadTask = uploadBytesResumable(productsImgRef, product.imgUrl)
    uploadTask.on('state_changed',
        (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.log("Upload image error: ", error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                product = {...product, imgUrl: downloadURL}
                const productsRef = collection(firestore, "products");
                await setDoc(doc(productsRef, `product_${product.id}`), {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: Number(product.price),
                    weight: Number(product.weight),
                    categoryId: Number(product.categoryId),
                    imgUrl: product.imgUrl
                })
            });
        }
    );
}

export const fetchProducts = async (lmt, categoryId = 0, order = ["id", "asc"]) => {

    const q = categoryId === 0
        ? query(collection(firestore, "products"), limit(lmt), orderBy(order[0], order[1]))
        : query(collection(firestore, "products"), where("categoryId", "==", categoryId), limit(lmt), orderBy(order[0], order[1]))


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
export const updateProduct = () => {

}
export const deleteProduct = async (id, Url) => {
    let url = (new URL(Url)).pathname.split("%2F")
    url = url[url.length - 1]

    await deleteDoc(doc(firestore, "products", `product_${id}`));

    const productImgRef = ref(storage, `products/${url}`);
    deleteObject(productImgRef).then(() => {
        console.log("File deleted successfully")
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!")
    });
}