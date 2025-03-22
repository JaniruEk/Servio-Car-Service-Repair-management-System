import { useNavigate } from 'react-router-dom';

function CategorySelection() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Choose Your Category</h2>
      <p>Please select your role to sign up:</p>
      <button
        className="category-button"
        onClick={() => navigate('/signup/owner')}
      >
        Vehicle Owner
      </button>
      <button
        className="category-button"
        onClick={() => navigate('/signup/technician')}
      >
        Technician
      </button>
      <button
        className="category-button"
        onClick={() => navigate('/signup/service-center')}
      >
        Service Center
      </button>
      <button
        className="link-button"
        onClick={() => navigate('/login')}
      >
        Back to Login
      </button>
    </div>
  );
}

export default CategorySelection;