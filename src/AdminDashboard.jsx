import React, { useEffect, useState } from 'react';
import { fetchFlaggedUsersWithPosts } from './api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [flaggedUsers, setFlaggedUsers] = useState([]);

  useEffect(() => {
    const getFlaggedUsers = async () => {
      const usersWithPosts = await fetchFlaggedUsersWithPosts(); // Fetch users with their posts
      setFlaggedUsers(usersWithPosts);
    };

    getFlaggedUsers();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: flaggedUsers.map((user) => user.username), // X-axis labels
    datasets: [
      {
        label: 'Number of Flagged Posts',
        data: flaggedUsers.map((user) => user.posts.length), // Y-axis data
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Flagged Posts per User',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Username',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Flagged Posts',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2c3e50] to-[#2980b9] p-5">
      {/* Dashboard Header */}
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-200">Review flagged users and their posts</p>
      </div>

      {/* Flagged Users List */}
      <div className="row">
        <h2 className="text-2xl font-semibold text-gray-200 col-12 mb-4">Flagged Users</h2>

        {flaggedUsers.length > 0 ? (
          flaggedUsers.map((user) => (
            <div key={user.$id} className="col-md-6 mb-4">
              <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                <div className="d-flex align-items-center mb-3">
                  <div className="mr-3">
                    <h3 className="text-xl font-medium text-gray-800">{user.username}</h3>
                    <p className="text-sm text-gray-500">Email: {user.email}</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-600 mt-3 mb-2">Posts</h4>
                <ul className="list-unstyled">
                  {user.posts.length > 0 ? (
                    user.posts.map((post) => (
                      <li key={post.$id} className="border-t pt-2 mt-2">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt={post.caption}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxWidth: '100px', height: 'auto' }}
                          />
                        )}
                        <p className="text-gray-700 mt-2">{post.caption}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No posts available.</p>
                  )}
                </ul>

              </div>
            </div>
          ))
        ) : (
          <p className="col-12 text-center text-gray-600">No flagged users available.</p>
        )}
      </div>

      {/* Bar Chart for Flagged Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">Flagged Posts Analysis</h2>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
