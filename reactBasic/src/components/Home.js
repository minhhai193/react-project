const Home = () => {
  return (
    <>
      <h1 className="main-title">DESCRIPTION WEBSITE</h1>
      <h2 className="requirement-tite">Requirement:</h2>
      <ul className="requirement-list">
        <li>Use API from web: <a href="https://reqres.in/" rel="noopener" target="_blank">https://reqres.in/</a> to create a website.</li>
        <li>Use ReactJS framework to create a basic website with the following features:
          <ol>
            <li>Login</li>
            <li>Logout</li>
            <li>CRUD user</li>
            <li>Find user by ID, Email</li>
            <li>Sort users by ID, First Name</li>
            <li>Import user from .csv file</li>
            <li>Export user to .csv file</li>
          </ol>
        </li>
        <li>User need to login to access Management Users Page</li>
      </ul>
    </>
  )
}

export default Home;