import AdminNavbar from "./AdminNavbar";
import Footer from "../Footer";
export default function AdminLayout(props) {
  return (
    <div>
      <AdminNavbar />
      <div>{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
}
