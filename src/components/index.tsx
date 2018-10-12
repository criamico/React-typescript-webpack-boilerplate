import * as React from "react";
import TestComponent from './test-component';
import './main.scss';

class App extends React.Component {
  displayName = 'App';
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <React.StrictMode>
        <div className="example">
          <h1>ReactES6-webpack-boilerplate</h1>
          <TestComponent />
          <h2>Enforces best practices</h2>
          <ul>
            <li>TypeScript 3</li>
            <li>Latest versions: Webpack 4, React 16</li>
            <li>Sass module enabled</li>
            <li>TS/React linters</li>
            <li>Support to Jasmine/Enzyme/Karma tests</li>
            <li>
              Live reloading with webpack-dev-server in dev mode
            </li>
            <li>
              Production configuration generates index.html,
              minified js and css
            </li>
            <li>Postcss enabled</li>
            <li>
              Code splitting enabled: generates a bundle.js and a vendor.js
            </li>
          </ul>
          <h2>...Happy coding!</h2>
        </div>
      </React.StrictMode>
    );
  }
}
export default App;
