import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import Togglable from './components/Togglable'
import TogglableBlogs from './components/TogglableBlogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
  )
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    console.log(localStorage.getItem('loggedNoteappUser'))
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handleLogout = (event) => {
    window.localStorage.clear()
    this.setState({
      message: 'User logged out',
    })
    setTimeout(() => {
      this.setState({ message: null })
      window.location.reload()
    }, 2000)
  }

  handleCreateBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
      this.setState({
        message: 'User logged in',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch(exception) {
      this.setState({
        message: 'username or password invalid',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  create = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({
        message: 'Blog is created.'
      })
      setTimeout(() => {
        this.setState({ message: null })
        window.location.reload()
      }, 2000)
      this.setState({title: '', author: '', url: ''})
    } catch (exception) {
      this.setState({
        message: 'creating failed',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  orderBlogs = () => {
    return this.state.blogs.sort(function (blog1, blog2) {
      if (blog1.likes < blog2.likes) {
        return 1
      }
      if (blog1.likes > blog2.likes) {
        return -1
      }
      return 0
    })}
  

  render() {

    const printBlogs = () => (
      <div>
        <h2>Blogs</h2>
        {this.orderBlogs().map(blog => 
          <TogglableBlogs key={blog._id} blog = {blog}>
          <Blog key={blog._id} blog = {blog} user = {this.state.user}/>
        </TogglableBlogs>
        )}
      </div>
    )
  
    const loginForm = () => (
      <div className="loginForm">
          <h1>Login in to the application</h1>
          <form onSubmit={this.login}>
            <div>
              Username: 
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div>
              Password: 
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
    )

    return (
      <div>
        <Notification message = {this.state.message}/>
        {this.state.user === null || this.state.user === undefined ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p> <button type="button" onClick={this.handleLogout}>Logout</button>
            <div>{}</div>
            <div>{printBlogs()}</div>
            <p></p>
            <div><Togglable buttonLabel = "Open">
                    <CreateNewBlogForm 
                      handleSubmit = {this.create} 
                      handleChange = {this.handleCreateBlogChange} 
                      author = {this.state.author} 
                      title = {this.state.title} 
                      url = {this.state.url}/>
                  </Togglable>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;
