import React, {useState} from 'react';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../firebase"
import { v4 as uuidv4 } from 'uuid';
import {AddProduct} from "../firebase/requests";

const Admin = () => {
    const [prog, setProg] = useState(0)
    const [product, setProduct] = useState(
        {
            id: uuidv4(),
            title: "Медовик",
            price: 2000,
            weight: 1.2,
            description: "Lorem ipsum dolor sit amet, uique?",
            categoryId: 1,
            file: undefined
        })


    const uploadFile = (e) => {
        e.preventDefault()
        const productsRef = ref(storage, `product_img_${product.id}`)

        const uploadTask = uploadBytesResumable(productsRef, product.file)

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProg(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    AddProduct(product, downloadURL)
                });
            }
        );
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <input value={product.title}
                       onChange={e => setProduct({...product, title: e.target.value})}/>
                <input value={product.description}
                       onChange={e => setProduct({...product, description: e.target.value})}/>
                <input value={product.price}
                       onChange={e => setProduct({...product, price: e.target.value})}/>
                <input value={product.weight}
                       onChange={e => setProduct({...product, weight: e.target.value})}/>
                <input value={product.categoryId}
                       onChange={e => setProduct({...product, categoryId: e.target.value})}/>
                <input type="file"
                       onChange={e => setProduct({...product, file:e.target.files[0]})}/>
                <button onClick={e=>uploadFile(e)}>upload</button>
                <progress value={prog}></progress>
            </form>
        </div>
    );
};

export default Admin;