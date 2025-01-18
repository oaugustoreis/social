import styles from "./Login.module.css";
export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className={`${styles.bg} p-8 rounded-lg text-white shadow-md w-80`}>
                <h1 className="text-2xl font-bold">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <button type="submit" className={`${styles.btn} w-2/4 bg-indigo-500 text-white drop-shadow-md  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}