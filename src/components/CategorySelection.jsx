import { useNavigate } from 'react-router-dom';

function CategorySelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Choose Your Category</h2>
      <p className="text-gray-600 mb-6 text-center">Please select your role to sign up:</p>
      <div className="flex flex-col gap-4 w-full">
        <button
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
          onClick={() => navigate('/signup/owner')}
        >
          Vehicle Owner
        </button>
        <button
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
          onClick={() => navigate('/signup/technician')}
        >
          Technician
        </button>
        <button
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
          onClick={() => navigate('/signup/service-center')}
        >
          Service Center
        </button>
      </div>
      <button
        className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200 w-full text-center"
        onClick={() => navigate('/login')}
      >
        Back to Login
      </button>
    </div>
  );
}

export default CategorySelection; 