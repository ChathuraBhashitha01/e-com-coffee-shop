import UserCotent from '../page/UserContent';
import UserNavBar from '../component/UserNavBar';

export default function UserLayout() {
    return (
        <div className="w-[100vw] h-[100vh] relative overflow-hidden overflow-y-scroll">
            <UserNavBar></UserNavBar>
            <UserCotent></UserCotent>
        </div>
    );
}
