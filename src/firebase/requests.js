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
    deleteDoc, updateDoc
} from "firebase/firestore";
import {firestore, storage} from "./index";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {setFillingUrlAction, setProductUrlAction} from "../store/reducers/admin";
import {v4 as uuidv4} from "uuid";


export function AddProduct(product) {
    const productImgRef = ref(storage, `products/product_img_${product.id}`)
    const uploadTask = uploadBytesResumable(productImgRef, product.imgUrl)
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

export function addFilling(filling) {
    const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)
    const uploadTask = uploadBytesResumable(fillingImgRef, filling.imgUrl)
    uploadTask.on('state_changed',
        (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.log("Upload image error: ", error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                filling = {...filling, imgUrl: downloadURL}
                const fillingsRef = collection(firestore, "fillings");
                await setDoc(doc(fillingsRef, filling.id), {
                    id: filling.id,
                    title: filling.title,
                    composition: filling.composition,
                    price: Number(filling.price),
                    imgUrl: filling.imgUrl
                })
            });
        }
    );
}

export const addCategory = async (category) => {
    const categoriesRef = collection(firestore, "categories");
    await setDoc(doc(categoriesRef, `category_${category.id}`), {
        id: category.id,
        title: category.title
    })
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
export const updateProduct = async (product, prevProductUrl, dispatch) => {
    const productRef = doc(firestore, "products", "product_" + product.id);
    if (prevProductUrl !== product.imgUrl) {
        const productImgRef = ref(storage, `products/product_img_${product.id}`)

        const uploadTask = uploadBytesResumable(productImgRef, product.imgUrl)

        uploadTask.on('state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log("Upload image error: ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    dispatch(setProductUrlAction(downloadURL))
                    await updateDoc(productRef, {...product, imgUrl: downloadURL});
                });
            }
        );
    } else {
        await updateDoc(productRef, product);
    }
}
export const updateFilling = async (filling, prevFillingUrl, dispatch) => {
    const fillingRef = doc(firestore, "fillings", filling.id);
    if (prevFillingUrl !== filling.imgUrl) {
        const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)

        const uploadTask = uploadBytesResumable(fillingImgRef, filling.imgUrl)

        uploadTask.on('state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log("Upload image error: ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                    dispatch(setFillingUrlAction(downloadURL))
                    await updateDoc(fillingRef, {imgUrl: downloadURL});
                });
            }
        );
    }
    await updateDoc(fillingRef, {
        id: filling.id,
        title: filling.title,
        composition: filling.composition,
        price: filling.price,
    });
}
export const updateCategory = async (category) => {
    const categoryRef = doc(firestore, "categories", `category_${category.id}`);
    await updateDoc(categoryRef, {
        title: category.title
    });
}
export const deleteProduct = async (id, Url) => {
    let url = (new URL(Url)).pathname.split("%2F")
    url = url[url.length - 1]

    await deleteDoc(doc(firestore, "products", `product_${id}`));

    const productImgRef = ref(storage, `products/${url}`);
    deleteObject(productImgRef).then(() => {
        console.log("File deleted successfully")
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!", error)
    });
}
export const deleteFilling = async (id, Url) => {
    let url = (new URL(Url)).pathname.split("%2F")
    url = url[url.length - 1]

    await deleteDoc(doc(firestore, "fillings", id));

    const fillingImgRef = ref(storage, `fillings/${url}`);
    deleteObject(fillingImgRef).then(() => {
        console.log("File deleted successfully")
    }).catch((error) => {
        console.log("Uh-oh, an error occurred!", error)
    });
}
export const deleteCategory = async (id) => {
    await deleteDoc(doc(firestore, "categories", `category_${id}`));
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
export const addDate = async (date) => {
    const datesRef = collection(firestore, "dates");
    await setDoc(doc(datesRef, `date_${uuidv4()}`), {
        date
    })
}

export const deleteDate = async (id) => {
    await deleteDoc(doc(firestore, "dates", `${id}`));
}