import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {firestore, storage} from "../index";
import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {setFillingUrlAction} from "../../store/reducers/admin";

export function addFilling(filling) {
    const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)
    const uploadTask = uploadBytesResumable(fillingImgRef, filling.imgUrl)
    uploadTask.on('state_changed',
        () => {},
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
export const fetchFillings = async () => {

    const q = query(collection(firestore, "fillings"))

    const querySnapshot = await getDocs(q);

    const arr = []
    querySnapshot.forEach(doc => arr.push(doc.data()));
    return arr
}

export const updateFilling = async (filling, prevFillingUrl, dispatch) => {
    const fillingRef = doc(firestore, "fillings", filling.id);
    if (prevFillingUrl !== filling.imgUrl) {
        const fillingImgRef = ref(storage, `fillings/filling_img_${filling.id}`)

        const uploadTask = uploadBytesResumable(fillingImgRef, filling.imgUrl)

        uploadTask.on('state_changed',
            () => {},
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