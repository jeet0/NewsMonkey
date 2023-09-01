import React, {useState} from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


const App =()=> {
  const [progress,setProgress] = useState(0)

  

    return (
      <div>
        
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
            // height="3"
            // onLoaderFinished={setProgress(0)}
            
          />
          
          <NavBar />
          <Switch>

            
            <Route exact path="/"><News setProgress={setProgress} key="home" category="general"/></Route>
            <Route exact path="/general"><News setProgress={setProgress} key="general" category="general"/></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" category="entertainment"/></Route>
            <Route exact path="/health"><News setProgress={setProgress} key="health" category="health"/></Route>
            <Route exact path="/science"><News setProgress={setProgress} key="science" category="science"/></Route>
            <Route exact path="/sports"><News setProgress={setProgress} key="sports" category="sports"/></Route>
            <Route exact path="/technology"><News setProgress={setProgress} key="technology" category="technology"/></Route>



          </Switch>
        </Router>
      </div>
    )
  }


export default App
