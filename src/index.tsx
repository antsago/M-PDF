import React from "react"
import ReactDOM from "react-dom"

const mountNode = document.getElementById("app")
ReactDOM.hydrate(<p> Hello world</p>, mountNode)
