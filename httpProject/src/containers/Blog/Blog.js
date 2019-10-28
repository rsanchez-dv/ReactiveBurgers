import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import {Route, NavLink} from 'react-router-dom';
class Blog extends Component {
    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" exact component={NewPost} />
            </div>
        );
    }
}

export default Blog;