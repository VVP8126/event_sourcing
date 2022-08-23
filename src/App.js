import EventSourcing from './EventSourcing';
import './styles/styles.css';

function App() {
  return (
    <div>
      <h1 className='centered'>CHAT</h1>
      <h3 className='centered margined'>Longpulling approach used</h3>
      <EventSourcing />
    </div>
  );
}
export default App;
