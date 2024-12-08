// resources/js/Pages/Auth/Login.jsx
import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import react,{useState} from 'react';

export default function Login() {
    const { data, setData, processing } = useForm({
        email: '',
        password: '',
    });

    const [errors,setErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();
        router.post('/login', data,{
            onSuccess: () => {  
                console.log('Login successful!');
            },
            onError: (errors) => {  
                console.log('Validation errors:', errors);
                setErrors(errors);
            },
        });
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">EchoPost</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition">
                        Login with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? 
                        <a href="/register" className="text-blue-500 hover:underline"> Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
}