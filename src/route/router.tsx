import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'

export default class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route key={"*"} path="*" element={<Home />} />
      </Routes>
    );
  }
}