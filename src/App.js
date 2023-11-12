import './App.scss';
import Routing from "./components/Routing/Routing";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
        <Container>
            <Header />
            <Routing/>
        </Container>
    </div>
  );
}

export default App;
