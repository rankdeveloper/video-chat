// import Navbar from "../components/Navbar";

// export default function About() {
//   return (
//     <div className="body page-about">
//       <Navbar />
//       <div className="about-main">
//         <div className="services">
//           <div className="card">
//             <h2>Developer</h2>
//             <p>My name is Rankush, and I'm the developer behind this project. I've created this video chat web app with a passion for providing users with a seamless communication experience</p>
//           </div>
//           <div className="card">
//             <h2>Our Mission</h2>
//             <p>The mission of this project is to offer a simple yet effective video chat solution that allows users to connect with others effortlessly, whether for personal or professional purposes.</p>
//           </div>
//           <div className="card">
//             <h2>Key Features</h2>
//             <p>This video chat web app comes with the following features:</p>
//             <ul>
//               <li>High-quality video and audio</li>
//               <li>Easy-to-use interface</li>
//               <li>Instant messaging during calls</li>
//               <li>No need for downloads or installations</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="page page-about">
      <Navbar />
      <div className="about-main">
        <div className="about-intro">
          <h1>About Hola Amigo</h1>
        </div>

        <div className="services">
          <div className="card">
            <h2>Developer</h2>
            <p>
              My name is Rankush, and I'm the developer behind this project.
              I've created this video chat web app with a passion for providing
              users with a seamless communication experience.
            </p>
          </div>

          <div className="card">
            <h2>Our mission</h2>
            <p>
              The mission of this project is to offer a simple yet effective
              video chat solution that allows users to connect with others
              effortlessly, whether for personal or professional purposes.
            </p>
          </div>

          <div className="card">
            <h2>Key features</h2>
            <p>This video chat web app comes with the following features:</p>
            <ul>
              <li>High-quality video and audio</li>
              <li>Easy-to-use interface</li>
              <li>Instant messaging during calls</li>
              <li>No need for downloads or installations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
