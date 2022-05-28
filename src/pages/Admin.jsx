import React, {useState} from 'react';
import AdminProducts from "../components/AdminProducts";
import AdminFillings from "../components/AdminFillings";
import AdminCategories from "../components/AdminCategories";
import AdminCalendar from "../components/AdminCalendar";

const Admin = () => {
    const [page, setPage] = useState(0)

    return (
        <main>
            <div className="container admin-container">
                <div className="admin-header">
                    <div onClick={() => setPage(0)} className={page === 0 ? "active" : null}>Каталог</div>
                    <div onClick={() => setPage(1)} className={page === 1 ? "active" : null}>Начинки</div>
                    <div onClick={() => setPage(2)} className={page === 2 ? "active" : null}>Категории</div>
                    <div onClick={() => setPage(3)} className={page === 3 ? "active" : null}>Календарь</div>
                </div>
                <div className="admin-content">
                    {page === 0 && <AdminProducts/>}
                    {page === 1 && <AdminFillings/>}
                    {page === 2 && <AdminCategories/>}
                    {page === 3 && <AdminCalendar/>}
                </div>
            </div>
        </main>
    );
};

export default Admin;