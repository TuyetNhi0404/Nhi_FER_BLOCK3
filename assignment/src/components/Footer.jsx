export default function Footer() {
  return (
    <footer className="text-center py-4 border-top mt-5 text-light"  style={{ backgroundColor: "#0d1b0d" }}>
      <div>© {new Date().getFullYear()} LSoul Fashion Shop. All rights reserved.</div>
      <div>
        Contact: <a href="https://github.com/TuyetNhi0404" target="_blank" rel="noreferrer" className="text-success">Created by Tuyet Nhi</a>
      </div>
    </footer>
  );
}
