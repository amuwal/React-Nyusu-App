import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
    state = {
        progress: 0
    }

    setProgress = (progress) => {
        this.setState({progress: progress})
    }
  render() {
    return (
        <>
        <BrowserRouter>
        <LoadingBar height={2} color="#f11946" progress={this.state.progress}/>
        <Navbar></Navbar>
        <Routes>
            <Route  exact path="/" element={<News setProgress={this.setProgress}  key="home" pageSize={9} country="in" category="general"/>}></Route>
            <Route  exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={9} country="in" category="business"/>}></Route>
            <Route  exact path="/technology" element={<News setProgress={this.setProgress}  key="tech" pageSize={9} country="in" category="technology"/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
  }
}
