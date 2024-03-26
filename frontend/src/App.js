// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";
// import axios from "axios";
// import "./App.css";
// const API_URL = "http://127.0.0.1:5000";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // useNavigate hook from react-router-dom

//   const handleSignup = async () => {
//     try {
//       await axios.post(`${API_URL}/signup`, { username, password });
//       navigate("/signin");
//     } catch (error) {
//       if (error.response && error.response.data) {
//         alert("Signup failed: " + error.response.data.message);
//       } else {
//         alert("Signup failed: An unexpected error occurred");
//       }
//     }
//   };
//   const handleGoToSignin = () => {
//     navigate("/signin");
//   };
//   return (
//     <div>
//       <h2>Signup</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Signup</button>
//       <p>
//         Already have an account?{" "}
//         <button onClick={handleGoToSignin}>Sign In</button>
//       </p>
//       <style></style>
//     </div>
//   );
// };

// const Signin = ({ history }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const handleSignin = async () => {
//     try {
//       await axios.post(`${API_URL}/signin`, { username, password });
//       // Redirect to the root URL upon successful signin
//       navigate("/imageinpainting");
//     } catch (error) {
//       if (error.response && error.response.data) {
//         alert("Signin failed: " + error.response.data.message);
//       } else {
//         alert("Signin failed: An unexpected error occurred");
//       }
//     }
//   };
//   const handleGoToSignup = () => {
//     navigate("/signup");
//   };
//   return (
//     <div>
//       <h2>Signin</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignin}>Signin</button>
//       <p>
//         New User? <button onClick={handleGoToSignup}>SignUp</button>
//       </p>
//     </div>
//   );
// };

// const ImageInpainting = () => {
//   const [loading, setLoading] = useState(false);
//   const [resultImageUrl, setResultImageUrl] = useState("");
//   const [originalImage, setOriginalImage] = useState(null);

//   const handleFileChange = (event) => {
//     setOriginalImage(event.target.files[0]);
//   };

//   const uploadImages = () => {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("original_image", originalImage);

//     fetch("http://127.0.0.1:5000/post", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Success:", data);
//         setResultImageUrl(
//           `http://localhost/images/${data.result_image?.slice(8)}`
//         );
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error uploading images");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="App">
//       <header>
//         <h1>imageRehab.AI</h1>
//       </header>

//       <div className="container">
//         <h2>Upload Images</h2>
//         <label htmlFor="originalImage">Original Image:</label>
//         <input
//           type="file"
//           id="originalImage"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//         <br />

//         <button onClick={uploadImages}>Upload</button>

//         {/* Conditionally render result image and loading spinner */}
//         {loading && <div id="loadingSpinner" className="loading-spinner"></div>}

//         {!loading && resultImageUrl && (
//           <div id="resultImageContainer">
//             <h2>Result Image</h2>
//             <img
//               id="resultImage"
//               src={resultImageUrl}
//               alt="Result Image"
//               style={{ display: loading ? "none" : "block" }}
//             />
//           </div>
//         )}
//       </div>

//       <footer>
//         <p>imageRehab.AI</p>
//       </footer>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/imageinpainting" element={<ImageInpainting />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
const API_URL = "http://127.0.0.1:5000";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook from react-router-dom

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, { username, password });
      navigate("/signin");
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Signup failed: " + error.response.data.message);
      } else {
        alert("Signup failed: An unexpected error occurred");
      }
    }
  };
  const handleGoToSignin = () => {
    navigate("/signin");
  };
  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?{" "}
        <button onClick={handleGoToSignin}>Sign In</button>
      </p>
      <style></style>
    </div>
  );
};

const Signin = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      await axios.post(`${API_URL}/signin`, { username, password });
      // Redirect to the root URL upon successful signin
      navigate("/imageinpainting");
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Signin failed: " + error.response.data.message);
      } else {
        alert("Signin failed: An unexpected error occurred");
      }
    }
  };
  const handleGoToSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h2>Signin</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>Signin</button>
      <p>
        New User? <button onClick={handleGoToSignup}>SignUp</button>
      </p>
    </div>
  );
};

const ImageInpainting = () => {
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("");
  const [originalImage, setOriginalImage] = useState(null);

  const handleFileChange = (event) => {
    setOriginalImage(event.target.files[0]);
  };

  const uploadImages = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("original_image", originalImage);

    fetch("http://127.0.0.1:5000/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setResultImageUrl(
          `http://localhost/images/${data.result_image?.slice(8)}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading images");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>imageRehab.AI</h1>
      </header>

      <div className="container">
        <h2>Upload Images</h2>
        <label htmlFor="originalImage">Original Image:</label>
        <input
          type="file"
          id="originalImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />

        <button onClick={uploadImages}>Upload</button>

        {/* Conditionally render result image and loading spinner */}
        {loading && <div id="loadingSpinner" className="loading-spinner"></div>}

        {!loading && resultImageUrl && (
          <div id="resultImageContainer">
            <h2>Result Image</h2>
            <img
              id="resultImage"
              src={resultImageUrl}
              alt="Result"
              style={{ display: loading ? "none" : "block" }}
            />
          </div>
        )}
      </div>

      <footer>
        <p>imageRehab.AI</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/imageinpainting" element={<ImageInpainting />} />
      </Routes>
    </Router>
  );
};

export default App;
