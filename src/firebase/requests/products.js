import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {firestore, storage} from "../index";
import {
    collection, deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    updateDoc,
    where
} from "firebase/firestore";
import {setProductUrlAction} from "../../store/reducers/admin";

export function AddProduct(product) {
    const productImgRef = ref(storage, `products/product_img_${product.id}`)
    const uploadTask = uploadBytesResumable(productImgRef, product.imgUrl)
    uploadTask.on('state_changed',
        () => {},
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
export const updateProduct = async (product, prevProductUrl, dispatch) => {
    const productRef = doc(firestore, "products", "product_" + product.id);
    if (prevProductUrl !== product.imgUrl) {
        const productImgRef = ref(storage, `products/product_img_${product.id}`)

        const uploadTask = uploadBytesResumable(productImgRef, product.imgUrl)

        uploadTask.on('state_changed',
            () => {},
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