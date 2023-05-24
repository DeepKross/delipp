import {SignInButton, useUser} from "@clerk/nextjs";
import {SignOutButton} from "@clerk/clerk-react";

const UserWizard = () => {
    const user = useUser();

    if (user.isSignedIn) {
        return (
            <div className="flex items-center space-x-4 ">
                <p className="text-lg text-blue-400">Hi, {user.user.fullName}</p>
                <div className="rounded-full overflow-hidden">
                    <img src={user.user.profileImageUrl} alt="profile image" className="h-12 w-12 rounded-full"/>
                </div>
                <div className="inline-flex">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none">
                        <SignOutButton/>
                    </button>
                </div>
            </div>

        );
    } else {
        return (
            <div>
                <p>Hi, guest</p>
                <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none" >
                    <SignInButton/>
                </div>

            </div>
        );
    }
}

export default UserWizard;