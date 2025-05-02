// import React from 'react';
// import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

// const UserInfo = ({ username, email, onLogout }) => {
//   return (
//     <div className="p-6 bg-gray-50 border rounded-md shadow-md">
//       <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//         <FaUser className="text-gray-600" />
//         Profile Info
//       </h2>

//       <div className="space-y-2 text-gray-800">
//         <p>
//           <strong>Username:</strong> {username}
//         </p>
//         <p>
//           <strong>Email:</strong> {email}
//         </p>
//       </div>

//       <button
//         onClick={onLogout}
//         className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-gray rounded hover:bg-red-600"
//       >
//         <FaSignOutAlt />
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default UserInfo;

import React from 'react';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const UserInfo = ({ username, email, onLogout }) => {
  return (
    <div className="p-4 bg-light border rounded shadow-sm">
      <h2 className="h5 mb-4 d-flex align-items-center gap-2">
        <FaUser className="text-muted" />
        Profile Info
      </h2>

      <div className="mb-4 text-dark">
        <p className="mb-2">
          <strong>Username:</strong> {username}
        </p>
        <p className="mb-0">
          <strong>Email:</strong> {email}
        </p>
      </div>

    </div>
  );
};

export default UserInfo;
