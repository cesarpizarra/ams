import { Link } from 'react-router-dom';
import Layout from '../layout/MainLayout';

const AdvanceSettings = () => {
  return (
    <div className="container py-4">
      <Link to="/students" className="btn btn-secondary">
        Back
      </Link>
      <h1 className="text-center mb-5">Advance Settings</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/advance-settings/update-grades">Update Grade Level</Link>
        </li>
        <li className="list-group-item">
          <Link to="/advance-settings/update-sections">Update Section</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdvanceSettings;
