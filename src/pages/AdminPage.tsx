import Seo from '../components/Seo'

/**
 * Admin panel — reachable only at /admin.
 * Nothing on the public (user side) site links here.
 * Firebase authentication + dashboard will be added later.
 */
export default function AdminPage() {
  return (
    <>
      <Seo
        title="Admin — CLC Barmer"
        description="CLC Barmer admin panel."
        noindex
      />
      <div className="admin">
        <div className="admin-card">
          <img src="/img/logo.jpg" alt="CLC Barmer" width={72} height={72} />
          <h1>Welcome Admin</h1>
          <p className="admin-sub">CLC Barmer — Career Launcher Classes</p>
          <div className="admin-box">
            <p>
              This is the admin area. The dashboard, results, notices and study-material
              management will appear here.
            </p>
            <p className="admin-note">Firebase login will be connected here later.</p>
          </div>
          <a className="btn" href="/">
            ← Back to website
          </a>
        </div>
      </div>
    </>
  )
}
