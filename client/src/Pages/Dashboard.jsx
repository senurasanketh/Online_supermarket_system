import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Nav from "../Components/Navbar/Nav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0); // Added state for items
  const [error, setError] = useState(null);

  // Fetch data from your MERN backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees
        const employeesRes = await axios.get("http://localhost:5000/employees");
        const employeesData = employeesRes.data.employees;
        console.log("Employees Data:", employeesData);

        // Fetch suppliers
        const suppliersRes = await axios.get("http://localhost:5000/suppliers");
        const suppliersData = suppliersRes.data.suppliers;
        console.log("Suppliers Data:", suppliersData);

        // Fetch items
        const itemsRes = await axios.get("http://localhost:5000/items");
        const itemsData = itemsRes.data.items;
        console.log("Items Data:", itemsData);

        // Set counts with fallback to 0 if data is not an array
        setEmployeesCount(
          Array.isArray(employeesData) ? employeesData.length : 0
        );
        setSuppliersCount(
          Array.isArray(suppliersData) ? suppliersData.length : 0
        );
        setItemsCount(Array.isArray(itemsData) ? itemsData.length : 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ["Employees", "Suppliers", "Items"],
    datasets: [
      {
        label: "Count",
        data: [employeesCount, suppliersCount, itemsCount],
        backgroundColor: ["#4a90e2", "#9b59b6", "#e67e22"], // Added orange for items
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employees vs Suppliers vs Items",
        font: { size: 20 },
      },
    },
  };

  return (
    <>
      <Nav />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
          padding: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "40px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Admin Dashboard
        </h1>

        {/* Display error if any */}
        {error && (
          <div
            style={{
              color: "#e74c3c",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "18px",
              background: "#fce4e4",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Error: {error}
          </div>
        )}

        {/* Grid Layout for Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {/* Employee Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "25px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background: "linear-gradient(45deg, #4a90e2, #3498db)",
                padding: "18px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            >
              <svg
                style={{ width: "35px", height: "35px", color: "#fff" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1H9m6-12V8a3 3 0 00-6 0v4a3 3 0 006 0v-1z"
                />
              </svg>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#34495e",
                }}
              >
                Employees
              </h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                }}
              >
                {employeesCount}
              </p>
            </div>
          </div>

          {/* Supplier Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "25px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background: "linear-gradient(45deg, #9b59b6, #8e44ad)",
                padding: "18px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            >
              <svg
                style={{ width: "35px", height: "35px", color: "#fff" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#34495e",
                }}
              >
                Suppliers
              </h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                }}
              >
                {suppliersCount}
              </p>
            </div>
          </div>

          {/* Item Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "25px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background: "linear-gradient(45deg, #e67e22, #d35400)",
                padding: "18px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
            >
              <svg
                style={{ width: "35px", height: "35px", color: "#fff" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#34495e",
                }}
              >
                Items
              </h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                }}
              >
                {itemsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            height: "450px",
          }}
        >
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
