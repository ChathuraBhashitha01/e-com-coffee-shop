import AdminCotent from '../page/AdminContent';
import AdminNavBar from '../component/AdminNavBar';

export default function UserLayout() {
    return (
        <div className="w-[100vw] h-[100vh] relative overflow-hidden overflow-y-scroll">
            <AdminNavBar></AdminNavBar>
            <AdminCotent></AdminCotent>
        </div>
    );
}