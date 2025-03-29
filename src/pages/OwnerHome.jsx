import { auth } from '../firebase';

function OwnerHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Owner Home</h1>
        <p className="text-gray-700 mb-4">Welcome, Vehicle Owner! (Dummy Screen)</p>
        <button
          onClick={() => auth.signOut()}
          className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default OwnerHome;