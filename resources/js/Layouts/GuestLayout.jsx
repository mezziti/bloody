import MainHeader from '@/Components/MainHeader';
import { Link } from '@inertiajs/react';

export default function Guest({ children, user }) {
    return (
        <>
        <div className="fixed bg-white w-full z-10">
            <MainHeader user={user} />
        </div>
        
        <main className="pt-[80px] min-h-screen bg-white">
            {children}
        </main>
    </>
    );
}
