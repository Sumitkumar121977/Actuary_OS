import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div>
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "30px",
          minHeight: "100vh",
          background: "#0F172A",
          color: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;