import './App.scss';
import Routing from "./components/Routing/Routing";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
        <Container>
            <Header />
            <Routing/>
            <Footer />
        </Container>
    </div>
  );
}

export default App;
